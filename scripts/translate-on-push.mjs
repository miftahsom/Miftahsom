#!/usr/bin/env node
import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Config
const BLOG_DIR = path.resolve(process.cwd(), 'src/content/blog');
const DATE_PREFIX_RE = /^\d{4}-\d{2}-\d{2}-/;
const SO_SUFFIX_RE = /-so$/i;

const hasDeepL = !!process.env.DEEPL_API_KEY;
const hasGoogle = !!process.env.GOOGLE_TRANSLATE_API_KEY;

const translateText = async (text, source = 'so', target = 'en') => {
  if (!text || !text.trim()) return text;
  if (hasDeepL) {
    const res = await fetch('https://api-free.deepl.com/v2/translate', {
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        text,
        source_lang: source.toUpperCase(),
        target_lang: target.toUpperCase()
      })
    });
    if (!res.ok) throw new Error(`DeepL failed: ${res.status} ${res.statusText}`);
    const data = await res.json();
    return (data.translations?.[0]?.text) ?? text;
  }
  if (hasGoogle) {
    const url = `https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_TRANSLATE_API_KEY}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: text, source, target, format: 'text' })
    });
    if (!res.ok) throw new Error(`Google Translate failed: ${res.status} ${res.statusText}`);
    const data = await res.json();
    return (data.data?.translations?.[0]?.translatedText) ?? text;
  }
  throw new Error('No translation provider configured. Set DEEPL_API_KEY or GOOGLE_TRANSLATE_API_KEY.');
};

const mapCategoryToEnglish = (category) => {
  const c = (category || '').trim();
  const map = new Map([
    ['Caafimaad', 'Health'],
    ['Barbaarinta Carruurta', 'Parenting'],
    ['Waxbarasho', 'Education'],
    ['Quraanka', 'Quran'],
    ['Magacyada Carruurta', 'Baby Names'],
  ]);
  return map.get(c) ?? c;
};

const mapCategoryToSomali = (category) => {
  const c = (category || '').trim();
  const map = new Map([
    ['Health', 'Caafimaad'],
    ['Parenting', 'Barbaarinta Carruurta'],
    ['Education', 'Waxbarasho'],
    ['Quran', 'Quraanka'],
    ['Baby Names', 'Magacyada Carruurta'],
  ]);
  return map.get(c) ?? c;
};

const readMarkdownFiles = (dir) => {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...readMarkdownFiles(p));
    else if (e.isFile() && p.toLowerCase().endsWith('.md')) files.push(p);
  }
  return files;
};

const toBaseSlug = (filePath) => {
  const filename = path.basename(filePath).replace(/\.md$/i, '');
  const noDate = filename.replace(DATE_PREFIX_RE, '');
  return noDate.replace(SO_SUFFIX_RE, '');
};

const inferDatePrefix = (filePath) => {
  const filename = path.basename(filePath).replace(/\.md$/i, '');
  const m = filename.match(DATE_PREFIX_RE);
  return m ? m[0] : '';
};

const loadPost = (filePath) => {
  const raw = readFileSync(filePath, 'utf8');
  const parsed = matter(raw);
  return { filePath, ...parsed };
};

const savePost = (filePath, data, content) => {
  const out = matter.stringify(content, data);
  const dir = path.dirname(filePath);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(filePath, out, 'utf8');
};

const main = async () => {
  const allFiles = readMarkdownFiles(BLOG_DIR);
  const posts = allFiles.map(loadPost);
  const byBase = new Map();
  for (const p of posts) {
    const base = toBaseSlug(p.filePath);
    if (!byBase.has(base)) byBase.set(base, []);
    byBase.get(base).push(p);
  }

  let created = 0;
  for (const [base, group] of byBase.entries()) {
    const hasSo = group.some(p => (p.data.language || '').toLowerCase() === 'so' || SO_SUFFIX_RE.test(path.basename(p.filePath, '.md')));
    const hasEn = group.some(p => (p.data.language || '').toLowerCase() === 'en');

    // Case A: Somali exists, English missing => generate English
    if (hasSo && !hasEn) {
      const soPost = group.find(p => (p.data.language || '').toLowerCase() === 'so')
        || group.find(p => SO_SUFFIX_RE.test(path.basename(p.filePath, '.md')));
      if (!soPost) continue;

      const datePrefix = inferDatePrefix(soPost.filePath);
      const enFileName = `${datePrefix}${base}.md`;
      const enFilePath = path.join(path.dirname(soPost.filePath), enFileName);

      const soData = { ...soPost.data };
      const soBody = soPost.content || '';

      const enTitle = await translateText(String(soData.title || base), 'so', 'en');
      const enExcerpt = await translateText(String(soData.excerpt || ''), 'so', 'en');
      const enBody = await translateText(soBody, 'so', 'en');

      const enData = {
        ...soData,
        title: enTitle,
        excerpt: enExcerpt,
        language: 'en',
        category: mapCategoryToEnglish(soData.category),
      };

      savePost(enFilePath, enData, enBody);
      created += 1;

      const soSlug = path.basename(soPost.filePath).replace(/\.md$/i, '');
      const enSlug = enFileName.replace(/\.md$/i, '');
      const translations = {
        ...(soData.translations || {}),
        en: enSlug,
        so: soSlug,
      };
      const updatedSo = { ...soData, translations };
      savePost(soPost.filePath, updatedSo, soBody);
      continue;
    }

    // Case B: English exists, Somali missing => generate Somali
    if (hasEn && !hasSo) {
      const enPost = group.find(p => (p.data.language || '').toLowerCase() === 'en');
      if (!enPost) continue;

      const datePrefix = inferDatePrefix(enPost.filePath);
      // For Somali, add -so suffix to avoid filename collision
      const soFileName = `${datePrefix}${base}-so.md`;
      const soFilePath = path.join(path.dirname(enPost.filePath), soFileName);

      const enData = { ...enPost.data };
      const enBody = enPost.content || '';

      const soTitle = await translateText(String(enData.title || base), 'en', 'so');
      const soExcerpt = await translateText(String(enData.excerpt || ''), 'en', 'so');
      const soBody = await translateText(enBody, 'en', 'so');

      const soData = {
        ...enData,
        title: soTitle,
        excerpt: soExcerpt,
        language: 'so',
        category: mapCategoryToSomali(enData.category),
      };

      savePost(soFilePath, soData, soBody);
      created += 1;

      const enSlug = path.basename(enPost.filePath).replace(/\.md$/i, '');
      const soSlug = soFileName.replace(/\.md$/i, '');

      // Update EN with translations
      const translationsEn = {
        ...(enData.translations || {}),
        en: enSlug,
        so: soSlug,
      };
      savePost(enPost.filePath, { ...enData, translations: translationsEn }, enBody);

      // Write SO with translations as well (already in soData)
      const translationsSo = {
        ...(soData.translations || {}),
        en: enSlug,
        so: soSlug,
      };
      savePost(soFilePath, { ...soData, translations: translationsSo }, soBody);
      continue;
    }
  }

  // eslint-disable-next-line no-console
  console.log(`Auto-translate completed. Created ${created} English post(s).`);
};

main().catch(err => {
  // eslint-disable-next-line no-console
  console.error('Auto-translate failed:', err);
  process.exit(1);
});



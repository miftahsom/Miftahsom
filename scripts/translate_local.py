#!/usr/bin/env python3
import os
import re
import sys
import glob
import yaml
import frontmatter
from pathlib import Path
from transformers import MarianMTModel, MarianTokenizer


BLOG_DIR = Path('src/content/blog')
DATE_PREFIX_RE = re.compile(r'^\d{4}-\d{2}-\d{2}-')
SO_SUFFIX_RE = re.compile(r'-so$', re.IGNORECASE)


def map_category_to_english(category: str) -> str:
    mapping = {
        'Caafimaad': 'Health',
        'Barbaarinta Carruurta': 'Parenting',
        'Waxbarasho': 'Education',
        'Quraanka': 'Quran',
        'Magacyada Carruurta': 'Baby Names',
    }
    return mapping.get((category or '').strip(), category)


def map_category_to_somali(category: str) -> str:
    mapping = {
        'Health': 'Caafimaad',
        'Parenting': 'Barbaarinta Carruurta',
        'Education': 'Waxbarasho',
        'Quran': 'Quraanka',
        'Baby Names': 'Magacyada Carruurta',
    }
    return mapping.get((category or '').strip(), category)


def list_markdown_files(root: Path):
    return [Path(p) for p in glob.glob(str(root / '**' / '*.md'), recursive=True)]


def to_base_slug(file_path: Path) -> str:
    filename = file_path.stem
    no_date = DATE_PREFIX_RE.sub('', filename)
    return SO_SUFFIX_RE.sub('', no_date)


def infer_date_prefix(file_path: Path) -> str:
    m = DATE_PREFIX_RE.match(file_path.stem)
    return m.group(0) if m else ''


class Translator:
    def __init__(self):
        self.models = {}
        self.tokenizers = {}

    def _get(self, pair: str):
        if pair not in self.models:
            model_name = 'Helsinki-NLP/' + pair
            self.tokenizers[pair] = MarianTokenizer.from_pretrained(model_name)
            self.models[pair] = MarianMTModel.from_pretrained(model_name)
        return self.models[pair], self.tokenizers[pair]

    def translate(self, text: str, src: str, tgt: str) -> str:
        if not text or not text.strip():
            return text
        pair = f'opus-mt-{src}-{tgt}'
        model, tokenizer = self._get(pair)
        batch = tokenizer([text], return_tensors='pt', truncation=True)
        gen = model.generate(**batch, max_length=4096)
        out = tokenizer.batch_decode(gen, skip_special_tokens=True)
        return out[0] if out else text


def save_post(file_path: Path, data: dict, content: str):
    fm = frontmatter.Post(content, **data)
    file_path.parent.mkdir(parents=True, exist_ok=True)
    with open(file_path, 'w', encoding='utf-8') as f:
        frontmatter.dump(fm, f)


def main():
    files = list_markdown_files(BLOG_DIR)
    posts = [frontmatter.load(p) for p in files]
    grouped = {}
    for p, path in zip(posts, files):
        base = to_base_slug(path)
        grouped.setdefault(base, []).append((p, path))

    tr = Translator()
    created = 0

    for base, group in grouped.items():
        has_so = any(((p.get('language') or '').lower() == 'so') or SO_SUFFIX_RE.search(path.stem) for p, path in group)
        has_en = any(((p.get('language') or '').lower() == 'en') for p, path in group)

        # Somali -> English
        if has_so and not has_en:
            so_post, so_path = next(((p, path) for p, path in group if (p.get('language') or '').lower() == 'so'), (None, None))
            if so_post is None:
                so_post, so_path = next(((p, path) for p, path in group if SO_SUFFIX_RE.search(path.stem)), (None, None))
            if so_post is None:
                continue

            date_prefix = infer_date_prefix(so_path)
            en_file = BLOG_DIR / f"{date_prefix}{base}.md"

            title = tr.translate(str(so_post.get('title') or base), 'so', 'en')
            excerpt = tr.translate(str(so_post.get('excerpt') or ''), 'so', 'en')
            body = tr.translate(so_post.content or '', 'so', 'en')

            data = dict(so_post)
            data['title'] = title
            data['excerpt'] = excerpt
            data['language'] = 'en'
            data['category'] = map_category_to_english(data.get('category'))

            save_post(en_file, data, body)
            created += 1

            so_slug = so_path.stem
            en_slug = en_file.stem
            translations = dict(data.get('translations') or {})
            translations.update({'en': en_slug, 'so': so_slug})
            save_post(so_path, {**dict(so_post), 'translations': translations}, so_post.content or '')
            continue

        # English -> Somali
        if has_en and not has_so:
            en_post, en_path = next(((p, path) for p, path in group if (p.get('language') or '').lower() == 'en'), (None, None))
            if en_post is None:
                continue

            date_prefix = infer_date_prefix(en_path)
            so_file = BLOG_DIR / f"{date_prefix}{base}-so.md"

            title = tr.translate(str(en_post.get('title') or base), 'en', 'so')
            excerpt = tr.translate(str(en_post.get('excerpt') or ''), 'en', 'so')
            body = tr.translate(en_post.content or '', 'en', 'so')

            data = dict(en_post)
            data['title'] = title
            data['excerpt'] = excerpt
            data['language'] = 'so'
            data['category'] = map_category_to_somali(data.get('category'))

            save_post(so_file, data, body)
            created += 1

            en_slug = en_path.stem
            so_slug = so_file.stem
            translations_en = dict(en_post.get('translations') or {})
            translations_en.update({'en': en_slug, 'so': so_slug})
            save_post(en_path, {**dict(en_post), 'translations': translations_en}, en_post.content or '')

            translations_so = dict(data.get('translations') or {})
            translations_so.update({'en': en_slug, 'so': so_slug})
            save_post(so_file, {**data, 'translations': translations_so}, body)

    print(f'Auto-translate (no API) completed. Created {created} post(s).')


if __name__ == '__main__':
    main()



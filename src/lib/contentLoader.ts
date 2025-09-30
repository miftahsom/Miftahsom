// Content loader for Netlify CMS
export interface BlogPostFrontmatter {
  title: string;
  date: string;
  image: string;
  category: string;
  excerpt: string;
  author?: string;
  readTime?: string;
  language?: string;
}

export interface BlogPost extends BlogPostFrontmatter {
  slug: string;
  html: string;
}

export interface Category {
  title: string;
  description: string;
  image: string;
  color: string;
  slug: string;
}

export interface HomePage {
  title: string;
  description: string;
  heroTitle: string;
  heroExcerpt: string;
  heroImage: string;
}

import matter from 'gray-matter';
import { marked } from 'marked';

// Glob import markdown files as raw strings at build-time
// Use Vite's `{ as: 'raw', eager: true }` so content is bundled at build time
const blogModules = import.meta.glob('../content/blog/**/*.md', { as: 'raw', eager: true }) as Record<string, string>;
// Debug: log discovered markdown files at build/runtime
try {
  const discoveredKeys = Object.keys(blogModules);
  console.log('[contentLoader] discovered markdown files:', discoveredKeys);
} catch (_) {}

export const loadBlogPosts = async (): Promise<BlogPost[]> => {
  const entries = Object.entries(blogModules);
  const posts = await Promise.all(entries.map(async ([path, raw]) => {
    const { content, data } = matter(raw);
    const frontmatter = data as BlogPostFrontmatter;
    const html = marked.parse(content) as string;
    const slug = path
      .split('/')
      .pop()!
      .replace(/\.md$/, '')
      .replace(/^[0-9]{4}-[0-9]{2}-[0-9]{2}-/, '');

    return {
      title: frontmatter.title,
      date: frontmatter.date,
      image: frontmatter.image,
      category: frontmatter.category,
      excerpt: frontmatter.excerpt,
      author: frontmatter.author ?? 'Miftah Som Academy',
      readTime: frontmatter.readTime ?? '5 min read',
      language: frontmatter.language ?? 'en',
      slug,
      html,
    } satisfies BlogPost;
  }));

  // Newest first
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return posts;
};

export const loadCategories = async (): Promise<Category[]> => {
  return [
    {
      title: "Health",
      description: "Comprehensive health information, nutrition guidance, and wellness tips for the whole family.",
      image: "/images/hero-health-nutrition.jpg",
      color: "#10B981",
      slug: "health"
    },
    {
      title: "Parenting",
      description: "Expert guidance for raising healthy, happy children with Islamic values and modern parenting wisdom.",
      image: "/images/hero-parenting.jpg",
      color: "#8B5CF6",
      slug: "parenting"
    },
    {
      title: "Baby Names",
      description: "Beautiful Somali, Arabic, and Islamic names with meaningful origins and cultural significance.",
      image: "/images/hero-baby-names.jpg",
      color: "#EC4899",
      slug: "baby-names"
    },
    {
      title: "Education",
      description: "Educational insights, learning strategies, and academic guidance for students and families.",
      image: "/images/hero-education.jpg",
      color: "#3B82F6",
      slug: "education"
    },
    {
      title: "Quran Studies",
      description: "Islamic education, Quranic studies, and spiritual guidance for modern Muslim families.",
      image: "/images/hero-quran.jpg",
      color: "#10B981",
      slug: "quran"
    }
  ];
};

export const loadHomePage = async (): Promise<HomePage> => {
  return {
    title: "Miftah Som Academy - Health, Parenting, Education & Islamic Studies",
    description: "Empowering families with knowledge about health, parenting, education, and Islamic values through evidence-based content and cultural wisdom.",
    heroTitle: "Essential Nutrition Guide: Building Healthy Eating Habits for the Whole Family",
    heroExcerpt: "Discover comprehensive strategies for maintaining optimal health through balanced nutrition, including practical meal planning tips and evidence-based dietary recommendations that work for busy families.",
    heroImage: "/images/hero-health-nutrition.jpg"
  };
};

// Content loader for Netlify CMS
export interface BlogPost {
  title: string;
  date: string;
  image: string;
  category: string;
  excerpt: string;
  author: string;
  readTime: string;
  language: string;
  slug: string;
  body: string;
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

// In a real implementation, you would fetch this from your CMS API
// For now, we'll use the static content we created
export const loadBlogPosts = async (): Promise<BlogPost[]> => {
  const files = import.meta.glob("../content/blog/**/*.md", { query: "?raw", import: "default" });
  const entries = Object.entries(files);
  if (entries.length === 0) return [];

  const { default: matter } = await import("gray-matter");
  const { marked } = await import("marked");

  const posts: BlogPost[] = await Promise.all(
    entries.map(async ([path, loader]) => {
      const raw = await (loader as () => Promise<string>)();
      const parsed = matter(raw);
      const data = parsed.data as Partial<BlogPost> & { date?: string };
      const body = marked.parse(parsed.content.trim());

      const fileName = path.split("/").pop() || "";
      const withoutExt = fileName.replace(/\.md$/i, "");
      // If filename starts with YYYY-MM-DD-, strip the date for slug
      const slug = withoutExt.replace(/^\d{4}-\d{2}-\d{2}-/, "");

      return {
        title: data.title ?? slug,
        date: data.date ?? new Date().toISOString().slice(0, 10),
        image: data.image ?? "/images/placeholder.svg",
        category: data.category ?? "General",
        excerpt: data.excerpt ?? "",
        author: data.author ?? "",
        readTime: data.readTime ?? "",
        language: (data as any).language ?? "en",
        slug,
        body
      } as BlogPost;
    })
  );

  posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
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

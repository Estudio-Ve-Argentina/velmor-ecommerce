import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
}

async function getBlogDir() {
  const dir = path.join(process.cwd(), "content", "blog");
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
  return dir;
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const blogDir = await getBlogDir();
    const files = await fs.readdir(blogDir);
    const mdxFiles = files.filter(f => f.endsWith('.mdx'));

    const posts = await Promise.all(
      mdxFiles.map(async (filename) => {
        const filePath = path.join(blogDir, filename);
        const fileContent = await fs.readFile(filePath, "utf8");
        const { data, content } = matter(fileContent);
        
        return {
          id: filename.replace('.mdx', ''),
          slug: filename.replace('.mdx', ''),
          title: data.title || "Sin título",
          excerpt: data.excerpt || "",
          image: data.image || "",
          category: data.category || "General",
          author: data.author || "Admin",
          date: data.date || new Date().toISOString().split('T')[0],
          readTime: data.readTime || "5 min",
          metaTitle: data.metaTitle || "",
          metaDescription: data.metaDescription || "",
          keywords: data.keywords || "",
          content: content,
        } as BlogPost;
      })
    );

    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export async function getCategories(): Promise<string[]> {
  const posts = await getAllBlogPosts();
  return [...new Set(posts.map(p => p.category))];
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await getAllBlogPosts();
  return posts.find(p => p.slug === slug);
}

// Alias for compatibility
export const getPostBySlug = getBlogPostBySlug;

export async function getRecentPosts(limit = 3): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  return posts.slice(0, limit);
}

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = process.cwd(); // Or we can use path.join(process.cwd(), "content/blog")

async function getBlogDir() {
  const blogDir = path.join(process.cwd(), "content", "blog");
  try {
    await fs.access(blogDir);
  } catch {
    await fs.mkdir(blogDir, { recursive: true });
  }
  return blogDir;
}

async function isAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_session")?.value === process.env.ADMIN_PASSWORD;
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const blogDir = await getBlogDir();
    const files = await fs.readdir(blogDir);
    const mdxFiles = files.filter(f => f.endsWith('.mdx'));

    const posts = await Promise.all(
      mdxFiles.map(async (filename) => {
        const filePath = path.join(blogDir, filename);
        const fileContent = await fs.readFile(filePath, "utf8");
        const { data } = matter(fileContent);
        
        return {
          slug: filename.replace('.mdx', ''),
          title: data.title || "Sin título",
          excerpt: data.excerpt || "",
          image: data.image || "",
          category: data.category || "General",
          author: data.author || "Admin",
          date: data.date || "",
          readTime: data.readTime || "",
          status: data.status || "draft",
        };
      })
    );

    // Sort by date mostly
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return NextResponse.json({ success: true, posts });
  } catch (error) {
    console.error("Error reading blogs:", error);
    return NextResponse.json({ error: "Failed to read blogs" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const { slug, content, frontmatter } = data;

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    const blogDir = await getBlogDir();
    const filePath = path.join(blogDir, `${slug}.mdx`);

    const fileContent = matter.stringify(content || "", frontmatter || {});
    await fs.writeFile(filePath, fileContent, "utf8");

    return NextResponse.json({ success: true, slug });
  } catch (error) {
    console.error("Error saving blog:", error);
    return NextResponse.json({ error: "Failed to save blog" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

async function getBlogDir() {
  return path.join(process.cwd(), "content", "blog");
}

async function isAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_session")?.value === process.env.ADMIN_PASSWORD;
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { slug } = await params;
    const blogDir = await getBlogDir();
    const filePath = path.join(blogDir, `${slug}.mdx`);

    try {
      await fs.access(filePath);
    } catch {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const fileContent = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(fileContent);

    return NextResponse.json({
      success: true,
      post: {
        slug,
        frontmatter: data,
        content,
      }
    });
  } catch (error) {
    console.error("Error reading blog post:", error);
    return NextResponse.json({ error: "Failed to read blog post" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { slug } = await params;
    const blogDir = await getBlogDir();
    const filePath = path.join(blogDir, `${slug}.mdx`);

    await fs.unlink(filePath);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 });
  }
}

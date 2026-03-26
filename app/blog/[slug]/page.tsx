import { notFound } from "next/navigation"
import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartDrawer } from "@/components/cart-drawer"
import { MDXRemote } from "next-mdx-remote/rsc"
import { getPostBySlug, getAllBlogPosts } from "@/lib/blog-data"
import { Calendar, Clock, ChevronLeft, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const allPosts = await getAllBlogPosts()
  return allPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  
  if (!post) {
    return {
      title: "Articulo no encontrado | VELMOR",
    }
  }

  return {
    title: `${post.title} | Blog VELMOR`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  // Get related posts
  const allPosts = await getAllBlogPosts()
  const relatedPosts = allPosts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 2)

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-20">
        <article className="container mx-auto px-4 py-8 sm:py-12">
          {/* Breadcrumb */}
          <nav className="mb-6 sm:mb-8">
            <Link 
              href="/blog" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Volver al blog
            </Link>
          </nav>

          {/* Header */}
          <header className="max-w-3xl mx-auto text-center mb-8 sm:mb-12">
            <p className="text-xs sm:text-sm text-accent uppercase tracking-wider mb-3 sm:mb-4">
              {post.category}
            </p>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 sm:mb-6 text-balance">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
              <span>Por {post.author}</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                {post.readTime}
              </span>
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative aspect-21/9 mb-8 sm:mb-12 max-w-5xl mx-auto overflow-hidden">
            {post.image && (
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            )}
          </div>

          {/* Content */}
          <div className="max-w-3xl mx-auto">
            <div 
              className="prose prose-lg max-w-none
                prose-headings:font-serif prose-headings:text-foreground
                prose-p:text-muted-foreground prose-p:leading-relaxed
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-strong:text-foreground
                prose-blockquote:border-l-accent prose-blockquote:text-muted-foreground prose-blockquote:italic
                prose-img:rounded-none
                text-sm sm:text-base"
            >
              <MDXRemote source={post.content} />
            </div>

            {/* Amor y Valor Quote */}
            <div className="my-10 sm:my-16 py-8 sm:py-12 border-t border-b border-border text-center">
              <p className="font-serif italic text-xl sm:text-2xl text-primary/80 mb-2">
                "Amor y Valor"
              </p>
              <p className="text-sm text-muted-foreground">
                El lema que guia cada creacion VELMOR.
              </p>
            </div>

            {/* Share */}
            <div className="flex items-center justify-between py-6 border-t border-border">
              <span className="text-sm text-muted-foreground">Compartir este articulo</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="max-w-5xl mx-auto mt-12 sm:mt-16 pt-12 sm:pt-16 border-t border-border">
              <h2 className="font-serif text-xl sm:text-2xl text-foreground mb-6 sm:mb-8 text-center">
                Articulos Relacionados
              </h2>
              <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`} className="group">
                    <article className="bg-card border border-border/50 hover:border-accent/30 transition-all duration-300">
                      <div className="relative aspect-4/3 overflow-hidden">
                        <Image
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                      <div className="p-4 sm:p-6">
                        <h3 className="font-serif text-base sm:text-lg text-foreground mb-2 group-hover:text-primary/80 transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}

import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartDrawer } from "@/components/cart-drawer"
import { blogPosts, getCategories } from "@/lib/blog-data"
import { Calendar, Clock, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Blog | VELMOR - Estilo, Cuero y Elegancia",
  description: "Descubre articulos sobre moda masculina, cuidado del cuero, tendencias y el arte detras de los accesorios premium VELMOR.",
}

export default function BlogPage() {
  const categories = getCategories()
  const featuredPost = blogPosts[0]
  const otherPosts = blogPosts.slice(1)

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-8 sm:py-16">
          {/* Header */}
          <div className="text-center mb-10 sm:mb-16">
            <p className="text-accent font-medium tracking-[0.2em] sm:tracking-[0.3em] uppercase text-xs sm:text-sm mb-3 sm:mb-4">
              Blog
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-3 sm:mb-4">
              Estilo y Elegancia
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              Articulos sobre moda, cuidado del cuero y el arte detras de VELMOR.
            </p>
          </div>

          {/* Featured Post */}
          <Link href={`/blog/${featuredPost.slug}`} className="block group mb-12 sm:mb-16">
            <article className="grid md:grid-cols-2 gap-6 sm:gap-8 bg-card border border-border/50 hover:border-accent/30 transition-colors">
              <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs tracking-wider uppercase px-3 py-1">
                  Destacado
                </span>
              </div>
              <div className="p-6 sm:p-8 flex flex-col justify-center">
                <p className="text-xs sm:text-sm text-accent uppercase tracking-wider mb-2 sm:mb-3">
                  {featuredPost.category}
                </p>
                <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground mb-3 sm:mb-4 group-hover:text-primary/80 transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 line-clamp-3">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    {featuredPost.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                    {featuredPost.readTime}
                  </span>
                </div>
                <span className="inline-flex items-center text-sm font-medium text-primary group-hover:underline">
                  Leer articulo
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </article>
          </Link>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-12">
            <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-primary text-primary-foreground text-xs tracking-wider uppercase">
              Todos
            </span>
            {categories.map((cat) => (
              <span
                key={cat}
                className="px-3 sm:px-4 py-1.5 sm:py-2 border border-border text-xs tracking-wider uppercase hover:border-primary transition-colors cursor-pointer"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Posts Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {otherPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                <article className="bg-card border border-border/50 hover:border-accent/30 transition-all duration-300">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-4 sm:p-6">
                    <p className="text-[10px] sm:text-xs text-accent uppercase tracking-wider mb-2">
                      {post.category}
                    </p>
                    <h3 className="font-serif text-base sm:text-lg text-foreground mb-2 group-hover:text-primary/80 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-3 text-[10px] sm:text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}

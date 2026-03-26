import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import { PaperTexture } from "@/components/paper-texture"
import { getRecentPosts } from "@/lib/blog-data"

export async function BlogSection() {
  const displayPosts = await getRecentPosts(3)

  return (
    <section id="blog" className="relative py-16 sm:py-24">
      {/* Paper texture background */}
      <PaperTexture className="opacity-30" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-accent font-medium tracking-[0.2em] sm:tracking-[0.3em] uppercase text-xs sm:text-sm mb-3 sm:mb-4">
            Blog
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-3 sm:mb-4">
            Historias de Elegancia
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4">
            Inspiracion, consejos y el mundo detras de cada pieza VELMOR.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {displayPosts.map((post) => (
            <Link 
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group"
            >
              <article className="bg-card border border-border/50 hover:border-accent/50 transition-all duration-500 overflow-hidden h-full">
                {/* Post Image */}
                <div className="relative aspect-4/3 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-[10px] sm:text-xs tracking-wider uppercase px-2 sm:px-3 py-1">
                    {post.category}
                  </span>
                </div>

                {/* Post Content */}
                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-3 text-muted-foreground text-[10px] sm:text-xs mb-2 sm:mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                  
                  <h3 className="font-serif text-base sm:text-xl text-foreground mb-2 sm:mb-3 group-hover:text-primary transition-colors leading-tight line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-primary group-hover:text-accent transition-colors tracking-wide uppercase">
                    Leer mas
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8 sm:mt-12">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 border border-primary text-primary hover:bg-primary hover:text-primary-foreground tracking-wider uppercase text-xs sm:text-sm px-6 sm:px-8 py-2.5 sm:py-3 transition-colors"
          >
            Ver Todos los Articulos
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

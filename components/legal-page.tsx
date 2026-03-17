import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartDrawer } from "@/components/cart-drawer"

interface LegalPageProps {
  title: string
  lastUpdated: string
  children: React.ReactNode
}

export function LegalPage({ title, lastUpdated, children }: LegalPageProps) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-8 sm:py-16">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-4">
              {title}
            </h1>
            <p className="text-sm text-muted-foreground mb-8 sm:mb-12">
              Ultima actualizacion: {lastUpdated}
            </p>
            <div className="prose prose-sm sm:prose-base max-w-none
              prose-headings:font-serif prose-headings:text-foreground prose-headings:font-normal
              prose-h2:text-xl sm:prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
              prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3
              prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-li:text-muted-foreground
              prose-strong:text-foreground prose-strong:font-medium
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            ">
              {children}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}

import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ProductsSection } from "@/components/products-section"
import { ScarfDivider } from "@/components/scarf-divider"
import { BrandStory } from "@/components/brand-story"
import { BlogSection } from "@/components/blog-section"
import { TrustBadges } from "@/components/trust-badges"
import { Footer } from "@/components/footer"
import { CartDrawer } from "@/components/cart-drawer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ProductsSection />
      <ScarfDivider />
      <BrandStory />
      <BlogSection />
      <TrustBadges />
      <Footer />
      <CartDrawer />
    </main>
  )
}

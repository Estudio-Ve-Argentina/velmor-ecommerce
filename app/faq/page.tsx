import { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartDrawer } from "@/components/cart-drawer"
import { FAQAccordion } from "@/components/faq-accordion"
import Link from "next/link"
import { Mail } from "lucide-react"

// Firebase
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes | VELMOR",
  description: "Encuentra respuestas a las preguntas más frecuentes sobre productos, envíos, pagos y devoluciones en VELMOR.",
}

// Fetch FAQs from Firebase
async function getFaqs() {
  try {
    if (!db) {
      console.warn("Firebase DB not initialized. Skipping FAQ fetch.");
      return [];
    }
    const faqsRef = collection(db, "faqs");
    const q = query(faqsRef, orderBy("order", "asc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as any[];
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return [];
  }
}

export default async function FAQPage() {
  const faqs = await getFaqs();
  
  // Group by category
  const categoriesMap = new Map<string, any[]>();
  faqs.forEach(faq => {
    const cat = faq.category || "General";
    if (!categoriesMap.has(cat)) {
      categoriesMap.set(cat, []);
    }
    categoriesMap.get(cat)!.push(faq);
  });
  
  const categories = Array.from(categoriesMap.keys());

  // Generate JSON-LD schema for FAQPage
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <Header />
      <main className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-8 sm:py-16">
          {/* Header */}
          <div className="text-center mb-10 sm:mb-16 max-w-2xl mx-auto">
            <p className="text-accent font-medium tracking-[0.2em] sm:tracking-[0.3em] uppercase text-xs sm:text-sm mb-3 sm:mb-4">
              FAQ
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-3 sm:mb-4">
              Preguntas Frecuentes
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Respuestas a las consultas más comunes sobre VELMOR.
            </p>
          </div>

          {/* FAQ Content */}
          <div className="max-w-3xl mx-auto">
            {categories.map((category) => {
              const categoryFaqs = categoriesMap.get(category) || [];
              return (
                <div key={category} className="mb-8 sm:mb-12">
                  <h2 className="font-serif text-lg sm:text-xl text-foreground mb-4 sm:mb-6 pb-2 border-b border-border">
                    {category}
                  </h2>
                  <FAQAccordion faqs={categoryFaqs} />
                </div>
              )
            })}
            
            {faqs.length === 0 && (
              <div className="text-center py-12 border border-border rounded-lg text-muted-foreground">
                <p>Las preguntas frecuentes se actualizarán a la brevedad.</p>
              </div>
            )}
          </div>

          {/* Contact CTA */}
          <div className="max-w-3xl mx-auto mt-12 sm:mt-16 p-6 sm:p-8 bg-secondary/30 border border-border text-center">
            <h3 className="font-serif text-xl sm:text-2xl text-foreground mb-3">
              ¿No encontraste lo que buscabas?
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base mb-4 sm:mb-6">
              Estamos acá para ayudarte. Contactanos y te responderemos a la brevedad.
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 tracking-wider uppercase text-xs sm:text-sm px-6 sm:px-8 py-2.5 sm:py-3 transition-colors"
            >
              <Mail className="w-4 h-4" />
              Contactanos
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}

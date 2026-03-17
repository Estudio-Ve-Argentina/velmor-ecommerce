"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import type { FAQ } from "@/lib/faqs-data"

interface FAQAccordionProps {
  faqs: FAQ[]
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq) => (
        <AccordionItem key={faq.id} value={faq.id} className="border-border">
          <AccordionTrigger className="text-left text-sm sm:text-base font-medium hover:text-primary transition-colors py-4">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

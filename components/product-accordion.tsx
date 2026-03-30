import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ShieldCheck, Truck, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductAccordionProps {
  cuidadosHtml: string;
}

export function ProductAccordion({ cuidadosHtml }: ProductAccordionProps) {
  return (
    <div className="w-full mt-2 pt-2">
      <Accordion type="single" collapsible className="w-full">
        {/* Envíos */}
        <AccordionItem
          value="shipping"
          className="border-b border-border border-t"
        >
          <AccordionTrigger className="hover:no-underline py-4">
            <div className="flex items-center gap-3 font-medium text-foreground text-sm sm:text-base tracking-wide uppercase">
              <Truck className="w-4 h-4 text-primary" />
              Calculador de Envíos
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-4 pt-1">
            <div className="flex flex-col gap-3">
              <p className="text-sm text-muted-foreground mb-1">
                Ingresá tu código postal para conocer las opciones y costos de
                envío.
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ej: 7600"
                  maxLength={8}
                  className="flex-1 max-w-[150px] h-10 px-3 bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                />
                <Button
                  variant="outline"
                  className="h-10 border-border hover:bg-secondary text-xs uppercase tracking-wider"
                >
                  Calcular
                </Button>
              </div>
              <p className="text-[10px] text-muted-foreground italic mt-2">
                * Costo ilustrativo. Las tarifas exactas de tu transporte local
                se confirmarán en el checkout.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Cuidados */}
        {cuidadosHtml && (
          <AccordionItem value="care" className="border-b border-border">
            <AccordionTrigger className="hover:no-underline py-4">
              <div className="flex items-center gap-3 font-medium text-foreground text-sm sm:text-base tracking-wide uppercase">
                <ShieldCheck className="w-4 h-4 text-primary" />
                Cuidados del Producto
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4 pt-1">
              <div
                className="text-sm text-muted-foreground leading-relaxed prose prose-sm max-w-none prose-li:my-0.5"
                dangerouslySetInnerHTML={{ __html: cuidadosHtml }}
              />
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Talles */}
        <AccordionItem value="sizes" className="border-b border-border">
          <AccordionTrigger className="hover:no-underline py-4">
            <div className="flex items-center gap-3 font-medium text-foreground text-sm sm:text-base tracking-wide uppercase">
              <Ruler className="w-4 h-4 text-primary" />
              Guía de Talles
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-4 pt-1">
            <div className="text-sm text-muted-foreground space-y-3">
              <p>
                Nuestros cinturones están medidos desde la punta de la hebilla
                hasta el agujero central.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Talle 85:</strong> Ideal para pantalón 38-40
                </li>
                <li>
                  <strong>Talle 90:</strong> Ideal para pantalón 40-42
                </li>
                <li>
                  <strong>Talle 95:</strong> Ideal para pantalón 44-46
                </li>
                <li>
                  <strong>Talle 100:</strong> Ideal para pantalón 48-50
                </li>
                <li>
                  <strong>Talle 105:</strong> Ideal para pantalón 52-54
                </li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

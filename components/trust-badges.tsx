import { ShieldCheck, Truck, CreditCard } from "lucide-react";
import { PaperTexture } from "@/components/paper-texture";

const badges = [
  {
    icon: ShieldCheck,
    title: "Compra Segura",
    description: "Todos tus datos protegidos con encriptación SSL",
  },
  {
    icon: Truck,
    title: "Envíos a Todo el País",
    description: "Entrega rápida y segura a cualquier destino",
  },
  {
    icon: CreditCard,
    title: "Múltiples Medios de Pago",
    description: "Tarjetas, transferencia y más opciones",
  },
];

export function TrustBadges() {
  return (
    <section className="relative py-16">
      {/* Paper texture background */}
      <PaperTexture className="opacity-80" />
      <div className="absolute inset-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="flex items-center gap-4 justify-center md:justify-start"
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <badge.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground text-sm tracking-wide">
                  {badge.title}
                </h3>
                <p className="text-muted-foreground text-xs mt-1">
                  {badge.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

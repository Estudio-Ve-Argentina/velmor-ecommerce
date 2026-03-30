"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { TrustBadges } from "./trust-badges";

export function ScarfDivider() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#F2EFE9]">
      {/* Hero paper texture — ultra faint */}
      <div
        className="absolute inset-0 z-0 opacity-[0.08] mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: "url('/products-background-white.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Bottom fade — deeper, more gradual */}
      <div
        className="absolute bottom-0 inset-x-0 h-36 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, #F2EFE9 0%, #F2EFE990 40%, transparent 100%)",
        }}
      />

      {/* Central VELMOR signature — slightly more visible */}
      <div
        className="absolute inset-x-0 bottom-8 z-20 flex flex-col items-center gap-2 pointer-events-none"
        style={{ opacity: 0.3 }}
      >
        <span className="font-serif italic text-[#1a1a3a] text-sm tracking-[0.4em] uppercase">
          VELMOR
        </span>
        <Image
          src="/Black%20infinity%20symbol%20with%20sharp%20points.png"
          alt="Isotipo VELMOR - Símbolo de elegancia en cuero"
          width={16}
          height={16}
          style={{
            filter:
              "brightness(0) saturate(100%) invert(9%) sepia(80%) saturate(1200%) hue-rotate(212deg) brightness(90%)",
          }}
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-6 pb-24 md:pb-28">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: Copy + CTA */}
          <div className="order-2 lg:order-1 text-center lg:text-left pt-10 md:pt-24">
            <blockquote
              className="font-serif text-4xl md:text-5xl lg:text-[3rem] italic text-[#1a1a3a] mb-5"
              style={{ lineHeight: "1.12" }}
            >
              El lujo verdadero habla en silencio.
            </blockquote>
            <p className="text-[#1a1a3a]/65 text-sm leading-relaxed max-w-lg mx-auto lg:mx-0 mb-8 font-medium">
              Cada detalle de nuestros productos está pensado para transmitir
              elegancia sin esfuerzo. El valor se encuentra en la sutileza de
              los materiales y la maestría de nuestros artesanos.
            </p>

            {/* Newsletter CTA — wide */}
            <div className="border border-[#1a1a3a]/12 rounded-sm p-5 bg-white/55 backdrop-blur-sm w-full max-w-lg mx-auto lg:mx-0">
              <p className="text-[10px] tracking-[0.22em] uppercase font-semibold text-accent mb-0.5">
                Sé el primero en saber
              </p>
              <p className="text-xs text-[#1a1a3a]/55 mb-3">
                Lanzamientos y ofertas exclusivas para suscriptores.
              </p>
              {subscribed ? (
                <div className="flex items-center gap-2 text-accent text-sm font-medium py-2">
                  ✓ ¡Gracias! Te avisamos pronto.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Tu email"
                    required
                    className="flex-1 text-sm px-3 py-2.5 border border-[#1a1a3a]/18 rounded-l-sm bg-transparent focus:outline-none focus:border-accent placeholder:text-[#1a1a3a]/32 text-[#1a1a3a]"
                  />
                  <button
                    type="submit"
                    className="px-5 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors rounded-r-sm flex items-center"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right: Scarf — pushed right, larger, with hanging hook */}
          <div className="relative order-1 lg:order-2 flex justify-end -mt-6 md:-mt-14">
            {/* Shadow puddle */}
            <div
              className="absolute bottom-0 right-4 w-3/4 h-10 z-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(8,8,59,0.18) 0%, transparent 70%)",
                filter: "blur(12px)",
              }}
            />
            {/* Hanging hook */}
            <div className="absolute top-0 right-[42%] z-20 flex flex-col items-center pointer-events-none">
              {/* Nail head */}
              <div
                className="w-3 h-3 rounded-full border border-[#1a1a3a]/25"
                style={{
                  background:
                    "radial-gradient(circle at 35% 35%, #e8e0d0, #b0a898)",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.35)",
                }}
              />
              {/* String */}
              <div className="w-px h-5 bg-gradient-to-b from-[#1a1a3a]/30 to-transparent" />
            </div>
            <div
              className="relative z-10 w-[380px] md:w-[480px] lg:w-[560px]"
              style={{
                filter:
                  "drop-shadow(0 32px 55px rgba(8,8,59,0.24)) drop-shadow(0 12px 22px rgba(8,8,59,0.15))",
              }}
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mar%2012%2C%202026%2C%2012_03_11%20PM-edQcT8cKG9nrKU8cir6qrAYsLyqjLh.png"
                alt="Pañuelo de seda premium VELMOR - Accesorio complementario"
                width={560}
                height={660}
                className="object-contain"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

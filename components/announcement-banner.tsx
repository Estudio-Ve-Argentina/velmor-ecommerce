"use client";

import useSWR from "swr";

interface BannerMessage {
  id: string;
  text: string;
  active: boolean;
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function AnnouncementBanner() {
  const { data } = useSWR<BannerMessage[]>("/api/admin/banner", fetcher, {
    refreshInterval: 60000,
    fallbackData: [],
  });

  const activeMessages = (data ?? []).filter((m) => m.active);

  // Fallback if no messages configured
  const messages =
    activeMessages.length > 0
      ? activeMessages.map((m) => m.text)
      : [
          "Envío gratis en compras mayores a $50.000",
          "Cuero premium genuino artesanal",
          "Pagá en hasta 12 cuotas sin interés",
          "Envíos a todo el país",
          "Devoluciones sin cargo dentro de los 30 días",
        ];

  // Duplicate for seamless loop
  const all = [...messages, ...messages, ...messages];

  return (
    <div
      className="relative overflow-hidden py-2 select-none"
      style={{ background: "#08083b" }}
    >
      {/* Left fade */}
      <div
        className="absolute left-0 top-0 h-full w-16 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to right, #08083b, transparent)",
        }}
      />
      {/* Right fade */}
      <div
        className="absolute right-0 top-0 h-full w-16 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #08083b, transparent)" }}
      />

      <div
        className="flex whitespace-nowrap"
        style={{
          animation: "ticker-scroll 28s linear infinite",
        }}
      >
        {all.map((msg, i) => (
          <span key={i} className="inline-flex items-center gap-6 mx-12">
            <span
              className="text-[10px] tracking-[0.25em] uppercase font-medium"
              style={{ color: "#D4AF37" }}
            >
              {msg}
            </span>
            {/* Separator diamond */}
            <span className="text-[8px]" style={{ color: "#D4AF3760" }}>
              ◆
            </span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes ticker-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}

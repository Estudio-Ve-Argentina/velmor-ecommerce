"use client";

import { useCartStore } from "@/lib/cart-store";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

export function CartButton() {
  const { toggleCart, getTotalItems } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const itemCount = mounted ? getTotalItems() : 0;

  return (
    <button
      onClick={toggleCart}
      className="relative p-2 hover:bg-secondary rounded-lg transition-colors"
      aria-label="Abrir carrito"
    >
      <ShoppingBag className="w-5 h-5" />
      {mounted && itemCount > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs font-medium rounded-full flex items-center justify-center">
          {itemCount > 9 ? "9+" : itemCount}
        </span>
      )}
    </button>
  );
}

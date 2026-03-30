"use client";

import { useCartStore } from "@/lib/cart-store";
import { X, Minus, Plus, ShoppingBag, Trash2, ExternalLink } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotalPrice, clearCart } =
    useCartStore();
  const [mounted, setMounted] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close cart on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeCart();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, closeCart]);

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!mounted) return null;

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setIsCheckingOut(true);
    try {
      const res = await fetch("/api/tiendanube/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            variantId: item.variantId,
            quantity: item.quantity,
          })),
        }),
      });
      const data = await res.json();
      
      if (res.ok && data.success && data.checkoutUrl) {
        // Redirect user to the secure Checkout from Tiendanube
        window.location.href = data.checkoutUrl;
      } else {
        console.error("Error from checkout API:", data);
        alert("Ocurrió un error al procesar tu carrito. Por favor, intenta de nuevo.");
      }
    } catch (error) {
      console.error("Error submitting checkout:", error);
      alert("Error de conexión. Revisa tu internet y vuelve a intentar.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-primary/30 backdrop-blur-sm z-40 transition-opacity"
          onClick={closeCart}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:max-w-md bg-background z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border">
            <div className="flex items-center gap-2 sm:gap-3">
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              <h2 className="font-serif text-lg sm:text-xl">Tu Carrito</h2>
              {totalItems > 0 && (
                <span className="text-xs sm:text-sm text-muted-foreground">
                  ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                </span>
              )}
            </div>
            <button
              onClick={closeCart}
              className="p-2 hover:bg-secondary transition-colors -mr-2"
              aria-label="Cerrar carrito"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center px-4">
                <ShoppingBag className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground/50 mb-4" />
                <p className="font-serif text-lg sm:text-xl mb-2">Tu carrito esta vacio</p>
                <p className="text-muted-foreground text-sm max-w-xs">
                  Explora nuestra coleccion y encontra algo especial
                </p>
                <p className="font-serif italic text-accent/70 text-sm mt-4">
                  Amor y Valor
                </p>
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-6">
                {items.map((item) => (
                  <div key={item.variantId} className="flex gap-3 sm:gap-4">
                    {/* Product Image */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 relative bg-secondary overflow-hidden shrink-0">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          <ShoppingBag className="w-6 h-6 sm:w-8 sm:h-8" />
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-xs sm:text-sm line-clamp-1">
                        {item.name}
                      </h3>
                      {item.variantName && (
                        <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">
                          {item.variantName}
                        </p>
                      )}
                      <p className="font-semibold text-xs sm:text-sm mt-1">
                        {formatPrice(item.price)}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1 sm:gap-2 mt-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.variantId, item.quantity - 1)
                          }
                          className="w-6 h-6 sm:w-7 sm:h-7 border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                          aria-label="Reducir cantidad"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 sm:w-8 text-center text-xs sm:text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.variantId, item.quantity + 1)
                          }
                          disabled={
                            item.maxStock !== undefined &&
                            item.maxStock !== null &&
                            item.quantity >= item.maxStock
                          }
                          className="w-6 h-6 sm:w-7 sm:h-7 border border-border flex items-center justify-center hover:bg-secondary transition-colors disabled:opacity-50"
                          aria-label="Aumentar cantidad"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => removeItem(item.variantId)}
                          className="ml-auto p-1 sm:p-1.5 text-muted-foreground hover:text-destructive transition-colors"
                          aria-label="Eliminar producto"
                        >
                          <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-border p-4 sm:p-6 space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between text-base sm:text-lg">
                <span className="font-medium">Subtotal</span>
                <span className="font-semibold">
                  {formatPrice(getTotalPrice())}
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-muted-foreground">
                Envio e impuestos calculados en el checkout de Tienda Nube
              </p>
              <Button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full h-11 sm:h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-medium tracking-wider uppercase text-xs sm:text-sm"
              >
                {isCheckingOut ? "Redirigiendo..." : "Finalizar Compra"}
                {!isCheckingOut && <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />}
              </Button>
              <button
                onClick={clearCart}
                className="w-full text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
              >
                Vaciar carrito
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

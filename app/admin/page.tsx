"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import Image from "next/image";
import {
  Package,
  ShoppingCart,
  TrendingUp,
  LogOut,
  RefreshCw,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Minus,
  Plus,
  Save,
  DollarSign,
  Instagram,
  MessageCircle,
  Store,
  Megaphone,
  BookOpen,
  BarChart2,
  Calendar,
  Trash2,
  Edit3,
  X,
  Check,
  PlusCircle,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { formatPrice } from "@/lib/tiendanube";

// ─── Types ───────────────────────────────────────────────────────────────────

type Tab = "dashboard" | "orders" | "stock" | "finance" | "campaigns" | "wiki";

interface StockVariant {
  id: number;
  sku: string;
  values: string;
  stock: number | null;
  stock_management: boolean;
  price: string;
}

interface StockProduct {
  id: number;
  name: string;
  image: string | null;
  variants: StockVariant[];
}

interface Order {
  id: number;
  number: string;
  status: "open" | "closed" | "cancelled";
  payment_status: string;
  shipping_status: string;
  total: string;
  currency: string;
  customer: { name: string; email: string };
  products: { name: string; quantity: number; price: string }[];
  created_at: string;
}

interface ExternalSale {
  id: string;
  date: string;
  channel: "instagram" | "whatsapp" | "showroom" | "other";
  customerName: string;
  products: { name: string; quantity: number; price: number }[];
  total: number;
  notes: string;
}

interface Campaign {
  id: string;
  title: string;
  type: "launch" | "drop" | "sale" | "campaign";
  date: string;
  status: "planned" | "active" | "done";
  description: string;
}

interface AdsEntry {
  id: string;
  platform: "meta" | "google" | "tiktok" | "other";
  month: string;
  spend: number;
  notes: string;
}

interface WikiNote {
  id: string;
  category: "supplier" | "workshop" | "guide" | "contact" | "other";
  title: string;
  content: string;
  updatedAt: string;
}

interface AdminData {
  productCosts: Record<string, number>;
  externalSales: ExternalSale[];
  campaigns: Campaign[];
  adsEntries: AdsEntry[];
  wikiNotes: WikiNote[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const CHANNEL_LABELS: Record<string, string> = {
  instagram: "Instagram",
  whatsapp: "WhatsApp",
  showroom: "Showroom",
  other: "Otro",
};

const CHANNEL_ICONS: Record<string, React.ReactNode> = {
  instagram: <Instagram className="w-4 h-4" />,
  whatsapp: <MessageCircle className="w-4 h-4" />,
  showroom: <Store className="w-4 h-4" />,
  other: <ShoppingCart className="w-4 h-4" />,
};

const CAMPAIGN_TYPE_LABELS: Record<string, string> = {
  launch: "Lanzamiento",
  drop: "Drop",
  sale: "Liquidación",
  campaign: "Campaña",
};

const CAMPAIGN_STATUS_COLORS: Record<string, string> = {
  planned: "bg-blue-100 text-blue-700",
  active: "bg-green-100 text-green-700",
  done: "bg-gray-100 text-gray-600",
};

const PLATFORM_LABELS: Record<string, string> = {
  meta: "Meta Ads",
  google: "Google Ads",
  tiktok: "TikTok Ads",
  other: "Otro",
};

const WIKI_CATEGORY_LABELS: Record<string, string> = {
  supplier: "Proveedor de tela",
  workshop: "Taller de confección",
  guide: "Guia / Proceso",
  contact: "Contacto",
  other: "Otro",
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function StatCard({
  icon,
  label,
  value,
  color = "primary",
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color?: string;
}) {
  const colorMap: Record<string, string> = {
    primary: "bg-primary/10 text-primary",
    amber: "bg-amber-500/10 text-amber-600",
    green: "bg-green-500/10 text-green-600",
    red: "bg-red-500/10 text-red-600",
    accent: "bg-accent/20 text-foreground",
  };
  return (
    <div className="bg-card border border-border rounded-lg p-5 flex items-center gap-4">
      <div className={`p-2 rounded-lg flex-shrink-0 ${colorMap[color] || colorMap.primary}`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-semibold truncate">{value}</p>
      </div>
    </div>
  );
}

function SectionHeader({
  title,
  action,
}: {
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between mb-5">
      <h2 className="font-serif text-xl font-semibold text-foreground">{title}</h2>
      {action}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");

  // Stock state
  const [expandedProducts, setExpandedProducts] = useState<Set<number>>(new Set());
  const [stockChanges, setStockChanges] = useState<Record<string, number>>({});
  const [savingStock, setSavingStock] = useState<string | null>(null);

  // Finance state
  const [editingCost, setEditingCost] = useState<string | null>(null);
  const [costDraft, setCostDraft] = useState("");

  // External sale modal
  const [showExtSaleModal, setShowExtSaleModal] = useState(false);
  const [extSaleForm, setExtSaleForm] = useState({
    customerName: "",
    channel: "instagram" as ExternalSale["channel"],
    productName: "",
    quantity: 1,
    price: "",
    notes: "",
  });

  // Campaign modal
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [campaignForm, setCampaignForm] = useState({
    title: "",
    type: "launch" as Campaign["type"],
    date: "",
    status: "planned" as Campaign["status"],
    description: "",
  });

  // Ads modal
  const [showAdsModal, setShowAdsModal] = useState(false);
  const [adsForm, setAdsForm] = useState({
    platform: "meta" as AdsEntry["platform"],
    month: new Date().toISOString().slice(0, 7),
    spend: "",
    notes: "",
  });

  // Wiki modal
  const [showWikiModal, setShowWikiModal] = useState(false);
  const [editingWiki, setEditingWiki] = useState<WikiNote | null>(null);
  const [wikiForm, setWikiForm] = useState({
    category: "supplier" as WikiNote["category"],
    title: "",
    content: "",
  });

  // ── Auth ──────────────────────────────────────────────────────────────────

  useEffect(() => {
    fetch("/api/admin/check")
      .then((r) => r.json())
      .then((d) => setIsAuthenticated(d.authenticated))
      .catch(() => setIsAuthenticated(false));
  }, []);

  // ── Data fetching ─────────────────────────────────────────────────────────

  const { data: ordersData, isLoading: ordersLoading, mutate: refreshOrders } = useSWR<{
    success: boolean;
    orders: Order[];
  }>(isAuthenticated ? "/api/tiendanube/orders?per_page=50" : null, fetcher, {
    refreshInterval: 60000,
  });

  const { data: stockData, isLoading: stockLoading, mutate: refreshStock } = useSWR<{
    success: boolean;
    products: StockProduct[];
  }>(isAuthenticated ? "/api/tiendanube/stock" : null, fetcher, { refreshInterval: 120000 });

  const { data: adminData, mutate: refreshAdmin } = useSWR<AdminData>(
    isAuthenticated ? "/api/admin/data" : null,
    fetcher
  );

  // ── Derived data ──────────────────────────────────────────────────────────

  const orders = ordersData?.orders || [];
  const products = stockData?.products || [];
  const productCosts = adminData?.productCosts || {};
  const externalSales = adminData?.externalSales || [];
  const campaigns = adminData?.campaigns || [];
  const adsEntries = adminData?.adsEntries || [];
  const wikiNotes = adminData?.wikiNotes || [];

  const openOrders = orders.filter((o) => o.status === "open").length;
  const tnRevenue = orders
    .filter((o) => o.payment_status === "paid")
    .reduce((s, o) => s + parseFloat(o.total), 0);
  const extRevenue = externalSales.reduce((s, sale) => s + sale.total, 0);
  const totalRevenue = tnRevenue + extRevenue;

  const thisMonth = new Date().toISOString().slice(0, 7);
  const thisMonthAdsSpend = adsEntries
    .filter((a) => a.month === thisMonth)
    .reduce((s, a) => s + a.spend, 0);
  const roas = thisMonthAdsSpend > 0 ? totalRevenue / thisMonthAdsSpend : null;

  const lowStockProducts = products.filter((p) =>
    p.variants.some((v) => v.stock_management && v.stock !== null && v.stock <= 5)
  );

  // ── Auth handlers ─────────────────────────────────────────────────────────

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    if (data.success) setIsAuthenticated(true);
    else setLoginError(data.error || "Contraseña incorrecta");
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setIsAuthenticated(false);
    router.refresh();
  };

  // ── Stock handlers ────────────────────────────────────────────────────────

  const toggleProduct = (id: number) => {
    const s = new Set(expandedProducts);
    s.has(id) ? s.delete(id) : s.add(id);
    setExpandedProducts(s);
  };

  const updateLocalStock = (productId: number, variantId: number, val: number) =>
    setStockChanges((prev) => ({ ...prev, [`${productId}-${variantId}`]: Math.max(0, val) }));

  const getStockValue = (productId: number, variant: StockVariant) =>
    stockChanges[`${productId}-${variant.id}`] ?? variant.stock ?? 0;

  const saveStock = async (productId: number, variantId: number) => {
    const key = `${productId}-${variantId}`;
    const newStock = stockChanges[key];
    if (newStock === undefined) return;
    setSavingStock(key);
    try {
      const res = await fetch("/api/tiendanube/stock", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, variantId, stock: newStock }),
      });
      if (res.ok) {
        refreshStock();
        setStockChanges((prev) => { const u = { ...prev }; delete u[key]; return u; });
      }
    } finally {
      setSavingStock(null);
    }
  };

  // ── Finance handlers ──────────────────────────────────────────────────────

  const saveCost = async (productId: string) => {
    const cost = parseFloat(costDraft);
    if (isNaN(cost)) return;
    await fetch("/api/admin/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "productCost", data: { productId, cost } }),
    });
    refreshAdmin();
    setEditingCost(null);
    setCostDraft("");
  };

  const saveExternalSale = async () => {
    const sale = {
      customerName: extSaleForm.customerName,
      channel: extSaleForm.channel,
      notes: extSaleForm.notes,
      products: [{ name: extSaleForm.productName, quantity: extSaleForm.quantity, price: parseFloat(extSaleForm.price) || 0 }],
      total: (parseFloat(extSaleForm.price) || 0) * extSaleForm.quantity,
    };
    await fetch("/api/admin/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "externalSale", data: sale }),
    });
    refreshAdmin();
    setShowExtSaleModal(false);
    setExtSaleForm({ customerName: "", channel: "instagram", productName: "", quantity: 1, price: "", notes: "" });
  };

  // ── Campaign handlers ─────────────────────────────────────────────────────

  const saveCampaign = async () => {
    await fetch("/api/admin/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "campaign", data: campaignForm }),
    });
    refreshAdmin();
    setShowCampaignModal(false);
    setCampaignForm({ title: "", type: "launch", date: "", status: "planned", description: "" });
  };

  const deleteCampaign = async (id: string) => {
    await fetch("/api/admin/data", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "campaign", id }),
    });
    refreshAdmin();
  };

  // ── Ads handlers ──────────────────────────────────────────────────────────

  const saveAds = async () => {
    await fetch("/api/admin/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "adsEntry", data: { ...adsForm, spend: parseFloat(adsForm.spend) || 0 } }),
    });
    refreshAdmin();
    setShowAdsModal(false);
    setAdsForm({ platform: "meta", month: thisMonth, spend: "", notes: "" });
  };

  // ── Wiki handlers ─────────────────────────────────────────────────────────

  const saveWiki = async () => {
    const data = editingWiki ? { ...wikiForm, id: editingWiki.id } : wikiForm;
    await fetch("/api/admin/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "wikiNote", data }),
    });
    refreshAdmin();
    setShowWikiModal(false);
    setEditingWiki(null);
    setWikiForm({ category: "supplier", title: "", content: "" });
  };

  const deleteWiki = async (id: string) => {
    await fetch("/api/admin/data", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "wikiNote", id }),
    });
    refreshAdmin();
  };

  // ── Render: Loading ───────────────────────────────────────────────────────

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner className="w-8 h-8" />
      </div>
    );
  }

  // ── Render: Login ─────────────────────────────────────────────────────────

  if (!isAuthenticated) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-6"
        style={{
          backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%20Mar%2012%2C%202026%2C%2011_58_23%20AM-TWBL6hgagmKiIl8MPPGFWeC7YCWJus.png')`,
          backgroundSize: "cover",
        }}
      >
        <div className="w-full max-w-sm bg-card border border-border rounded-lg p-8 shadow-xl">
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl font-semibold text-foreground mb-1">VELMOR</h1>
            <p className="text-sm text-muted-foreground tracking-widest uppercase">Panel de Gestión</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12"
              autoFocus
            />
            {loginError && <p className="text-sm text-destructive">{loginError}</p>}
            <Button type="submit" className="w-full h-12 tracking-wider uppercase text-sm">
              Ingresar
            </Button>
          </form>
        </div>
      </div>
    );
  }

  // ── Tab navigation ────────────────────────────────────────────────────────

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "dashboard", label: "Dashboard", icon: <BarChart2 className="w-4 h-4" /> },
    { id: "orders", label: "Pedidos", icon: <ShoppingCart className="w-4 h-4" /> },
    { id: "stock", label: "Inventario", icon: <Package className="w-4 h-4" /> },
    { id: "finance", label: "Finanzas", icon: <DollarSign className="w-4 h-4" /> },
    { id: "campaigns", label: "Campañas", icon: <Megaphone className="w-4 h-4" /> },
    { id: "wiki", label: "Wiki", icon: <BookOpen className="w-4 h-4" /> },
  ];

  // ── Render: Dashboard ─────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Top bar */}
      <header className="bg-primary text-primary-foreground shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <span className="font-serif text-lg font-semibold tracking-wide">VELMOR Admin</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-primary-foreground hover:bg-primary-foreground/10 text-xs"
          >
            <LogOut className="w-4 h-4 mr-1" />
            Salir
          </Button>
        </div>
      </header>

      {/* Tab bar */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 flex gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-6">

        {/* ── DASHBOARD ───────────────────────────────────────────────── */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard icon={<TrendingUp className="w-5 h-5" />} label="Ingresos Totales" value={formatPrice(totalRevenue)} color="green" />
              <StatCard icon={<Store className="w-5 h-5" />} label="Tienda Nube" value={formatPrice(tnRevenue)} color="primary" />
              <StatCard icon={<Instagram className="w-5 h-5" />} label="Ventas Externas" value={formatPrice(extRevenue)} color="accent" />
              <StatCard icon={<ShoppingCart className="w-5 h-5" />} label="Pedidos Abiertos" value={openOrders} color="amber" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard icon={<Target className="w-5 h-5" />} label="Inversión en Ads (este mes)" value={formatPrice(thisMonthAdsSpend)} color="amber" />
              <StatCard icon={<BarChart2 className="w-5 h-5" />} label="ROAS (este mes)" value={roas ? `${roas.toFixed(2)}x` : "—"} color={roas && roas >= 2 ? "green" : "red"} />
              <StatCard icon={<AlertCircle className="w-5 h-5" />} label="Productos Stock Bajo" value={lowStockProducts.length} color="red" />
            </div>

            {/* Low stock alert */}
            {lowStockProducts.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-semibold text-red-700 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Alerta: Stock Critico (&le;5 unidades)
                </h3>
                <ul className="space-y-1">
                  {lowStockProducts.map((p) =>
                    p.variants
                      .filter((v) => v.stock_management && v.stock !== null && v.stock <= 5)
                      .map((v) => (
                        <li key={`${p.id}-${v.id}`} className="text-sm text-red-700 flex justify-between">
                          <span>{p.name} — {v.values || v.sku || "Principal"}</span>
                          <span className="font-semibold">{v.stock} ud.</span>
                        </li>
                      ))
                  )}
                </ul>
              </div>
            )}

            {/* Revenue split bar */}
            {totalRevenue > 0 && (
              <div className="bg-card border border-border rounded-lg p-5">
                <h3 className="font-semibold mb-3">Distribución de Ingresos</h3>
                <div className="h-4 rounded-full overflow-hidden flex">
                  <div
                    className="bg-primary transition-all"
                    style={{ width: `${(tnRevenue / totalRevenue) * 100}%` }}
                  />
                  <div
                    className="bg-accent transition-all"
                    style={{ width: `${(extRevenue / totalRevenue) * 100}%` }}
                  />
                </div>
                <div className="flex gap-6 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary inline-block" /> Tienda Nube {tnRevenue > 0 ? `${((tnRevenue / totalRevenue) * 100).toFixed(0)}%` : ""}</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-accent inline-block" /> Externos {extRevenue > 0 ? `${((extRevenue / totalRevenue) * 100).toFixed(0)}%` : ""}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── ORDERS ──────────────────────────────────────────────────── */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            <SectionHeader
              title="Pedidos"
              action={
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setShowExtSaleModal(true)}>
                    <PlusCircle className="w-4 h-4 mr-1" />
                    Venta Externa
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => refreshOrders()}>
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>
              }
            />

            {/* Tienda Nube orders */}
            <div className="bg-card border border-border rounded-lg">
              <div className="p-4 border-b border-border">
                <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Tienda Nube</h3>
              </div>
              {ordersLoading ? (
                <div className="flex justify-center py-10"><Spinner className="w-6 h-6" /></div>
              ) : orders.length === 0 ? (
                <p className="text-center py-10 text-muted-foreground text-sm">Sin pedidos</p>
              ) : (
                <div className="divide-y divide-border">
                  {orders.map((order) => (
                    <div key={order.id} className="p-4 flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-sm">#{order.number}</span>
                          <span className={`px-2 py-0.5 text-xs rounded ${order.status === "open" ? "bg-amber-100 text-amber-700" : order.status === "closed" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                            {order.status === "open" ? "Abierto" : order.status === "closed" ? "Cerrado" : "Cancelado"}
                          </span>
                          <span className={`px-2 py-0.5 text-xs rounded ${order.payment_status === "paid" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                            {order.payment_status === "paid" ? "Pagado" : "Pendiente"}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{order.customer.name}</p>
                        <p className="text-xs text-muted-foreground">{new Date(order.created_at).toLocaleDateString("es-AR", { day: "numeric", month: "short", year: "numeric" })}</p>
                      </div>
                      <span className="font-semibold text-sm whitespace-nowrap">{formatPrice(order.total, order.currency)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* External sales */}
            <div className="bg-card border border-border rounded-lg">
              <div className="p-4 border-b border-border">
                <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Ventas Externas</h3>
              </div>
              {externalSales.length === 0 ? (
                <p className="text-center py-10 text-muted-foreground text-sm">No hay ventas externas registradas</p>
              ) : (
                <div className="divide-y divide-border">
                  {externalSales.map((sale) => (
                    <div key={sale.id} className="p-4 flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="text-muted-foreground mt-0.5">{CHANNEL_ICONS[sale.channel]}</div>
                        <div>
                          <p className="font-medium text-sm">{sale.customerName}</p>
                          <p className="text-xs text-muted-foreground">{CHANNEL_LABELS[sale.channel]} · {new Date(sale.date).toLocaleDateString("es-AR")}</p>
                          {sale.notes && <p className="text-xs text-muted-foreground mt-1 italic">{sale.notes}</p>}
                        </div>
                      </div>
                      <span className="font-semibold text-sm whitespace-nowrap">{formatPrice(sale.total)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── STOCK ───────────────────────────────────────────────────── */}
        {activeTab === "stock" && (
          <div>
            <SectionHeader
              title="Control de Inventario"
              action={
                <Button variant="ghost" size="sm" onClick={() => refreshStock()}>
                  <RefreshCw className="w-4 h-4 mr-1" />
                  Actualizar
                </Button>
              }
            />

            {lowStockProducts.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                <p className="text-sm text-red-700">
                  <span className="font-semibold">{lowStockProducts.length} producto{lowStockProducts.length > 1 ? "s" : ""}</span> con stock critico (&le;5 unidades)
                </p>
              </div>
            )}

            <div className="bg-card border border-border rounded-lg">
              {stockLoading ? (
                <div className="flex justify-center py-12"><Spinner className="w-6 h-6" /></div>
              ) : products.length === 0 ? (
                <p className="text-center py-12 text-muted-foreground text-sm">Sin productos</p>
              ) : (
                <div className="divide-y divide-border">
                  {products.map((product) => {
                    const expanded = expandedProducts.has(product.id);
                    const hasLow = product.variants.some((v) => v.stock_management && v.stock !== null && v.stock <= 5);

                    return (
                      <div key={product.id}>
                        <button
                          onClick={() => toggleProduct(product.id)}
                          className="w-full p-4 flex items-center gap-4 hover:bg-secondary/40 transition-colors text-left"
                        >
                          <div className="w-11 h-11 bg-secondary rounded overflow-hidden flex-shrink-0">
                            {product.image && (
                              <Image src={product.image} alt={product.name} width={44} height={44} className="object-cover w-full h-full" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{product.name}</p>
                            <p className="text-xs text-muted-foreground">{product.variants.length} variante{product.variants.length > 1 ? "s" : ""}</p>
                          </div>
                          {hasLow && <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded">Stock bajo</span>}
                          {expanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                        </button>

                        {expanded && (
                          <div className="bg-secondary/20 px-4 pb-2">
                            {product.variants.map((variant) => {
                              const key = `${product.id}-${variant.id}`;
                              const current = getStockValue(product.id, variant);
                              const hasChange = stockChanges[key] !== undefined && stockChanges[key] !== (variant.stock ?? 0);
                              const isSaving = savingStock === key;

                              if (!variant.stock_management) {
                                return (
                                  <div key={variant.id} className="py-2 flex justify-between text-sm">
                                    <span className="text-muted-foreground">{variant.values || variant.sku || "Principal"}</span>
                                    <span className="text-muted-foreground text-xs">Sin control de stock</span>
                                  </div>
                                );
                              }

                              return (
                                <div key={variant.id} className="py-2 flex items-center gap-3 flex-wrap">
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">{variant.values || variant.sku || "Principal"}</p>
                                    <p className="text-xs text-muted-foreground">{formatPrice(variant.price)}</p>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <button onClick={() => updateLocalStock(product.id, variant.id, current - 1)} className="w-7 h-7 rounded border border-border flex items-center justify-center hover:bg-secondary text-sm">
                                      <Minus className="w-3 h-3" />
                                    </button>
                                    <input
                                      type="number"
                                      value={current}
                                      onChange={(e) => updateLocalStock(product.id, variant.id, parseInt(e.target.value) || 0)}
                                      className="w-14 h-7 text-center border border-border rounded text-sm"
                                    />
                                    <button onClick={() => updateLocalStock(product.id, variant.id, current + 1)} className="w-7 h-7 rounded border border-border flex items-center justify-center hover:bg-secondary text-sm">
                                      <Plus className="w-3 h-3" />
                                    </button>
                                    {hasChange && (
                                      <Button size="sm" className="h-7 px-2 text-xs" onClick={() => saveStock(product.id, variant.id)} disabled={isSaving}>
                                        {isSaving ? <Spinner className="w-3 h-3" /> : <><Save className="w-3 h-3 mr-1" />Guardar</>}
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── FINANCE ─────────────────────────────────────────────────── */}
        {activeTab === "finance" && (
          <div className="space-y-6">
            <SectionHeader title="Finanzas y Costos" />

            {/* Summary cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard icon={<Store className="w-5 h-5" />} label="Tienda Nube" value={formatPrice(tnRevenue)} color="primary" />
              <StatCard icon={<Instagram className="w-5 h-5" />} label="Ventas Externas" value={formatPrice(extRevenue)} color="accent" />
              <StatCard icon={<TrendingUp className="w-5 h-5" />} label="Total del Período" value={formatPrice(totalRevenue)} color="green" />
              <StatCard icon={<Target className="w-5 h-5" />} label="Inversión Ads" value={formatPrice(thisMonthAdsSpend)} color="amber" />
            </div>

            {/* Product costs table */}
            <div className="bg-card border border-border rounded-lg">
              <div className="p-4 border-b border-border">
                <h3 className="font-semibold">Costos de Producción por Producto</h3>
                <p className="text-xs text-muted-foreground mt-1">Asigna costos para calcular el margen real de ganancia</p>
              </div>
              {stockLoading ? (
                <div className="flex justify-center py-8"><Spinner className="w-5 h-5" /></div>
              ) : products.length === 0 ? (
                <p className="text-center py-8 text-muted-foreground text-sm">Sin productos cargados</p>
              ) : (
                <div className="divide-y divide-border">
                  {products.map((product) => {
                    const variantPrice = parseFloat(product.variants[0]?.price || "0");
                    const cost = productCosts[product.id] || 0;
                    const platformFee = variantPrice * 0.085; // ~8.5% Tienda Nube
                    const margin = variantPrice - cost - platformFee;
                    const marginPct = variantPrice > 0 ? (margin / variantPrice) * 100 : 0;
                    const isEditing = editingCost === String(product.id);

                    return (
                      <div key={product.id} className="p-4 flex items-center gap-4 flex-wrap">
                        <div className="w-10 h-10 bg-secondary rounded overflow-hidden flex-shrink-0">
                          {product.image && <Image src={product.image} alt={product.name} width={40} height={40} className="object-cover w-full h-full" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{product.name}</p>
                          <p className="text-xs text-muted-foreground">Precio venta: {formatPrice(variantPrice)}</p>
                        </div>
                        <div className="flex items-center gap-3 flex-wrap">
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground">Costo</p>
                            {isEditing ? (
                              <div className="flex items-center gap-1">
                                <input
                                  type="number"
                                  value={costDraft}
                                  onChange={(e) => setCostDraft(e.target.value)}
                                  className="w-20 h-7 text-center border border-border rounded text-sm"
                                  autoFocus
                                  onKeyDown={(e) => e.key === "Enter" && saveCost(String(product.id))}
                                />
                                <button onClick={() => saveCost(String(product.id))} className="text-green-600"><Check className="w-4 h-4" /></button>
                                <button onClick={() => setEditingCost(null)} className="text-muted-foreground"><X className="w-4 h-4" /></button>
                              </div>
                            ) : (
                              <button
                                onClick={() => { setEditingCost(String(product.id)); setCostDraft(String(cost)); }}
                                className="flex items-center gap-1 text-sm font-medium hover:text-primary"
                              >
                                {formatPrice(cost)}
                                <Edit3 className="w-3 h-3 text-muted-foreground" />
                              </button>
                            )}
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground">Comisión</p>
                            <p className="text-sm">{formatPrice(platformFee)}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground">Margen</p>
                            <p className={`text-sm font-semibold ${margin >= 0 ? "text-green-600" : "text-red-600"}`}>
                              {formatPrice(margin)} ({marginPct.toFixed(0)}%)
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Ads tracker */}
            <div className="bg-card border border-border rounded-lg">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div>
                  <h3 className="font-semibold">Inversión en Ads</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Rastreá tu gasto mensual y calculá el ROAS</p>
                </div>
                <Button size="sm" variant="outline" onClick={() => setShowAdsModal(true)}>
                  <PlusCircle className="w-4 h-4 mr-1" />
                  Registrar
                </Button>
              </div>
              {adsEntries.length === 0 ? (
                <p className="text-center py-8 text-muted-foreground text-sm">Sin inversiones registradas</p>
              ) : (
                <div className="divide-y divide-border">
                  {adsEntries.sort((a, b) => b.month.localeCompare(a.month)).map((entry) => {
                    const monthRevenue = tnRevenue + extRevenue;
                    const entryRoas = entry.spend > 0 ? monthRevenue / entry.spend : null;
                    return (
                      <div key={entry.id} className="p-4 flex items-center justify-between gap-4">
                        <div>
                          <p className="font-medium text-sm">{PLATFORM_LABELS[entry.platform]}</p>
                          <p className="text-xs text-muted-foreground">{entry.month} {entry.notes && `· ${entry.notes}`}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-sm">{formatPrice(entry.spend)}</p>
                          {entryRoas && <p className={`text-xs ${entryRoas >= 2 ? "text-green-600" : "text-red-600"}`}>ROAS {entryRoas.toFixed(2)}x</p>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── CAMPAIGNS ───────────────────────────────────────────────── */}
        {activeTab === "campaigns" && (
          <div>
            <SectionHeader
              title="Campañas y Lanzamientos"
              action={
                <Button size="sm" onClick={() => setShowCampaignModal(true)}>
                  <PlusCircle className="w-4 h-4 mr-1" />
                  Nueva Campaña
                </Button>
              }
            />

            {campaigns.length === 0 ? (
              <div className="bg-card border border-border rounded-lg py-16 text-center text-muted-foreground">
                <Calendar className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm">No hay campañas planificadas</p>
                <p className="text-xs mt-1">Crea tu primer drop o lanzamiento</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {campaigns.sort((a, b) => a.date.localeCompare(b.date)).map((c) => (
                  <div key={c.id} className="bg-card border border-border rounded-lg p-5">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{CAMPAIGN_TYPE_LABELS[c.type]}</span>
                          <span className={`px-2 py-0.5 text-xs rounded ${CAMPAIGN_STATUS_COLORS[c.status]}`}>
                            {c.status === "planned" ? "Planificado" : c.status === "active" ? "Activo" : "Finalizado"}
                          </span>
                        </div>
                        <h3 className="font-semibold">{c.title}</h3>
                      </div>
                      <button onClick={() => deleteCampaign(c.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
                    </div>
                    {c.date && (
                      <p className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(c.date + "T00:00:00").toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" })}
                      </p>
                    )}
                    {c.description && <p className="text-sm text-muted-foreground">{c.description}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── WIKI ────────────────────────────────────────────────────── */}
        {activeTab === "wiki" && (
          <div>
            <SectionHeader
              title="Wiki de Operaciones"
              action={
                <Button size="sm" onClick={() => { setEditingWiki(null); setWikiForm({ category: "supplier", title: "", content: "" }); setShowWikiModal(true); }}>
                  <PlusCircle className="w-4 h-4 mr-1" />
                  Nueva Nota
                </Button>
              }
            />

            {wikiNotes.length === 0 ? (
              <div className="bg-card border border-border rounded-lg py-16 text-center text-muted-foreground">
                <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm">No hay notas de operaciones</p>
                <p className="text-xs mt-1">Guardá contactos de proveedores, talleres y guías de proceso</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {wikiNotes.map((note) => (
                  <div key={note.id} className="bg-card border border-border rounded-lg p-5">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <span className="text-xs font-medium text-accent-foreground bg-accent/30 px-2 py-0.5 rounded">{WIKI_CATEGORY_LABELS[note.category]}</span>
                        <h3 className="font-semibold mt-2">{note.title}</h3>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => { setEditingWiki(note); setWikiForm({ category: note.category, title: note.title, content: note.content }); setShowWikiModal(true); }} className="text-muted-foreground hover:text-foreground">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button onClick={() => deleteWiki(note.id)} className="text-muted-foreground hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{note.content}</p>
                    <p className="text-xs text-muted-foreground mt-3">Actualizado: {new Date(note.updatedAt).toLocaleDateString("es-AR")}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* ── MODALS ────────────────────────────────────────────────────── */}

      {/* External Sale Modal */}
      {showExtSaleModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif font-semibold text-lg">Registrar Venta Externa</h3>
              <button onClick={() => setShowExtSaleModal(false)}><X className="w-5 h-5 text-muted-foreground" /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wide">Canal</label>
                <select value={extSaleForm.channel} onChange={(e) => setExtSaleForm({ ...extSaleForm, channel: e.target.value as ExternalSale["channel"] })} className="w-full h-10 border border-border rounded px-3 text-sm bg-background mt-1">
                  <option value="instagram">Instagram</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="showroom">Showroom</option>
                  <option value="other">Otro</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wide">Cliente</label>
                <Input value={extSaleForm.customerName} onChange={(e) => setExtSaleForm({ ...extSaleForm, customerName: e.target.value })} placeholder="Nombre del cliente" className="mt-1" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wide">Producto</label>
                <Input value={extSaleForm.productName} onChange={(e) => setExtSaleForm({ ...extSaleForm, productName: e.target.value })} placeholder="Nombre del producto" className="mt-1" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wide">Cantidad</label>
                  <Input type="number" value={extSaleForm.quantity} onChange={(e) => setExtSaleForm({ ...extSaleForm, quantity: parseInt(e.target.value) || 1 })} min={1} className="mt-1" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wide">Precio unit. (ARS)</label>
                  <Input type="number" value={extSaleForm.price} onChange={(e) => setExtSaleForm({ ...extSaleForm, price: e.target.value })} placeholder="0" className="mt-1" />
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wide">Notas</label>
                <Input value={extSaleForm.notes} onChange={(e) => setExtSaleForm({ ...extSaleForm, notes: e.target.value })} placeholder="Opcional" className="mt-1" />
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" className="flex-1" onClick={() => setShowExtSaleModal(false)}>Cancelar</Button>
                <Button className="flex-1" onClick={saveExternalSale}>Registrar Venta</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Campaign Modal */}
      {showCampaignModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif font-semibold text-lg">Nueva Campaña</h3>
              <button onClick={() => setShowCampaignModal(false)}><X className="w-5 h-5 text-muted-foreground" /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wide">Titulo</label>
                <Input value={campaignForm.title} onChange={(e) => setCampaignForm({ ...campaignForm, title: e.target.value })} placeholder="Nombre de la campaña" className="mt-1" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wide">Tipo</label>
                  <select value={campaignForm.type} onChange={(e) => setCampaignForm({ ...campaignForm, type: e.target.value as Campaign["type"] })} className="w-full h-10 border border-border rounded px-3 text-sm bg-background mt-1">
                    <option value="launch">Lanzamiento</option>
                    <option value="drop">Drop</option>
                    <option value="sale">Liquidación</option>
                    <option value="campaign">Campaña</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wide">Estado</label>
                  <select value={campaignForm.status} onChange={(e) => setCampaignForm({ ...campaignForm, status: e.target.value as Campaign["status"] })} className="w-full h-10 border border-border rounded px-3 text-sm bg-background mt-1">
                    <option value="planned">Planificado</option>
                    <option value="active">Activo</option>
                    <option value="done">Finalizado</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wide">Fecha</label>
                <Input type="date" value={campaignForm.date} onChange={(e) => setCampaignForm({ ...campaignForm, date: e.target.value })} className="mt-1" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wide">Descripcion</label>
                <textarea
                  value={campaignForm.description}
                  onChange={(e) => setCampaignForm({ ...campaignForm, description: e.target.value })}
                  placeholder="Detalles de la campaña..."
                  className="w-full h-20 border border-border rounded px-3 py-2 text-sm bg-background resize-none mt-1"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" className="flex-1" onClick={() => setShowCampaignModal(false)}>Cancelar</Button>
                <Button className="flex-1" onClick={saveCampaign}>Crear Campaña</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Ads Modal */}
      {showAdsModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif font-semibold text-lg">Registrar Inversion en Ads</h3>
              <button onClick={() => setShowAdsModal(false)}><X className="w-5 h-5 text-muted-foreground" /></button>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wide">Plataforma</label>
                  <select value={adsForm.platform} onChange={(e) => setAdsForm({ ...adsForm, platform: e.target.value as AdsEntry["platform"] })} className="w-full h-10 border border-border rounded px-3 text-sm bg-background mt-1">
                    <option value="meta">Meta Ads</option>
                    <option value="google">Google Ads</option>
                    <option value="tiktok">TikTok Ads</option>
                    <option value="other">Otro</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wide">Mes</label>
                  <Input type="month" value={adsForm.month} onChange={(e) => setAdsForm({ ...adsForm, month: e.target.value })} className="mt-1" />
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wide">Gasto (ARS)</label>
                <Input type="number" value={adsForm.spend} onChange={(e) => setAdsForm({ ...adsForm, spend: e.target.value })} placeholder="0" className="mt-1" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wide">Notas</label>
                <Input value={adsForm.notes} onChange={(e) => setAdsForm({ ...adsForm, notes: e.target.value })} placeholder="Campaña, objetivo..." className="mt-1" />
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" className="flex-1" onClick={() => setShowAdsModal(false)}>Cancelar</Button>
                <Button className="flex-1" onClick={saveAds}>Guardar</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Wiki Modal */}
      {showWikiModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif font-semibold text-lg">{editingWiki ? "Editar Nota" : "Nueva Nota"}</h3>
              <button onClick={() => setShowWikiModal(false)}><X className="w-5 h-5 text-muted-foreground" /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wide">Categoria</label>
                <select value={wikiForm.category} onChange={(e) => setWikiForm({ ...wikiForm, category: e.target.value as WikiNote["category"] })} className="w-full h-10 border border-border rounded px-3 text-sm bg-background mt-1">
                  <option value="supplier">Proveedor de tela</option>
                  <option value="workshop">Taller de confeccion</option>
                  <option value="guide">Guia / Proceso</option>
                  <option value="contact">Contacto</option>
                  <option value="other">Otro</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wide">Titulo</label>
                <Input value={wikiForm.title} onChange={(e) => setWikiForm({ ...wikiForm, title: e.target.value })} placeholder="Ej: Proveedor tela seda China" className="mt-1" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wide">Contenido</label>
                <textarea
                  value={wikiForm.content}
                  onChange={(e) => setWikiForm({ ...wikiForm, content: e.target.value })}
                  placeholder="Contacto, dirección, notas, guía de talles..."
                  className="w-full h-28 border border-border rounded px-3 py-2 text-sm bg-background resize-none mt-1"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" className="flex-1" onClick={() => setShowWikiModal(false)}>Cancelar</Button>
                <Button className="flex-1" onClick={saveWiki}>Guardar</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import {
  Home, Package, MapPin, User, LogOut, ShoppingBag, Calendar,
  ChevronRight, HelpCircle, Mail, Eye, Plus, Pencil, Trash2, X, Check
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

interface Props {
  onBack: () => void;
  onFaqClick?: () => void;
  onContactClick?: () => void;
  onLogout?: () => void;
}

// ── Mock data ──────────────────────────────────────────────────────────────────
const MOCK_USER = { firstName: "Jean", lastName: "Dupont", email: "jean.dupont@email.fr", phone: "+33 6 12 34 56 78" };

const MOCK_ORDERS = [
  { id: "FOL-1048", date: "12 août 2026",    status: "En cours",  total: 89.70  },
  { id: "FOL-1027", date: "28 juillet 2026", status: "Expédiée",  total: 42.90  },
  { id: "FOL-0996", date: "10 juillet 2026", status: "Terminée",  total: 129.00 },
  { id: "FOL-0971", date: "3 juin 2026",     status: "Terminée",  total: 54.50  },
  { id: "FOL-0952", date: "14 mai 2026",     status: "Annulée",   total: 22.90  },
];

const MOCK_ADDRESSES = [
  { id: 1, label: "Domicile", name: "Jean Dupont", line: "12 rue de la République", city: "69001 Lyon", country: "France", isDefault: true },
  { id: 2, label: "Bureau",   name: "Jean Dupont", line: "45 avenue Berthelot",     city: "69007 Lyon", country: "France", isDefault: false },
];

// ── Helpers ────────────────────────────────────────────────────────────────────
const STATUS_STYLE: Record<string, string> = {
  "En cours": "bg-green-50 text-green-700 border border-green-200",
  "Expédiée":  "bg-gray-50  text-[#353A3F]  border border-gray-200",
  "Terminée":  "bg-gray-100 text-gray-600  border border-gray-200",
  "Annulée":   "bg-red-50   text-red-600   border border-red-200",
};

function BgPattern() {
  return (
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="acctBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EFF7FF" />
          <stop offset="100%" stopColor="#F8FBFF" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#acctBg)" />
      <pattern id="acctDots" width="32" height="32" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="1" fill="#353A3F" fillOpacity="0.05" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#acctDots)" />
      {["M -40 120 Q 200 80 500 200 T 1100 160","M -20 300 Q 300 260 600 340 T 1200 300","M 100 500 Q 400 450 700 530 T 1400 480"].map((d,i) => (
        <path key={i} d={d} fill="none" stroke="#A0A3A7" strokeWidth="1" strokeOpacity={0.06} />
      ))}
    </svg>
  );
}

// ── Sub-views ─────────────────────────────────────────────────────────────────

function StatCard({ icon, label, value, iconBg }: { icon: React.ReactNode; label: string; value: string; iconBg: string }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4 flex-1 min-w-0">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-gray-400 mb-0.5">{label}</p>
        <p className="text-base font-bold text-[#353A3F] truncate">{value}</p>
      </div>
    </div>
  );
}

function OrderRow({ order, onView }: { order: typeof MOCK_ORDERS[0]; onView?: () => void }) {
  return (
    <tr className="border-b border-gray-50 last:border-0">
      <td className="py-3.5 pr-4">
        <span className="text-sm font-semibold text-[#C75B12]">#{order.id}</span>
      </td>
      <td className="py-3.5 pr-4 text-sm text-gray-600 whitespace-nowrap">{order.date}</td>
      <td className="py-3.5 pr-4">
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLE[order.status]}`}>
          {order.status}
        </span>
      </td>
      <td className="py-3.5 pr-4 text-sm font-medium text-gray-800 whitespace-nowrap">
        {order.total.toFixed(2).replace(".", ",")} €
      </td>
      <td className="py-3.5">
        <button
          onClick={onView}
          className="text-xs font-semibold border border-gray-200 rounded-lg px-3 py-1.5 text-gray-700 hover:border-[#353A3F] hover:text-[#353A3F] transition-colors"
        >
          Voir
        </button>
      </td>
    </tr>
  );
}

function OverviewView({ onFaqClick, onContactClick, onTabChange }: { onFaqClick?: () => void; onContactClick?: () => void; onTabChange: (t: NavTab) => void }) {
  return (
    <div className="flex flex-col gap-6">
      {/* Stats */}
      <div className="flex flex-col sm:flex-row gap-4">
        <StatCard icon={<ShoppingBag className="w-5 h-5 text-[#C75B12]" />} label="Commandes" value="3" iconBg="bg-orange-50" />
        <StatCard icon={<Calendar className="w-5 h-5 text-[#353A3F]" />} label="Dernière commande" value="12 août 2026" iconBg="bg-gray-50" />
        <StatCard icon={<MapPin className="w-5 h-5 text-green-600" />} label="Adresse de livraison" value="Lyon, France" iconBg="bg-green-50" />
      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="text-base font-bold text-[#353A3F] mb-5">Mes commandes récentes</h2>
        <div className="overflow-x-auto -mx-1">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="border-b border-gray-100">
                {["Commande","Date","Statut","Total","Actions"].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-gray-500 pb-3 pr-4 last:pr-0">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MOCK_ORDERS.slice(0, 3).map(o => <OrderRow key={o.id} order={o} />)}
            </tbody>
          </table>
        </div>
        <button
          onClick={() => onTabChange("orders")}
          className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-[#353A3F] hover:text-[#C75B12] transition-colors"
        >
          Voir toutes mes commandes <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Help */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="text-base font-bold text-[#353A3F] mb-1">Besoin d'aide ?</h2>
        <p className="text-sm text-gray-400 mb-5">Trouvez rapidement des réponses sur vos commandes, livraisons, retours et la gestion de votre compte.</p>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={onFaqClick}
            className="flex items-center gap-2 text-sm font-semibold text-[#353A3F] hover:text-[#C75B12] transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            Centre d'aide &amp; FAQ
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onContactClick}
            className="flex items-center gap-2 text-sm font-semibold text-[#353A3F] hover:text-[#C75B12] transition-colors"
          >
            <Mail className="w-4 h-4" />
            Nous contacter
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function OrdersView() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h2 className="text-base font-bold text-[#353A3F] mb-5">Mes commandes</h2>
      <div className="overflow-x-auto -mx-1">
        <table className="w-full min-w-[500px]">
          <thead>
            <tr className="border-b border-gray-100">
              {["Commande","Date","Statut","Total","Actions"].map(h => (
                <th key={h} className="text-left text-xs font-semibold text-gray-500 pb-3 pr-4 last:pr-0">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MOCK_ORDERS.map(o => <OrderRow key={o.id} order={o} />)}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AddressesView() {
  const [addresses, setAddresses] = useState(MOCK_ADDRESSES);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-[#353A3F]">Mes adresses</h2>
        <button className="flex items-center gap-1.5 text-xs font-semibold text-white bg-[#C75B12] hover:bg-[#a34910] px-3.5 py-2 rounded-xl transition-colors">
          <Plus className="w-3.5 h-3.5" /> Ajouter une adresse
        </button>
      </div>
      {addresses.map(addr => (
        <div key={addr.id} className="bg-white rounded-2xl border border-gray-100 p-5 flex items-start justify-between gap-4">
          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0 mt-0.5">
              <MapPin className="w-4 h-4 text-[#353A3F]" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-bold text-[#353A3F]">{addr.label}</span>
                {addr.isDefault && (
                  <span className="text-[10px] font-bold text-[#C75B12] bg-orange-50 border border-orange-100 px-2 py-0.5 rounded-full">Par défaut</span>
                )}
              </div>
              <p className="text-sm text-gray-700">{addr.name}</p>
              <p className="text-sm text-gray-500">{addr.line}</p>
              <p className="text-sm text-gray-500">{addr.city}, {addr.country}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <button className="p-2 rounded-lg text-gray-400 hover:text-[#353A3F] hover:bg-gray-50 transition-colors"><Pencil className="w-4 h-4" /></button>
            <button
              onClick={() => setAddresses(a => a.filter(x => x.id !== addr.id))}
              className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function InfoView() {
  const [saved, setSaved] = useState(false);
  const inputCls = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#353A3F]/50 focus:ring-2 focus:ring-[#353A3F]/8 transition-all";
  const labelCls = "block text-xs font-semibold text-[#353A3F] mb-1.5";
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h2 className="text-base font-bold text-[#353A3F] mb-6">Informations du compte</h2>
      <form
        className="flex flex-col gap-5"
        onSubmit={e => { e.preventDefault(); setSaved(true); setTimeout(() => setSaved(false), 2500); }}
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className={labelCls}>Prénom</label><input defaultValue={MOCK_USER.firstName} className={inputCls} /></div>
          <div><label className={labelCls}>Nom</label><input defaultValue={MOCK_USER.lastName} className={inputCls} /></div>
        </div>
        <div><label className={labelCls}>E-mail</label><input type="email" defaultValue={MOCK_USER.email} className={inputCls} /></div>
        <div><label className={labelCls}>Téléphone</label><input type="tel" defaultValue={MOCK_USER.phone} className={inputCls} /></div>
        <div className="border-t border-gray-100 pt-5">
          <p className="text-xs font-semibold text-[#353A3F] mb-4">Changer le mot de passe</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className={labelCls}>Nouveau mot de passe</label><input type="password" placeholder="••••••••" className={inputCls} /></div>
            <div><label className={labelCls}>Confirmer</label><input type="password" placeholder="••••••••" className={inputCls} /></div>
          </div>
        </div>
        <div className="flex items-center gap-3 pt-1">
          <button
            type="submit"
            className="flex items-center gap-2 bg-[#C75B12] hover:bg-[#a34910] text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-all"
          >
            {saved ? <><Check className="w-4 h-4" /> Enregistré</> : "Enregistrer les modifications"}
          </button>
          {saved && <span className="text-xs text-green-600 font-medium">Vos informations ont été mises à jour.</span>}
        </div>
      </form>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

type NavTab = "overview" | "orders" | "addresses" | "info";

const NAV_ITEMS: { tab: NavTab | "logout"; icon: React.ElementType; label: string }[] = [
  { tab: "overview",   icon: Home,    label: "Vue d'ensemble" },
  { tab: "orders",     icon: Package, label: "Mes commandes" },
  { tab: "addresses",  icon: MapPin,  label: "Mes adresses" },
  { tab: "info",       icon: User,    label: "Informations du compte" },
  { tab: "logout",     icon: LogOut,  label: "Se déconnecter" },
];

export function AccountPage({ onBack, onFaqClick, onContactClick, onLogout }: Props) {
  const [activeTab, setActiveTab] = useState<NavTab>("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { logout } = useAuth();

  const handleNav = (tab: NavTab | "logout") => {
    if (tab === "logout") { logout(); onLogout?.(); return; }
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  const activeLabel = NAV_ITEMS.find(i => i.tab === activeTab)?.label ?? "";

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BgPattern />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-10 lg:py-14">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center border border-[#353A3F]/25 text-[#353A3F] text-[11px] font-bold tracking-widest uppercase rounded-full px-5 py-2 mb-5 bg-white/70 backdrop-blur-sm">
            Mon compte
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#353A3F] mb-2">
            Bonjour {MOCK_USER.firstName},
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Gérez vos commandes, vos adresses et vos informations personnelles.
          </p>
        </div>

        {/* Mobile nav toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setMobileMenuOpen(v => !v)}
            className="w-full flex items-center justify-between bg-white border border-gray-100 rounded-2xl px-5 py-3.5 text-sm font-semibold text-[#353A3F] shadow-sm"
          >
            <span>{activeLabel}</span>
            <ChevronRight className={`w-4 h-4 transition-transform ${mobileMenuOpen ? "rotate-90" : ""}`} />
          </button>
          {mobileMenuOpen && (
            <div className="mt-2 bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-lg">
              {NAV_ITEMS.map(({ tab, icon: Icon, label }) => (
                <button
                  key={tab}
                  onClick={() => handleNav(tab)}
                  className={`w-full flex items-center gap-3 px-5 py-3.5 text-sm font-medium transition-colors border-b border-gray-50 last:border-0 ${
                    tab === activeTab
                      ? "text-[#C75B12] bg-orange-50"
                      : tab === "logout"
                      ? "text-gray-400 hover:text-red-500 hover:bg-red-50"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Body */}
        <div className="flex gap-6 items-start">
          {/* Sidebar — desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              {NAV_ITEMS.map(({ tab, icon: Icon, label }) => {
                const isActive = tab === activeTab;
                const isLogout = tab === "logout";
                return (
                  <button
                    key={tab}
                    onClick={() => handleNav(tab)}
                    className={`w-full flex items-center gap-3 px-5 py-4 text-sm font-medium transition-colors border-b border-gray-50 last:border-0 relative ${
                      isActive
                        ? "text-[#C75B12] bg-orange-50"
                        : isLogout
                        ? "text-gray-400 hover:text-red-500 hover:bg-red-50"
                        : "text-gray-600 hover:text-[#353A3F] hover:bg-gray-50"
                    }`}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-2 bottom-2 w-[3px] bg-[#C75B12] rounded-r-full" />
                    )}
                    <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-[#C75B12]" : isLogout ? "text-gray-400" : "text-gray-400"}`} />
                    {label}
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Content */}
          <main className="flex-1 min-w-0">
            {activeTab === "overview"  && <OverviewView onFaqClick={onFaqClick} onContactClick={onContactClick} onTabChange={setActiveTab} />}
            {activeTab === "orders"    && <OrdersView />}
            {activeTab === "addresses" && <AddressesView />}
            {activeTab === "info"      && <InfoView />}
          </main>
        </div>
      </div>
    </div>
  );
}

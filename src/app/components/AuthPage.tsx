import { useState } from "react";
import { Eye, EyeOff, Lock, Package, MapPin, Tag, ShieldCheck, Truck, Headphones, ArrowRight } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

interface Props {
  defaultTab?: "login" | "register";
  onSuccess: () => void;
  onProClick?: () => void;
}

function BgPattern() {
  return (
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="authBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F5F5F6" />
          <stop offset="100%" stopColor="#F9F9FA" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#authBg)" />
      {/* subtle grid dots */}
      <pattern id="dots" width="32" height="32" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="1" fill="#353A3F" fillOpacity="0.06" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#dots)" />
      {/* fiber lines */}
      {[
        "M -40 120 Q 200 80 500 200 T 1100 160",
        "M -20 300 Q 300 260 600 340 T 1200 300",
        "M 100 450 Q 400 400 700 480 T 1300 440",
        "M 200 600 Q 500 550 800 630 T 1400 580",
        "M 900 50 Q 1100 150 1300 80",
      ].map((d, i) => (
        <path key={i} d={d} fill="none" stroke="#A0A3A7" strokeWidth="1" strokeOpacity={0.08 - i * 0.01} />
      ))}
      {/* glow nodes */}
      {[[180, 200], [520, 340], [840, 160], [1050, 460]].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="4" fill="#C75B12" fillOpacity="0.18" />
      ))}
    </svg>
  );
}

const BENEFITS = [
  { icon: Package,  label: "Suivez vos commandes" },
  { icon: MapPin,   label: "Retrouvez vos adresses" },
  { icon: Tag,      label: "Accédez aux tarifs dégressifs" },
];

const TRUST = [
  { icon: ShieldCheck, title: "Paiement 100% sécurisé",  sub: "CB, virement, paiement échelonné" },
  { icon: Truck,        title: "Livraison rapide",         sub: "Expédié sous 24/48h" },
  { icon: Headphones,   title: "Support client réactif",   sub: "Réponse sous 24h ouvrées" },
];

export function AuthPage({ defaultTab = "login", onSuccess, onProClick }: Props) {
  const [tab, setTab] = useState<"login" | "register">(defaultTab);
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login();
    onSuccess();
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    login();
    onSuccess();
  };

  const inputCls = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-[#353A3F]/50 focus:ring-2 focus:ring-[#353A3F]/8 transition-all bg-white";
  const labelCls = "block text-sm font-semibold text-[#353A3F] mb-1.5";

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      <BgPattern />

      {/* Page body */}
      <div className="relative z-10 flex-1 flex flex-col items-center px-4 py-12 lg:py-16">

        {/* Badge */}
        <span className="inline-flex items-center border border-[#353A3F]/25 text-[#353A3F] text-[11px] font-bold tracking-widest uppercase rounded-full px-5 py-2 mb-6 bg-white/70 backdrop-blur-sm">
          Mon compte
        </span>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold text-[#353A3F] text-center mb-2">
          Bienvenue chez FOLAN
        </h1>
        <p className="text-gray-500 text-sm sm:text-base text-center max-w-lg mb-10">
          Connectez-vous ou créez votre compte pour suivre vos commandes et accéder à vos tarifs dégressifs.
        </p>

        {/* Card */}
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl shadow-black/8 border border-gray-100 overflow-hidden">

          {/* Tabs */}
          <div className="flex border-b border-gray-100">
            {(["login", "register"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-4 text-sm font-semibold transition-all duration-200 border-b-2 -mb-px ${
                  tab === t
                    ? "text-[#353A3F] border-[#C75B12]"
                    : "text-gray-400 border-transparent hover:text-gray-600"
                }`}
              >
                {t === "login" ? "Se connecter" : "Créer un compte"}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-[1fr_300px]">
            {/* ── Left: form ── */}
            <div className="p-8">
              {tab === "login" ? (
                <form onSubmit={handleLogin} className="flex flex-col gap-5">
                  <div>
                    <label className={labelCls}>E-mail</label>
                    <input type="email" placeholder="votre@email.fr" className={inputCls} required />
                  </div>
                  <div>
                    <label className={labelCls}>Mot de passe</label>
                    <div className="relative">
                      <input
                        type={showPwd ? "text" : "password"}
                        placeholder="••••••••••••••"
                        className={`${inputCls} pr-12`}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPwd((v) => !v)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 accent-[#C75B12]" />
                      <span className="text-sm text-gray-600">Se souvenir de moi</span>
                    </label>
                    <button type="button" className="text-sm text-[#353A3F] hover:underline underline-offset-2 font-medium">
                      Mot de passe oublié ?
                    </button>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#C75B12] hover:bg-[#a34910] active:scale-[0.98] text-white font-bold text-sm py-3.5 rounded-xl transition-all duration-150 shadow-md shadow-[#C75B12]/20 mt-1"
                  >
                    Se connecter
                  </button>
                  <p className="text-center text-sm text-gray-500">
                    Pas encore de compte ?{" "}
                    <button type="button" onClick={() => setTab("register")} className="text-[#353A3F] font-semibold hover:underline underline-offset-2">
                      Créer un compte
                    </button>
                  </p>
                </form>
              ) : (
                <form onSubmit={handleRegister} className="flex flex-col gap-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Prénom</label>
                      <input type="text" placeholder="Jean" className={inputCls} required />
                    </div>
                    <div>
                      <label className={labelCls}>Nom</label>
                      <input type="text" placeholder="Dupont" className={inputCls} required />
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>E-mail</label>
                    <input type="email" placeholder="votre@email.fr" className={inputCls} required />
                  </div>
                  <div>
                    <label className={labelCls}>Mot de passe</label>
                    <div className="relative">
                      <input type={showPwd ? "text" : "password"} placeholder="8 caractères minimum" className={`${inputCls} pr-12`} required />
                      <button type="button" onClick={() => setShowPwd((v) => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Confirmer le mot de passe</label>
                    <div className="relative">
                      <input type={showPwd2 ? "text" : "password"} placeholder="••••••••" className={`${inputCls} pr-12`} required />
                      <button type="button" onClick={() => setShowPwd2((v) => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {showPwd2 ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <label className="flex items-start gap-2.5 cursor-pointer select-none">
                    <input type="checkbox" className="w-4 h-4 mt-0.5 rounded border-gray-300 accent-[#C75B12]" required />
                    <span className="text-sm text-gray-600 leading-snug">
                      J'accepte les{" "}
                      <button type="button" className="text-[#353A3F] font-medium hover:underline underline-offset-2">Conditions Générales de Vente</button>
                      {" "}et la{" "}
                      <button type="button" className="text-[#353A3F] font-medium hover:underline underline-offset-2">Politique de confidentialité</button>
                    </span>
                  </label>
                  <button
                    type="submit"
                    className="w-full bg-[#C75B12] hover:bg-[#a34910] active:scale-[0.98] text-white font-bold text-sm py-3.5 rounded-xl transition-all duration-150 shadow-md shadow-[#C75B12]/20"
                  >
                    Créer mon compte
                  </button>
                  <p className="text-center text-sm text-gray-500">
                    Déjà un compte ?{" "}
                    <button type="button" onClick={() => setTab("login")} className="text-[#353A3F] font-semibold hover:underline underline-offset-2">
                      Se connecter
                    </button>
                  </p>
                </form>
              )}
            </div>

            {/* ── Right: benefits panel ── */}
            <div className="hidden lg:flex flex-col justify-between bg-[#F4F4F5] border-l border-gray-100 p-8">
              <div>
                <h3 className="text-base font-bold text-[#353A3F] mb-5">Avec votre compte FOLAN</h3>
                <ul className="space-y-4">
                  {BENEFITS.map(({ icon: Icon, label }) => (
                    <li key={label} className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#353A3F]/8 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-[#353A3F]" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{label}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500 leading-relaxed mb-3">Pour les demandes importantes, sur mesure, votre compte pro … notre équipe commerciale reste à votre disposition.</p>
                <button
                  onClick={onProClick}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#C75B12] hover:underline underline-offset-2 transition-colors"
                >
                  Demander un devis
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Security note */}
        <div className="flex items-center gap-2 mt-6 text-sm text-gray-500">
          <Lock className="w-3.5 h-3.5 text-gray-400" />
          <span>Connexion sécurisée · Vos données restent protégées</span>
        </div>
      </div>

      {/* Trust bar */}
      <div className="relative z-10 border-t border-gray-100 bg-white">
        <div className="max-w-4xl mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
          {TRUST.map(({ icon: Icon, title, sub }) => (
            <div key={title} className="flex items-center gap-4 py-4 sm:py-0 sm:px-8 first:pl-0 last:pr-0">
              <div className="w-10 h-10 rounded-xl border border-gray-100 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-[#353A3F]" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{title}</p>
                <p className="text-xs text-gray-400">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Orange bottom bar */}
      <div className="relative z-10 h-2 bg-[#C75B12]" />
    </div>
  );
}

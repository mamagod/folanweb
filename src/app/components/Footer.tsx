import { useState } from "react";
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, ChevronDown } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import folanLogo from "@/imports/image-3.png";

interface FooterProps {
  onAboutClick?: () => void;
  onFaqClick?: () => void;
  onContactClick?: () => void;
  onPaymentClick?: () => void;
}

function AccordionSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-white/20 lg:border-none">
      {/* Mobile toggle — hidden on lg */}
      <button
        className="lg:hidden w-full flex items-center justify-between py-3.5 text-sm font-medium text-white"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {title}
        <ChevronDown className={`w-4 h-4 text-orange-100 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {/* Desktop heading */}
      <h4 className="hidden lg:block font-medium text-white text-sm lg:text-base mb-3 lg:mb-4">{title}</h4>
      {/* Content */}
      <div className={`overflow-hidden transition-all duration-300 lg:!max-h-none lg:!opacity-100 ${open ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0 lg:max-h-none lg:opacity-100"}`}>
        {children}
      </div>
    </div>
  );
}

export function Footer({ onAboutClick, onFaqClick, onContactClick, onPaymentClick }: FooterProps = {}) {
  return (
    <footer className="bg-gradient-to-br from-[#C75B12] to-[#A34910] text-white">
      <div className="max-w-7xl mx-auto px-4 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 lg:gap-12 mb-8 lg:mb-12">

          {/* Company Info — always visible */}
          <div className="space-y-4 text-center sm:text-left pb-6 lg:pb-0 border-b border-white/20 lg:border-none mb-2 lg:mb-0">
            <div className="flex justify-center sm:justify-start">
              <ImageWithFallback
                src={folanLogo}
                alt="FOLAN - Telecom Greentech Security"
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-xs lg:text-sm text-orange-50 leading-relaxed">
              Votre spécialiste en solutions de connectivité fibre optique professionnelle pour particuliers et professionnels.
            </p>
            {onAboutClick && (
              <button
                onClick={onAboutClick}
                className="text-xs lg:text-sm text-orange-50 hover:text-white hover:underline underline-offset-2 transition-colors"
              >
                Découvrir FOLAN →
              </button>
            )}
            <div className="flex gap-3 justify-center sm:justify-start">
              <a href="#" className="w-10 h-10 rounded-full bg-white/20 hover:bg-white hover:text-[#C75B12] flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/20 hover:bg-white hover:text-[#C75B12] flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/20 hover:bg-white hover:text-[#C75B12] flex items-center justify-center transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Nos Produits */}
          <AccordionSection title="Nos Produits">
            <ul className="space-y-2 text-xs lg:text-sm text-orange-50">
              <li><a href="#" className="hover:text-white transition-colors">Câbles Optiques</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Modules SFP</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cordons Patch</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Accessoires</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Kits d'Installation</a></li>
            </ul>
          </AccordionSection>

          {/* Service Client */}
          <AccordionSection title="Service Client">
            <ul className="space-y-2 text-xs lg:text-sm text-orange-50">
              <li>
                {onFaqClick ? (
                  <button onClick={onFaqClick} className="hover:text-white transition-colors">Centre d'aide &amp; FAQ</button>
                ) : (
                  <a href="#" className="hover:text-white transition-colors">Centre d'aide &amp; FAQ</a>
                )}
              </li>
              <li><a href="#" className="hover:text-white transition-colors">Suivre ma commande</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Livraison &amp; suivi</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Retours &amp; remboursements</a></li>
            </ul>
          </AccordionSection>

          {/* Nous Contacter */}
          <AccordionSection title="Nous Contacter">
            <ul className="space-y-3 text-xs lg:text-sm text-orange-50">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-white" />
                <span>Région Lyonnaise, France</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 flex-shrink-0 mt-0.5 text-white" />
                <div>
                  <div>+33 (0) 478 800 810</div>
                  <div className="text-orange-100/70 mt-0.5">Lun–Jeu : 9h–18h</div>
                  <div className="text-orange-100/70">Ven : 9h–17h</div>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 flex-shrink-0 mt-0.5 text-white" />
                <span>contact@folan.fr</span>
              </li>
            </ul>
            {onContactClick && (
              <button
                onClick={onContactClick}
                className="inline-block mt-3 text-xs lg:text-sm text-white font-medium hover:underline underline-offset-2 transition-colors"
              >
                Nous écrire →
              </button>
            )}
          </AccordionSection>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-white/20 pt-5 mb-5">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={onPaymentClick}
              className="flex items-center gap-1 text-xs text-orange-100 hover:text-white hover:underline underline-offset-2 transition-colors mr-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="11" width="18" height="11" rx="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              Paiement sécurisé
            </button>

            {/* CB — Cartes Bancaires official blue-green */}
            <svg height="24" viewBox="0 0 48 30" xmlns="http://www.w3.org/2000/svg" aria-label="Cartes Bancaires">
              <rect width="48" height="30" rx="4" fill="white"/>
              <rect x="3" y="3" width="42" height="24" rx="3" fill="#006BB6"/>
              <text x="24" y="20" textAnchor="middle" fill="white" fontSize="12" fontWeight="800" fontFamily="Arial,sans-serif" letterSpacing="0.5">CB</text>
              <rect x="3" y="20" width="42" height="7" rx="0" fill="#00A0A0" clipPath="url(#cbclip)"/>
              <clipPath id="cbclip"><rect x="3" y="3" width="42" height="24" rx="3"/></clipPath>
            </svg>

            {/* Visa — official navy wordmark on white */}
            <svg height="24" viewBox="0 0 54 30" xmlns="http://www.w3.org/2000/svg" aria-label="Visa">
              <rect width="54" height="30" rx="4" fill="white"/>
              <text x="27" y="21" textAnchor="middle" fill="#1A1F71" fontSize="17" fontWeight="800" fontFamily="Arial,sans-serif" fontStyle="italic" letterSpacing="1">VISA</text>
            </svg>

            {/* Mastercard — red + orange overlapping circles on white */}
            <svg height="24" viewBox="0 0 50 30" xmlns="http://www.w3.org/2000/svg" aria-label="Mastercard">
              <rect width="50" height="30" rx="4" fill="white"/>
              <circle cx="19" cy="15" r="9" fill="#EB001B"/>
              <circle cx="31" cy="15" r="9" fill="#F79E1B"/>
              <path d="M25 7.3 A9 9 0 0 1 25 22.7 A9 9 0 0 1 25 7.3Z" fill="#FF5F00"/>
            </svg>

            {/* PayPal — dark+light blue PP mark + wordmark on white */}
            <svg height="24" viewBox="0 0 74 30" xmlns="http://www.w3.org/2000/svg" aria-label="PayPal">
              <rect width="74" height="30" rx="4" fill="white"/>
              <text x="8"  y="21" fill="#009CDE" fontSize="17" fontWeight="900" fontFamily="Arial,sans-serif">P</text>
              <text x="5"  y="19" fill="#003087" fontSize="17" fontWeight="900" fontFamily="Arial,sans-serif">P</text>
              <text x="26" y="20" fill="#253B80" fontSize="10" fontWeight="700" fontFamily="Arial,sans-serif">Pay</text>
              <text x="44" y="20" fill="#179BD7" fontSize="10" fontWeight="700" fontFamily="Arial,sans-serif">Pal</text>
            </svg>
          </div>
        </div>

        {/* Legal Links */}
        <div className="border-t border-white/20 pt-6 lg:pt-8">
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-xs lg:text-sm text-orange-50 text-center">
              © 2026 Cable Box Fibre. Tous droits réservés.
            </p>
            <div className="flex flex-wrap gap-4 lg:gap-6 text-xs lg:text-sm text-orange-50 justify-center">
              <a href="#" className="hover:text-white transition-colors">Mentions Légales</a>
              <a href="#" className="hover:text-white transition-colors">CGV</a>
              <a href="#" className="hover:text-white transition-colors">Politique de Confidentialité</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

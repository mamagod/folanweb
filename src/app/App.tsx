import { useState } from "react";
import { AvisVerifiesWidget } from "./components/AvisVerifiesWidget";
import { TopAnnouncementBar } from "./components/TopAnnouncementBar";
import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { ProductCategoriesGrid } from "./components/ProductCategoriesGrid";
import { ValuePackSection } from "./components/ValuePackSection";
import { BestSellersSection } from "./components/BestSellersSection";
import { TrustPillars } from "./components/TrustPillars";
import { ProfessionalSolutionsSection } from "./components/ProfessionalSolutionsSection";
import { WhyFolanSection } from "./components/WhyFolanSection";
import { SolutionPickerSection } from "./components/SolutionPickerSection";
import { FeaturedPackSection } from "./components/FeaturedPackSection";
import { FAQSection } from "./components/FAQSection";
import { Footer } from "./components/Footer";
import { ProductDetailPage } from "./components/ProductDetailPage";
import { CategoryPage } from "./components/CategoryPage";
import { CartPage } from "./components/CartPage";
import { CheckoutPage } from "./components/CheckoutPage";
import { OrderConfirmationPage } from "./components/OrderConfirmationPage";
import { GuidesListPage } from "./components/GuidesListPage";
import { GuidePage } from "./components/GuidePage";
import { AboutPage } from "./components/AboutPage";
import { L1CategoryPage } from "./components/L1CategoryPage";
import { FAQPage } from "./components/FAQPage";
import { ProfessionalSpacePage } from "./components/ProfessionalSpacePage";
import { ContactPage } from "./components/ContactPage";
import { SearchResultsPage } from "./components/SearchResultsPage";
import { AuthPage } from "./components/AuthPage";
import { AccountPage } from "./components/AccountPage";
import { NotFoundPage } from "./components/NotFoundPage";
import { CasClientsPage } from "./components/CasClientsPage";
import { CasClientDetailPage } from "./components/CasClientDetailPage";
import { CataloguesPage } from "./components/CataloguesPage";
import { ResourcesPage } from "./components/ResourcesPage";
import { ISOPage } from "./components/ISOPage";
import { RSEPage } from "./components/RSEPage";
import { CartProvider, useCart } from "./contexts/CartContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

export type AppPage =
  | { name: "home" }
  | { name: "search"; query: string }
  | { name: "category"; slug: string }
  | { name: "l1-category"; slug: string }
  | { name: "product"; slug: string }
  | { name: "cart" }
  | { name: "checkout" }
  | { name: "order-confirmation" }
  | { name: "guides" }
  | { name: "guide"; slug: string }
  | { name: "about" }
  | { name: "faq" }
  | { name: "pro" }
  | { name: "contact" }
  | { name: "auth"; tab?: "login" | "register" }
  | { name: "account" }
  | { name: "cas-clients" }
  | { name: "cas-client"; slug: string }
  | { name: "catalogues" }
  | { name: "qualite-iso" }
  | { name: "rse" }
  | { name: "resources" }
  | { name: "not-found" };

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}

function AppContent() {
  const [page, setPage] = useState<AppPage>({ name: "home" });
  const cart = useCart();
  const { isLoggedIn } = useAuth();

  const navigate = (next: AppPage | string) => {
    if (typeof next === "string" && next.startsWith("guide:")) {
      setPage({ name: "guide", slug: next.replace("guide:", "") });
    } else if (typeof next === "string" && next.startsWith("cas-client:")) {
      setPage({ name: "cas-client", slug: next.replace("cas-client:", "") });
    } else if (typeof next === "string") {
      setPage({ name: next as any });
    } else {
      setPage(next);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goContact = () => navigate({ name: "contact" });

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <TopAnnouncementBar />
      <Navigation
        onLogoClick={() => navigate({ name: "home" })}
        onNavigate={(slug) => {
          if (slug === "ressources") {
            navigate({ name: "resources" });
          } else if (slug === "faq") {
            navigate({ name: "faq" });
          } else if (slug === "guides") {
            navigate({ name: "guides" });
          } else if (slug === "cas-clients") {
            navigate({ name: "cas-clients" });
          } else if (slug === "catalogues") {
            navigate({ name: "catalogues" });
          } else if (slug === "about") {
            navigate({ name: "about" });
          } else if (slug === "qualite-iso") {
            navigate({ name: "qualite-iso" });
          } else if (slug === "rse") {
            navigate({ name: "rse" });
          } else if (slug.startsWith("guide:")) {
            navigate(slug);
          } else if (slug.startsWith("l1:")) {
            navigate({ name: "l1-category", slug: slug.replace("l1:", "") });
          } else {
            navigate({ name: "category", slug });
          }
        }}
        onSearch={(q) => navigate({ name: "search", query: q })}
        onAuthClick={() => navigate({ name: isLoggedIn ? "account" : "auth" })}
        onCartClick={() => navigate({ name: "cart" })}
        cartCount={cart.getTotalItems()}
      />
      <main className="flex-1">
        {page.name === "home" && (
          <>
            <HeroSection onSearch={(q) => navigate({ name: "search", query: q })} />
            <SolutionPickerSection
              onCategoryClick={(slug) => navigate({ name: "category", slug })}
              onProClick={() => navigate({ name: "pro" })}
            />
            <FeaturedPackSection
              onPackClick={() => navigate({ name: "category", slug: "packs" })}
            />
            <ProductCategoriesGrid
              onCategoryClick={(slug) => navigate({ name: "category", slug })}
            />
            <ValuePackSection />
            <BestSellersSection
              onProductClick={(slug) => navigate({ name: "product", slug })}
              onCategoryClick={(slug) => navigate({ name: "category", slug })}
            />
            <ProfessionalSolutionsSection onContactClick={goContact} />
            <WhyFolanSection onContactClick={goContact} />
            <TrustPillars />
            <FAQSection onFaqClick={() => navigate({ name: "faq" })} />
          </>
        )}
        {page.name === "search" && (
          <SearchResultsPage
            query={page.query}
            onBack={() => navigate({ name: "home" })}
            onProductClick={(slug) => navigate({ name: "product", slug })}
            onSearch={(q) => navigate({ name: "search", query: q })}
          />
        )}
        {page.name === "category" && (
          <CategoryPage
            slug={page.slug}
            onBack={() => navigate({ name: "home" })}
            onProductClick={(slug) => navigate({ name: "product", slug })}
          />
        )}
        {page.name === "l1-category" && (
          <L1CategoryPage
            slug={page.slug}
            onBack={() => navigate({ name: "home" })}
            onCategoryClick={(slug) => {
              if (slug === "pro") navigate({ name: "pro" });
              else navigate({ name: "category", slug });
            }}
            onProductClick={(slug) => navigate({ name: "product", slug })}
            onContactClick={goContact}
          />
        )}
        {page.name === "product" && (
          <ProductDetailPage
            slug={page.slug}
            onBack={() => navigate({ name: "home" })}
            onProductClick={(slug) => navigate({ name: "product", slug })}
          />
        )}
        {page.name === "cart" && (
          <CartPage
            onBack={() => navigate({ name: "home" })}
            onCheckout={() => navigate({ name: "checkout" })}
          />
        )}
        {page.name === "checkout" && (
          <CheckoutPage
            onBack={() => navigate({ name: "cart" })}
            onComplete={() => navigate({ name: "order-confirmation" })}
          />
        )}
        {page.name === "order-confirmation" && (
          <OrderConfirmationPage
            onBackToHome={() => navigate({ name: "home" })}
            onContactClick={goContact}
          />
        )}
        {page.name === "guides" && (
          <GuidesListPage
            onBack={() => navigate({ name: "home" })}
            onGuideClick={(slug) => navigate({ name: "guide", slug })}
            onContactClick={goContact}
          />
        )}
        {page.name === "guide" && (
          <GuidePage
            slug={page.slug}
            onBack={() => navigate({ name: "guides" })}
            onContactClick={goContact}
          />
        )}
        {page.name === "about" && (
          <AboutPage
            onBack={() => navigate({ name: "home" })}
            onContactClick={goContact}
            onNavigate={(p) => navigate({ name: p as any })}
          />
        )}
        {page.name === "faq" && (
          <FAQPage
            onBack={() => navigate({ name: "home" })}
            onContactClick={goContact}
          />
        )}
        {page.name === "pro" && (
          <ProfessionalSpacePage
            onBack={() => navigate({ name: "home" })}
            onContactClick={goContact}
          />
        )}
        {page.name === "contact" && (
          <ContactPage onBack={() => navigate({ name: "home" })} />
        )}
        {page.name === "auth" && (
          <AuthPage
            defaultTab={page.tab ?? "login"}
            onSuccess={() => navigate({ name: "account" })}
            onProClick={() => navigate({ name: "pro" })}
          />
        )}
        {page.name === "account" && (
          <AccountPage
            onBack={() => navigate({ name: "home" })}
            onFaqClick={() => navigate({ name: "faq" })}
            onContactClick={goContact}
            onLogout={() => navigate({ name: "home" })}
          />
        )}
        {page.name === "catalogues" && (
          <CataloguesPage
            onBack={() => navigate({ name: "home" })}
            onContactClick={goContact}
          />
        )}
        {page.name === "cas-clients" && (
          <CasClientsPage
            onBack={() => navigate({ name: "home" })}
            onCaseClick={(slug) => navigate({ name: "cas-client", slug })}
            onContactClick={goContact}
          />
        )}
        {page.name === "cas-client" && (
          <CasClientDetailPage
            slug={page.slug}
            onBack={() => navigate({ name: "cas-clients" })}
            onCaseClick={(slug) => navigate({ name: "cas-client", slug })}
            onContactClick={goContact}
          />
        )}
        {page.name === "qualite-iso" && (
          <ISOPage
            onBack={() => navigate({ name: "about" })}
            onContactClick={goContact}
            onRSEClick={() => navigate({ name: "rse" })}
          />
        )}
        {page.name === "rse" && (
          <RSEPage
            onBack={() => navigate({ name: "about" })}
            onContactClick={goContact}
            onISOClick={() => navigate({ name: "qualite-iso" })}
          />
        )}
        {page.name === "resources" && (
          <ResourcesPage
            onBack={() => navigate({ name: "home" })}
            onNavigate={(slug) => navigate({ name: slug as any })}
            onContactClick={goContact}
          />
        )}
        {page.name === "not-found" && (
          <NotFoundPage
            onHomeClick={() => navigate({ name: "home" })}
            onBackClick={() => navigate({ name: "home" })}
            onSearchClick={() => navigate({ name: "search", query: "" })}
            onCatalogClick={() => navigate({ name: "category", slug: "all" })}
          />
        )}
      </main>
      <Footer
        onAboutClick={() => navigate({ name: "about" })}
        onFaqClick={() => navigate({ name: "faq" })}
        onContactClick={goContact}
        onPaymentClick={() => navigate({ name: "faq" })}
      />
      <AvisVerifiesWidget />
    </div>
  );
}

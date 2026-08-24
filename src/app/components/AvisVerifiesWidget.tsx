import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import avisWidget from "@/imports/image-5.png";

export function AvisVerifiesWidget() {
  return (
    <a
      href="https://www.avis-verifies.com"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 left-5 z-50 hover:-translate-y-1 transition-transform duration-200 drop-shadow-xl"
      aria-label="Avis Vérifiés - 4.8/5"
    >
      <ImageWithFallback
        src={avisWidget}
        alt="Avis Vérifiés 4.8/5 - 2 248 avis clients"
        className="w-24 h-24 object-contain block"
      />
    </a>
  );
}

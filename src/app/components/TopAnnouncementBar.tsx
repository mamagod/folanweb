import { Truck } from "lucide-react";

export function TopAnnouncementBar() {
  return (
    <div className="w-full bg-[#FFF4F0] border-b border-[#DC580A]/20">
      <div className="max-w-7xl mx-auto px-4 py-2 lg:py-2.5 flex items-center justify-center gap-1.5 lg:gap-2">
        <Truck className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-[#DC580A] flex-shrink-0" />
        <p className="text-xs lg:text-sm text-[#374151] text-center leading-tight lg:leading-normal">
          <span className="font-medium text-[#DC580A]">Livraison Standard OFFERTE</span> dès 50€ d'achat !
          <span className="hidden sm:inline"> Expédition sous 24h depuis la France.</span>
        </p>
      </div>
    </div>
  );
}

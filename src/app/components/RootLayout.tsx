import { Outlet } from "react-router";
import { TopAnnouncementBar } from "./TopAnnouncementBar";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";

export function RootLayout() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <TopAnnouncementBar />
      <Navigation />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

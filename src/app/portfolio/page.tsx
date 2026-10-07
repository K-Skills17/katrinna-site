import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import PageHero from "@/components/sections/PageHero";
import GalleryGrid from "@/components/sections/GalleryGrid";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Portfólio | Katrinna — Studio Afro Rosa's",
  description:
    "Veja os trabalhos de Katrinna: Box Braids, Boho Braids, Nagô, Twiste e muito mais. Técnica e arte em cada detalhe.",
};

export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label="Meus trabalhos"
          title="Cada trança é uma"
          titleAccent="história."
          subtitle="Box Braids, Boho Braids, Nagô, Twiste — técnica e arte em cada detalhe."
          bgImageIndex={1}
        />
        <GalleryGrid />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

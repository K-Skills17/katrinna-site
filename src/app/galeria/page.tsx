import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import PageHero from "@/components/sections/PageHero";
import GaleriaSections from "@/components/sections/GaleriaSections";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Galeria | Katrinna — Studio Afro Rosa's",
  description:
    "Galeria de trabalhos do Studio Afro Rosa's: Box Braids, Dreads Sintético, Entrelace, Gypsy Braids, Lemonade Braids, Nagô e Twiste Braids.",
};

export default function GaleriaPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label="Galeria de trabalhos"
          title="Arte em cada"
          titleAccent="detalhe."
          subtitle="Box Braids, Dreads Sintético, Entrelace, Gypsy Braids, Lemonade Braids, Nagô, Twiste — explore cada estilo."
          bgImageIndex={1}
        />
        <GaleriaSections />
        <FinalCTA variant="booking" />
      </main>
      <Footer />
    </>
  );
}

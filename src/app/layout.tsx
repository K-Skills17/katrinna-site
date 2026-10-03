import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Katrinna | Especialista em Tranças & Empreendedorismo",
  description:
    "Aprenda técnicas avançadas de tranças, gestão financeira e marketing digital com Katrinna — trancista há 7 anos e fundadora do Studio Afro Rosa's. Transforme seu talento em um negócio lucrativo.",
  openGraph: {
    title: "Katrinna | Especialista em Tranças & Empreendedorismo",
    description:
      "Transforme sua carreira: aprenda tranças, gerencie seu dinheiro e conquiste clientes online.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#111820] text-white">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}

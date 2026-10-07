"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { WA_ETM, driveImageUrl } from "@/lib/constants";

export default function Hero() {
  const bgId = "1nHjgC9fyid8CDm5_90iZVXfvXN7k05jB";

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background image — top-anchored so the head stays visible */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${driveImageUrl(bgId, 1920)})`,
          backgroundPosition: "50% 15%",
        }}
      />
      {/* Lightened overlay — shows image clearly, darkens only at edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(14,19,24,0.45) 0%, rgba(14,19,24,0.2) 35%, rgba(14,19,24,0.55) 70%, rgba(14,19,24,0.95) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-5 max-w-3xl mx-auto flex flex-col items-center gap-6 pt-24">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <span className="gold-line" />
          <span
            style={{ display: "block", width: "5px", height: "5px", background: "#c9a052", transform: "rotate(45deg)", flexShrink: 0 }}
          />
          <span className="text-[#c9a052] font-bold tracking-[0.32em] uppercase" style={{ fontSize: "0.65rem" }}>
            Studio Afro Rosa&apos;s
          </span>
          <span
            style={{ display: "block", width: "5px", height: "5px", background: "#c9a052", transform: "rotate(45deg)", flexShrink: 0 }}
          />
          <span className="gold-line" />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="font-serif font-black leading-[1.1] tracking-tight"
          style={{ fontSize: "clamp(2.8rem, 8vw, 5.5rem)" }}
        >
          Trance.{" "}
          <span className="text-gold-gradient italic">Empreenda.</span>
          <br />
          Domine.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-lg md:text-xl text-white/80 leading-relaxed max-w-xl"
        >
          Aprenda técnicas avançadas de tranças, gerencie seu dinheiro com
          clareza e conquiste clientes pelo Instagram — tudo com{" "}
          <span className="text-[#c9a052] font-semibold">quem já viveu isso na pele.</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <a
            href={WA_ETM}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold text-base px-8 py-4 rounded-full font-bold text-center flex items-center justify-center gap-2"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Quero Me Inscrever
          </a>
          <a
            href="#portfolio"
            className="border border-white/30 text-white text-base px-8 py-4 rounded-full font-semibold text-center hover:border-[#c9a052] hover:text-[#c9a052] transition-all"
          >
            Ver Meus Trabalhos
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-8 flex flex-col items-center gap-2 text-white/40 text-xs"
        >
          <span className="tracking-widest uppercase">Role para baixo</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}

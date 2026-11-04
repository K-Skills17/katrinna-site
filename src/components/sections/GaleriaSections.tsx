"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { GALLERY_PHOTOS, GALLERY_CATEGORIES, driveImageUrl } from "@/lib/constants";
import type { GalleryPhoto } from "@/lib/constants";

// ─── Data ────────────────────────────────────────────────────────────────────
const CATEGORIES = GALLERY_CATEGORIES.filter((c) => c !== "Todos");

const photosByCategory: { cat: string; photos: GalleryPhoto[] }[] = CATEGORIES.map((cat) => ({
  cat,
  photos: GALLERY_PHOTOS.filter((p) => p.cat === cat),
}));

const TOTAL_PHOTOS = GALLERY_PHOTOS.length;

const DESCRIPTIONS: Record<string, string> = {
  "Box Braids":       "Tranças clássicas com volume, proteção e versatilidade infinita",
  "Dreads Sintético": "Método orgânico, acabamento natural e resultado impecável",
  "Entrelace":        "Técnica refinada que celebra o cabelo natural com cuidado",
  "Gypsy Braids":     "Estilo boho solto, feminino e cheio de personalidade",
  "Lemonade Braids":  "Visual lateral icônico que mistura força e elegância",
  "Nagô":             "Raiz africana com traços modernos e acabamento preciso",
  "Twiste Braids":    "Twist elegante e versátil para todos os comprimentos",
};

// Cycling widths to create visual rhythm in the horizontal strip
const WIDTHS = [240, 190, 270, 210, 260, 195, 250];

function slugify(cat: string) {
  return cat.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

type LightboxState = { photos: GalleryPhoto[]; index: number } | null;

// ─── Image card variants ──────────────────────────────────────────────────────
const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

// ─── Category section ─────────────────────────────────────────────────────────
function CategorySection({
  cat,
  photos,
  index,
  onOpen,
  onVisible,
}: {
  cat: string;
  photos: GalleryPhoto[];
  index: number;
  onOpen: (photos: GalleryPhoto[], i: number) => void;
  onVisible: (cat: string) => void;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const numStr = String(index + 1).padStart(2, "0");

  // Scroll arrows
  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -520 : 520, behavior: "smooth" });
  };

  // Notify parent when this section enters viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) onVisible(cat); },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [cat, onVisible]);

  return (
    <div
      id={slugify(cat)}
      ref={sectionRef}
      className="relative mb-24 md:mb-32"
    >
      {/* ── Section header ── */}
      <div className="px-5 md:px-10 mb-8">
        {/* Large decorative number behind */}
        <div
          className="pointer-events-none select-none font-serif font-black leading-none absolute -top-6 left-4 md:left-8"
          style={{
            fontSize: "clamp(6rem, 14vw, 11rem)",
            color: "rgba(201,160,82,0.04)",
            lineHeight: 1,
          }}
        >
          {numStr}
        </div>

        <div className="relative z-10">
          {/* Number + category tag */}
          <div className="flex items-center gap-3 mb-3">
            <span
              className="font-mono text-xs font-bold tracking-widest"
              style={{ color: "rgba(201,160,82,0.7)" }}
            >
              {numStr}
            </span>
            <span
              className="h-px flex-1 max-w-[40px]"
              style={{ background: "rgba(201,160,82,0.3)" }}
            />
            <span
              className="text-[0.6rem] font-mono uppercase tracking-[0.25em]"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              estilo
            </span>
          </div>

          {/* Category name */}
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif font-black italic leading-none mb-3"
            style={{
              fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
              background: "linear-gradient(100deg, #ffffff 55%, rgba(255,255,255,0.3) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {cat}
          </motion.h2>

          {/* Description + photo count */}
          <div className="flex items-center gap-4 flex-wrap">
            <p
              className="text-sm"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              {DESCRIPTIONS[cat]}
            </p>
            <span
              className="flex-shrink-0 text-[0.6rem] font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full"
              style={{
                background: "rgba(201,160,82,0.08)",
                border: "1px solid rgba(201,160,82,0.2)",
                color: "rgba(201,160,82,0.7)",
              }}
            >
              {photos.length} foto{photos.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>

      {/* Gold divider line */}
      <div className="px-5 md:px-10 mb-6">
        <motion.div
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: 1,
            background: "linear-gradient(to right, rgba(201,160,82,0.5), rgba(201,160,82,0.1), transparent)",
          }}
        />
      </div>

      {/* ── Scroll strip ── */}
      <div className="relative">
        {/* Fade-out edge right */}
        <div
          className="absolute right-0 top-0 bottom-4 w-20 z-10 pointer-events-none hidden md:block"
          style={{ background: "linear-gradient(to right, transparent, rgba(10,14,20,0.9))" }}
        />

        <div
          ref={scrollRef}
          className="flex items-end gap-3 overflow-x-auto px-5 md:px-10 pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", scrollSnapType: "x mandatory" }}
        >
          {photos.map((photo, i) => {
            const w = WIDTHS[i % WIDTHS.length];
            return (
              <motion.div
                key={photo.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                onClick={() => onOpen(photos, i)}
                className="relative overflow-hidden rounded-2xl group flex-shrink-0 cursor-zoom-in h-[260px] md:h-[400px]"
                style={{
                  width: w,
                  scrollSnapAlign: "start",
                }}
                whileHover={{ y: -6, transition: { duration: 0.3, ease: "easeOut" } }}
              >
                <img
                  src={driveImageUrl(photo.id, 700)}
                  alt={`${cat} — Studio Afro Rosa's`}
                  loading="lazy"
                  draggable={false}
                  className="w-full h-full object-cover object-top"
                  style={{ transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.08)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")}
                />

                {/* Dark gradient always present (subtle) */}
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(10,14,18,0.6) 0%, transparent 50%)" }}
                />

                {/* Hover overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                  style={{ background: "rgba(10,14,18,0.3)" }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(201,160,82,0.15)", border: "1px solid rgba(201,160,82,0.4)" }}
                  >
                    <Maximize2 size={16} color="#c9a052" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Bottom label */}
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-1 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span
                    className="text-[0.55rem] font-mono font-bold tracking-widest uppercase"
                    style={{ color: "#c9a052" }}
                  >
                    {String(i + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
                  </span>
                </div>

                {/* Gold ring */}
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ boxShadow: "inset 0 0 0 1.5px rgba(201,160,82,0.45)" }}
                />
              </motion.div>
            );
          })}

          {/* Spacer so last image isn't cut off on right */}
          <div className="flex-shrink-0 w-5 md:w-10" />
        </div>

        {/* Arrow controls */}
        <div className="flex gap-2 justify-end px-5 md:px-10 mt-4">
          <button
            onClick={() => scroll("left")}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(201,160,82,0.4)";
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(201,160,82,0.06)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.08)";
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.04)";
            }}
          >
            <ChevronLeft size={14} color="rgba(255,255,255,0.5)" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(201,160,82,0.4)";
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(201,160,82,0.06)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.08)";
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.04)";
            }}
          >
            <ChevronRight size={14} color="rgba(255,255,255,0.5)" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function GaleriaSections() {
  const [activeSection, setActiveSection] = useState<string>(CATEGORIES[0]);
  const [lightbox, setLightbox] = useState<LightboxState>(null);

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const prevImg = useCallback(() => {
    setLightbox((prev) =>
      prev ? { ...prev, index: (prev.index - 1 + prev.photos.length) % prev.photos.length } : null
    );
  }, []);
  const nextImg = useCallback(() => {
    setLightbox((prev) =>
      prev ? { ...prev, index: (prev.index + 1) % prev.photos.length } : null
    );
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImg();
      if (e.key === "ArrowRight") nextImg();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, closeLightbox, prevImg, nextImg]);

  useEffect(() => {
    document.body.style.overflow = lightbox ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  const scrollToSection = (cat: string) => {
    document.getElementById(slugify(cat))?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="pt-6 pb-24">
      <style>{`
        section div::-webkit-scrollbar { display: none; }
      `}</style>

      {/* ── Stats bar ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-center gap-6 mb-14 px-5"
      >
        {[
          { value: TOTAL_PHOTOS, label: "fotos" },
          { value: CATEGORIES.length, label: "estilos" },
        ].map(({ value, label }) => (
          <div key={label} className="flex items-baseline gap-1.5">
            <span
              className="font-serif font-black text-2xl"
              style={{ color: "#c9a052" }}
            >
              {value}
            </span>
            <span
              className="text-xs font-mono uppercase tracking-widest"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              {label}
            </span>
          </div>
        ))}
        <div style={{ width: 1, height: 24, background: "rgba(255,255,255,0.1)" }} />
        <span
          className="text-xs font-mono uppercase tracking-widest hidden sm:block"
          style={{ color: "rgba(255,255,255,0.2)" }}
        >
          Studio Afro Rosa&apos;s
        </span>
      </motion.div>

      {/* ── Mobile pill nav — must live OUTSIDE the flex container ── */}
      <div
        className="lg:hidden overflow-x-auto px-5 pb-4 mb-6"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="flex gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = cat === activeSection;
            return (
              <button
                key={cat}
                onClick={() => scrollToSection(cat)}
                className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all duration-200"
                style={{
                  background: isActive ? "rgba(201,160,82,0.15)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${isActive ? "rgba(201,160,82,0.5)" : "rgba(255,255,255,0.08)"}`,
                  color: isActive ? "#c9a052" : "rgba(255,255,255,0.4)",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex gap-0">
        {/* ── Sticky sidebar (desktop) ── */}
        <aside className="hidden lg:block w-52 flex-shrink-0 relative">
          <div className="sticky top-24 pl-10 pr-4 flex flex-col gap-1">
            <p
              className="text-[0.55rem] font-mono uppercase tracking-[0.3em] mb-4"
              style={{ color: "rgba(255,255,255,0.18)" }}
            >
              Estilos
            </p>
            {CATEGORIES.map((cat, i) => {
              const isActive = cat === activeSection;
              return (
                <button
                  key={cat}
                  onClick={() => scrollToSection(cat)}
                  className="flex items-center gap-2.5 py-1.5 text-left transition-all duration-300 group"
                >
                  <span
                    className="font-mono text-[0.55rem] font-bold transition-colors duration-300"
                    style={{ color: isActive ? "#c9a052" : "rgba(255,255,255,0.2)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {/* Active indicator bar */}
                  <span
                    className="h-px transition-all duration-300"
                    style={{
                      width: isActive ? 16 : 8,
                      background: isActive ? "#c9a052" : "rgba(255,255,255,0.15)",
                    }}
                  />
                  <span
                    className="text-xs font-medium transition-colors duration-300 leading-tight"
                    style={{ color: isActive ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)" }}
                  >
                    {cat}
                  </span>
                </button>
              );
            })}

            {/* Bottom divider + total */}
            <div
              className="mt-6 pt-5"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              <p
                className="text-[0.55rem] font-mono uppercase tracking-widest leading-relaxed"
                style={{ color: "rgba(255,255,255,0.18)" }}
              >
                {TOTAL_PHOTOS} fotos
                <br />
                {CATEGORIES.length} estilos
              </p>
            </div>
          </div>
        </aside>

        {/* ── Sections ── */}
        <div className="flex-1 min-w-0">
          {photosByCategory.map(({ cat, photos }, i) => (
            <CategorySection
              key={cat}
              cat={cat}
              photos={photos}
              index={i}
              onOpen={(photos, idx) => setLightbox({ photos, index: idx })}
              onVisible={setActiveSection}
            />
          ))}
        </div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 py-10"
            style={{ background: "rgba(5,8,12,0.97)", backdropFilter: "blur(12px)" }}
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-2xl w-full flex flex-col gap-5"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Category label */}
              <div className="flex items-center justify-between">
                <span
                  className="text-[0.6rem] font-mono font-bold tracking-[0.28em] uppercase"
                  style={{ color: "rgba(201,160,82,0.7)" }}
                >
                  {lightbox.photos[lightbox.index].cat}
                </span>
                <button
                  onClick={closeLightbox}
                  className="flex items-center gap-1.5 text-xs transition-colors"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.8)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.3)")}
                >
                  Fechar <X size={14} />
                </button>
              </div>

              {/* Image */}
              <motion.img
                key={lightbox.photos[lightbox.index].id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                src={driveImageUrl(lightbox.photos[lightbox.index].id, 1400)}
                alt={`${lightbox.photos[lightbox.index].cat} — Studio Afro Rosa's`}
                className="w-full rounded-2xl"
                style={{
                  maxHeight: "74vh",
                  objectFit: "contain",
                  boxShadow: "0 40px 100px rgba(0,0,0,0.75)",
                }}
              />

              {/* Nav */}
              <div className="flex items-center justify-between">
                <button
                  onClick={prevImg}
                  className="flex items-center gap-1.5 text-xs font-medium tracking-wider uppercase transition-colors"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#c9a052")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.3)")}
                >
                  <ChevronLeft size={16} /> Anterior
                </button>

                <span
                  className="font-mono text-[0.6rem] font-bold tracking-[0.2em]"
                  style={{ color: "rgba(255,255,255,0.2)" }}
                >
                  {String(lightbox.index + 1).padStart(2, "0")} / {String(lightbox.photos.length).padStart(2, "0")}
                </span>

                <button
                  onClick={nextImg}
                  className="flex items-center gap-1.5 text-xs font-medium tracking-wider uppercase transition-colors"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#c9a052")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.3)")}
                >
                  Próximo <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

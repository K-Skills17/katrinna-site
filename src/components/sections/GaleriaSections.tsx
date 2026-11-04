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

const IMG_W = 240;
const IMG_GAP = 12;

// ─── Lightbox state ──────────────────────────────────────────────────────────
type LightboxState = { photos: GalleryPhoto[]; index: number } | null;

// ─── Single horizontal scroll row ────────────────────────────────────────────
function CategoryRow({
  cat,
  photos,
  onOpen,
}: {
  cat: string;
  photos: GalleryPhoto[];
  onOpen: (photos: GalleryPhoto[], index: number) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -(IMG_W + IMG_GAP) * 2 : (IMG_W + IMG_GAP) * 2, behavior: "smooth" });
  };

  return (
    <div className="mb-20">
      {/* Section header */}
      <div className="px-5 md:px-10 mb-6 flex items-end justify-between">
        <div>
          <span
            className="block text-xs font-mono tracking-widest uppercase mb-2"
            style={{ color: "rgba(201,160,82,0.6)" }}
          >
            {String(CATEGORIES.indexOf(cat) + 1).padStart(2, "0")} · estilo
          </span>
          <h2
            className="font-serif font-black text-3xl md:text-4xl"
            style={{
              background: "linear-gradient(90deg, #fff 60%, rgba(255,255,255,0.4) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {cat}
          </h2>
        </div>
        {/* Scroll arrows */}
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(201,160,82,0.5)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.1)")}
          >
            <ChevronLeft size={16} color="rgba(255,255,255,0.6)" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(201,160,82,0.5)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.1)")}
          >
            <ChevronRight size={16} color="rgba(255,255,255,0.6)" />
          </button>
        </div>
      </div>

      {/* Gold divider */}
      <div
        className="mx-5 md:mx-10 mb-6"
        style={{ height: 1, background: "linear-gradient(to right, rgba(201,160,82,0.4), transparent)" }}
      />

      {/* Scroll strip */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto px-5 md:px-10 pb-4"
        style={{
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {photos.map((photo, i) => (
          <div
            key={photo.id}
            onClick={() => onOpen(photos, i)}
            className="relative overflow-hidden rounded-2xl group flex-shrink-0"
            style={{
              width: IMG_W,
              aspectRatio: "3 / 4",
              scrollSnapAlign: "start",
              cursor: "zoom-in",
            }}
          >
            <img
              src={driveImageUrl(photo.id, 700)}
              alt={`${cat} — Studio Afro Rosa's`}
              loading="lazy"
              draggable={false}
              className="w-full h-full object-cover object-top transition-transform duration-700"
              style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.07)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")}
            />
            {/* Hover overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
              style={{ background: "rgba(10,14,18,0.35)" }}
            >
              <Maximize2 size={22} color="white" strokeWidth={1.5} />
            </div>
            {/* Bottom label */}
            <div
              className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "linear-gradient(to top, rgba(10,14,18,0.85) 0%, transparent 100%)" }}
            >
              <span
                className="text-xs font-bold tracking-widest uppercase"
                style={{ color: "#c9a052" }}
              >
                {String(i + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
              </span>
            </div>
            {/* Gold ring */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ boxShadow: "inset 0 0 0 1.5px rgba(201,160,82,0.5)" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function GaleriaSections() {
  const [lightbox, setLightbox] = useState<LightboxState>(null);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const prevImg = useCallback(() => {
    setLightbox((prev) => {
      if (!prev) return null;
      return { ...prev, index: (prev.index - 1 + prev.photos.length) % prev.photos.length };
    });
  }, []);

  const nextImg = useCallback(() => {
    setLightbox((prev) => {
      if (!prev) return null;
      return { ...prev, index: (prev.index + 1) % prev.photos.length };
    });
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

  return (
    <section className="py-14">
      {/* Hide scrollbar globally for this section */}
      <style>{`
        .gallery-row::-webkit-scrollbar { display: none; }
      `}</style>

      {photosByCategory.map(({ cat, photos }) => (
        <motion.div
          key={cat}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <CategoryRow
            cat={cat}
            photos={photos}
            onOpen={(photos, index) => setLightbox({ photos, index })}
          />
        </motion.div>
      ))}

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 py-12"
            style={{ background: "rgba(5,8,12,0.97)" }}
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
              {/* Close */}
              <button
                onClick={closeLightbox}
                className="absolute -top-10 right-0 flex items-center gap-2 text-sm transition-colors"
                style={{ color: "rgba(255,255,255,0.35)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.9)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.35)")}
              >
                Fechar <X size={15} />
              </button>

              {/* Image */}
              <motion.img
                key={`${lightbox.photos[lightbox.index].id}`}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                src={driveImageUrl(lightbox.photos[lightbox.index].id, 1400)}
                alt={`${lightbox.photos[lightbox.index].cat} — Studio Afro Rosa's`}
                className="w-full rounded-2xl"
                style={{
                  maxHeight: "72vh",
                  objectFit: "contain",
                  boxShadow: "0 32px 80px rgba(0,0,0,0.7)",
                }}
              />

              {/* Nav */}
              <div className="flex items-center justify-between px-1">
                <button
                  onClick={prevImg}
                  className="flex items-center gap-1.5 text-xs font-medium tracking-wider uppercase transition-colors"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#c9a052")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.3)")}
                >
                  <ChevronLeft size={18} /> Anterior
                </button>

                <div className="text-center">
                  <span
                    className="block font-mono font-bold"
                    style={{ color: "#c9a052", fontSize: "0.58rem", letterSpacing: "0.24em" }}
                  >
                    {String(lightbox.index + 1).padStart(2, "0")} / {String(lightbox.photos.length).padStart(2, "00")}
                  </span>
                  <span className="text-white/45 text-sm font-medium tracking-wide">
                    {lightbox.photos[lightbox.index].cat}
                  </span>
                </div>

                <button
                  onClick={nextImg}
                  className="flex items-center gap-1.5 text-xs font-medium tracking-wider uppercase transition-colors"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#c9a052")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.3)")}
                >
                  Próximo <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

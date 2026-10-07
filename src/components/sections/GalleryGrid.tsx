"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { DRIVE_IMAGE_IDS, driveImageUrl } from "@/lib/constants";

type Category = "Todos" | "Box Braids" | "Boho Braids" | "Nagô" | "Twiste";

const GALLERY: { id: string; cat: Category; tall: boolean }[] = [
  { id: DRIVE_IMAGE_IDS[1],  cat: "Box Braids",  tall: true  },
  { id: DRIVE_IMAGE_IDS[2],  cat: "Box Braids",  tall: false },
  { id: DRIVE_IMAGE_IDS[4],  cat: "Boho Braids", tall: true  },
  { id: DRIVE_IMAGE_IDS[6],  cat: "Boho Braids", tall: false },
  { id: DRIVE_IMAGE_IDS[7],  cat: "Nagô",        tall: true  },
  { id: DRIVE_IMAGE_IDS[8],  cat: "Nagô",        tall: false },
  { id: DRIVE_IMAGE_IDS[9],  cat: "Box Braids",  tall: false },
  { id: DRIVE_IMAGE_IDS[10], cat: "Box Braids",  tall: true  },
  { id: DRIVE_IMAGE_IDS[11], cat: "Boho Braids", tall: true  },
  { id: DRIVE_IMAGE_IDS[12], cat: "Boho Braids", tall: false },
  { id: DRIVE_IMAGE_IDS[13], cat: "Boho Braids", tall: true  },
  { id: DRIVE_IMAGE_IDS[14], cat: "Nagô",        tall: false },
  { id: DRIVE_IMAGE_IDS[15], cat: "Twiste",      tall: true  },
  { id: DRIVE_IMAGE_IDS[16], cat: "Twiste",      tall: false },
  { id: DRIVE_IMAGE_IDS[17], cat: "Nagô",        tall: true  },
  { id: DRIVE_IMAGE_IDS[18], cat: "Twiste",      tall: false },
  { id: DRIVE_IMAGE_IDS[19], cat: "Nagô",        tall: true  },
  { id: DRIVE_IMAGE_IDS[20], cat: "Box Braids",  tall: false },
  { id: DRIVE_IMAGE_IDS[21], cat: "Boho Braids", tall: true  },
  { id: DRIVE_IMAGE_IDS[22], cat: "Box Braids",  tall: true  },
  { id: DRIVE_IMAGE_IDS[23], cat: "Twiste",      tall: false },
];

const TABS: Category[] = ["Todos", "Box Braids", "Boho Braids", "Nagô", "Twiste"];

export default function GalleryGrid() {
  const [active, setActive] = useState<Category>("Todos");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered =
    active === "Todos" ? GALLERY : GALLERY.filter((g) => g.cat === active);

  // Split into 3 columns for masonry
  const cols: (typeof filtered)[] = [[], [], []];
  filtered.forEach((item, i) => cols[i % 3].push(item));

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const prevImage = useCallback(
    () => setLightbox((p) => (p === null ? null : (p - 1 + filtered.length) % filtered.length)),
    [filtered.length]
  );
  const nextImage = useCallback(
    () => setLightbox((p) => (p === null ? null : (p + 1) % filtered.length)),
    [filtered.length]
  );

  // Keyboard navigation
  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, closeLightbox, prevImage, nextImage]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  return (
    <section className="py-12 px-5">
      <div className="max-w-6xl mx-auto">

        {/* ── Filter tabs ── */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {TABS.map((tab) => {
            const count = tab === "Todos" ? GALLERY.length : GALLERY.filter((g) => g.cat === tab).length;
            const isActive = active === tab;
            return (
              <button
                key={tab}
                onClick={() => { setActive(tab); setLightbox(null); }}
                className="flex items-center gap-2 rounded-full font-bold transition-all duration-200"
                style={{
                  padding: "8px 20px",
                  background: isActive
                    ? "linear-gradient(135deg, #e8c87a, #c9a052, #9a7a38)"
                    : "rgba(255,255,255,0.04)",
                  color: isActive ? "#0e1318" : "rgba(255,255,255,0.55)",
                  border: isActive ? "none" : "1px solid rgba(255,255,255,0.1)",
                  fontSize: "0.68rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                {tab}
                <span
                  className="rounded-full px-1.5 py-0.5"
                  style={{
                    fontSize: "0.6rem",
                    background: isActive ? "rgba(14,19,24,0.2)" : "rgba(255,255,255,0.08)",
                    color: isActive ? "#0e1318" : "rgba(255,255,255,0.4)",
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Masonry grid ── */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.38 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-2.5 md:gap-3"
          style={{ alignItems: "start" }}
        >
          {cols.map((col, ci) => (
            <div key={ci} className="flex flex-col gap-2.5 md:gap-3">
              {col.map((item) => {
                const globalIdx = filtered.indexOf(item);
                return (
                  <div
                    key={item.id}
                    className="relative overflow-hidden rounded-xl cursor-pointer group"
                    onClick={() => setLightbox(globalIdx)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && setLightbox(globalIdx)}
                    aria-label={`Ver ${item.cat} — foto ${globalIdx + 1}`}
                  >
                    <img
                      src={driveImageUrl(item.id, 800)}
                      alt={`Trança ${item.cat} por Katrinna`}
                      className="w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      style={{ aspectRatio: item.tall ? "3/4" : "4/3" }}
                      loading="lazy"
                    />

                    {/* Hover overlay */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(14,19,24,0.88) 0%, transparent 55%)",
                      }}
                    >
                      <span
                        style={{
                          color: "#c9a052",
                          fontSize: "0.55rem",
                          fontWeight: 700,
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          display: "block",
                        }}
                      >
                        {String(globalIdx + 1).padStart(2, "0")}
                      </span>
                      <span className="text-white text-xs font-bold tracking-wide mt-0.5">
                        {item.cat}
                      </span>
                    </div>

                    {/* Gold border on hover */}
                    <div
                      className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      style={{ boxShadow: "inset 0 0 0 1.5px rgba(201,160,82,0.45)" }}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </motion.div>

        {/* Count */}
        <div className="mt-10 text-center">
          <p
            className="text-white/25"
            style={{ fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase" }}
          >
            {filtered.length} trabalho{filtered.length !== 1 ? "s" : ""}
            {active !== "Todos" ? ` · ${active}` : " · todos os estilos"}
          </p>
        </div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 py-10"
            style={{ background: "rgba(8,12,16,0.97)" }}
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-2xl w-full flex flex-col gap-5"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute -top-9 right-0 text-white/50 hover:text-white transition-colors flex items-center gap-1.5 text-sm"
                aria-label="Fechar"
              >
                Fechar <X size={15} />
              </button>

              {/* Image */}
              <img
                src={driveImageUrl(filtered[lightbox].id, 1400)}
                alt={`${filtered[lightbox].cat} por Katrinna`}
                className="w-full rounded-2xl"
                style={{ maxHeight: "74vh", objectFit: "contain" }}
              />

              {/* Navigation bar */}
              <div className="flex items-center justify-between px-1">
                <button
                  onClick={prevImage}
                  className="flex items-center gap-1 text-white/45 hover:text-[#c9a052] transition-colors text-xs font-medium tracking-wider uppercase"
                  aria-label="Anterior"
                >
                  <ChevronLeft size={18} /> Anterior
                </button>

                <div className="text-center">
                  <span
                    style={{
                      color: "#c9a052",
                      fontSize: "0.58rem",
                      fontWeight: 700,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      display: "block",
                    }}
                  >
                    {String(lightbox + 1).padStart(2, "0")} / {String(filtered.length).padStart(2, "0")}
                  </span>
                  <span className="text-white/55 text-sm font-medium">
                    {filtered[lightbox].cat}
                  </span>
                </div>

                <button
                  onClick={nextImage}
                  className="flex items-center gap-1 text-white/45 hover:text-[#c9a052] transition-colors text-xs font-medium tracking-wider uppercase"
                  aria-label="Próximo"
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

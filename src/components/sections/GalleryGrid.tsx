"use client";
import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { GALLERY_PHOTOS, GALLERY_CATEGORIES, driveImageUrl } from "@/lib/constants";

// ─── Marquee constants ────────────────────────────────────────────────────────
const PHOTO_W = 210;
const PHOTO_GAP = 10;

// Strip 2 starts halfway through so both rows show different photos
const STRIP2 = [...GALLERY_PHOTOS.slice(15), ...GALLERY_PHOTOS.slice(0, 15)];

// ─── Photo card ───────────────────────────────────────────────────────────────
function PhotoCard({
  photo,
  globalIdx,
  onClick,
  fixed = true,
}: {
  photo: { id: string; cat: string };
  globalIdx: number;
  onClick: () => void;
  fixed?: boolean;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-xl group"
      style={
        fixed
          ? { width: PHOTO_W, aspectRatio: "3 / 4", marginRight: PHOTO_GAP, flexShrink: 0, cursor: "zoom-in" }
          : { aspectRatio: "3 / 4", cursor: "zoom-in" }
      }
      onClick={onClick}
    >
      <img
        src={driveImageUrl(photo.id, 700)}
        alt={`${photo.cat} — Studio Afro Rosa's`}
        draggable={false}
        loading="lazy"
        className="w-full h-full object-cover object-top"
        style={{ transition: "transform 0.65s cubic-bezier(0.22,1,0.36,1)" }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.07)")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")}
      />

      {/* Overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
        style={{ background: "rgba(10,14,18,0.4)" }}
      >
        <Maximize2 size={24} color="white" strokeWidth={1.5} className="drop-shadow-lg" />
      </div>

      {/* Bottom label */}
      <div
        className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-between"
        style={{ background: "linear-gradient(to top, rgba(10,14,18,0.88) 0%, transparent 100%)" }}
      >
        <span className="text-white/90 text-xs font-semibold tracking-wide">{photo.cat}</span>
        <span style={{ color: "#c9a052", fontSize: "0.52rem", fontWeight: 700, letterSpacing: "0.16em" }}>
          {String(globalIdx + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Gold ring */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ boxShadow: "inset 0 0 0 1.5px rgba(201,160,82,0.55)" }}
      />
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState<string>("Todos");
  const [paused, setPaused] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const visiblePhotos =
    activeCategory === "Todos"
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((p) => p.cat === activeCategory);

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const prevImg = useCallback(
    () => setLightbox((p) => (p === null ? null : (p - 1 + visiblePhotos.length) % visiblePhotos.length)),
    [visiblePhotos.length]
  );
  const nextImg = useCallback(
    () => setLightbox((p) => (p === null ? null : (p + 1) % visiblePhotos.length)),
    [visiblePhotos.length]
  );

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImg();
      if (e.key === "ArrowRight") nextImg();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, closeLightbox, prevImg, nextImg]);

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  // Reset lightbox when switching categories
  useEffect(() => { setLightbox(null); }, [activeCategory]);

  return (
    <section className="py-14">

      {/* ── Category filter pills ── */}
      <div className="flex flex-wrap justify-center gap-2 mb-10 px-5">
        {GALLERY_CATEGORIES.map((cat) => {
          const isActive = cat === activeCategory;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200"
              style={{
                background: isActive
                  ? "linear-gradient(135deg, #e8c87a, #c9a052)"
                  : "rgba(255,255,255,0.05)",
                color: isActive ? "#0e1318" : "rgba(255,255,255,0.45)",
                border: isActive ? "1px solid transparent" : "1px solid rgba(255,255,255,0.1)",
                boxShadow: isActive ? "0 4px 20px rgba(201,160,82,0.3)" : "none",
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* ── Marquee (Todos) or Grid (filtered) ── */}
      <AnimatePresence mode="wait">
        {activeCategory === "Todos" ? (
          <motion.div
            key="marquee"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <p
              className="text-center mb-6"
              style={{
                color: "rgba(255,255,255,0.18)",
                fontSize: "0.6rem",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
              }}
            >
              Passe o mouse para pausar · Clique para ampliar
            </p>

            <div
              className="overflow-hidden"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {/* Strip 1 — slides LEFT */}
              <div
                className="flex"
                style={{
                  animation: "marquee-left 42s linear infinite",
                  animationPlayState: paused ? "paused" : "running",
                  willChange: "transform",
                }}
              >
                {[...GALLERY_PHOTOS, ...GALLERY_PHOTOS].map((photo, i) => (
                  <PhotoCard
                    key={`s1-${i}`}
                    photo={photo}
                    globalIdx={i % GALLERY_PHOTOS.length}
                    onClick={() => setLightbox(i % GALLERY_PHOTOS.length)}
                    fixed
                  />
                ))}
              </div>

              <div className="h-3" />

              {/* Strip 2 — slides RIGHT */}
              <div
                className="flex"
                style={{
                  animation: "marquee-right 36s linear infinite",
                  animationPlayState: paused ? "paused" : "running",
                  willChange: "transform",
                }}
              >
                {[...STRIP2, ...STRIP2].map((photo, i) => {
                  const originalIdx = GALLERY_PHOTOS.findIndex((p) => p.id === photo.id);
                  return (
                    <PhotoCard
                      key={`s2-${i}`}
                      photo={photo}
                      globalIdx={originalIdx}
                      onClick={() => setLightbox(originalIdx)}
                      fixed
                    />
                  );
                })}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 px-5 max-w-6xl mx-auto"
          >
            {visiblePhotos.map((photo, i) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                globalIdx={i}
                onClick={() => setLightbox(i)}
                fixed={false}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer count */}
      <div className="mt-12 text-center">
        <p
          style={{
            color: "rgba(255,255,255,0.15)",
            fontSize: "0.6rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
          }}
        >
          {visiblePhotos.length} trabalhos
          {activeCategory !== "Todos" ? ` · ${activeCategory}` : " · Studio Afro Rosa's"}
        </p>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox !== null && (
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
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
              >
                Fechar <X size={15} />
              </button>

              {/* Full-size photo */}
              <motion.img
                key={lightbox}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                src={driveImageUrl(visiblePhotos[lightbox].id, 1400)}
                alt={`${visiblePhotos[lightbox].cat} — Studio Afro Rosa's`}
                className="w-full rounded-2xl"
                style={{
                  maxHeight: "72vh",
                  objectFit: "contain",
                  boxShadow: "0 32px 80px rgba(0,0,0,0.7)",
                }}
              />

              {/* Navigation */}
              <div className="flex items-center justify-between px-1">
                <button
                  onClick={prevImg}
                  className="flex items-center gap-1.5 text-xs font-medium tracking-wider uppercase transition-colors"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#c9a052")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
                >
                  <ChevronLeft size={18} /> Anterior
                </button>

                <div className="text-center">
                  <span
                    style={{
                      color: "#c9a052",
                      fontSize: "0.58rem",
                      fontWeight: 700,
                      letterSpacing: "0.24em",
                      textTransform: "uppercase",
                      display: "block",
                    }}
                  >
                    {String(lightbox + 1).padStart(2, "00")} / {String(visiblePhotos.length).padStart(2, "00")}
                  </span>
                  <span className="text-white/45 text-sm font-medium tracking-wide">
                    {visiblePhotos[lightbox].cat}
                  </span>
                </div>

                <button
                  onClick={nextImg}
                  className="flex items-center gap-1.5 text-xs font-medium tracking-wider uppercase transition-colors"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#c9a052")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
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

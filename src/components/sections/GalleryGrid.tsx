"use client";
import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { DRIVE_IMAGE_IDS, driveImageUrl } from "@/lib/constants";

// ─── Photo data ──────────────────────────────────────────────────────────────
type Photo = { id: string; cat: string };

const ALL_PHOTOS: Photo[] = [
  { id: DRIVE_IMAGE_IDS[1],  cat: "Box Braids"  },
  { id: DRIVE_IMAGE_IDS[2],  cat: "Box Braids"  },
  { id: DRIVE_IMAGE_IDS[4],  cat: "Boho Braids" },
  { id: DRIVE_IMAGE_IDS[6],  cat: "Boho Braids" },
  { id: DRIVE_IMAGE_IDS[7],  cat: "Nagô"        },
  { id: DRIVE_IMAGE_IDS[8],  cat: "Nagô"        },
  { id: DRIVE_IMAGE_IDS[9],  cat: "Box Braids"  },
  { id: DRIVE_IMAGE_IDS[10], cat: "Box Braids"  },
  { id: DRIVE_IMAGE_IDS[11], cat: "Boho Braids" },
  { id: DRIVE_IMAGE_IDS[12], cat: "Boho Braids" },
  { id: DRIVE_IMAGE_IDS[13], cat: "Boho Braids" },
  { id: DRIVE_IMAGE_IDS[14], cat: "Nagô"        },
  { id: DRIVE_IMAGE_IDS[15], cat: "Twiste"      },
  { id: DRIVE_IMAGE_IDS[16], cat: "Twiste"      },
  { id: DRIVE_IMAGE_IDS[17], cat: "Nagô"        },
  { id: DRIVE_IMAGE_IDS[18], cat: "Twiste"      },
  { id: DRIVE_IMAGE_IDS[19], cat: "Nagô"        },
  { id: DRIVE_IMAGE_IDS[20], cat: "Box Braids"  },
  { id: DRIVE_IMAGE_IDS[21], cat: "Boho Braids" },
  { id: DRIVE_IMAGE_IDS[22], cat: "Box Braids"  },
  { id: DRIVE_IMAGE_IDS[23], cat: "Twiste"      },
];

// Strip 2 starts 10 photos in — so both strips show different photos simultaneously
const STRIP2: Photo[] = [...ALL_PHOTOS.slice(10), ...ALL_PHOTOS.slice(0, 10)];

// ─── Photo card ──────────────────────────────────────────────────────────────
// Using margin-right (not gap) so -50% translateX = exactly one copy width
const PHOTO_W = 210;  // px
const PHOTO_GAP = 10; // px — margin-right on each item (incl. last) → seamless math

function PhotoCard({
  photo,
  globalIdx,
  onClick,
}: {
  photo: Photo;
  globalIdx: number;
  onClick: () => void;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-xl group flex-shrink-0"
      style={{
        width: PHOTO_W,
        aspectRatio: "3 / 4",
        marginRight: PHOTO_GAP,
        cursor: "zoom-in",
      }}
      onClick={onClick}
    >
      {/* Photo */}
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

      {/* Overlay on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
        style={{ background: "rgba(10,14,18,0.4)" }}
      >
        <Maximize2 size={24} color="white" strokeWidth={1.5} className="drop-shadow-lg" />
      </div>

      {/* Bottom label */}
      <div
        className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-between"
        style={{
          background: "linear-gradient(to top, rgba(10,14,18,0.88) 0%, transparent 100%)",
          transform: "translateY(4px)",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.transform = "translateY(0)")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.transform = "translateY(4px)")}
      >
        <span className="text-white/90 text-xs font-semibold tracking-wide">{photo.cat}</span>
        <span
          style={{
            color: "#c9a052",
            fontSize: "0.52rem",
            fontWeight: 700,
            letterSpacing: "0.16em",
          }}
        >
          {String(globalIdx + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Gold border ring on hover */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ boxShadow: "inset 0 0 0 1.5px rgba(201,160,82,0.55)" }}
      />
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function GalleryGrid() {
  const [paused, setPaused] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);

  // Keyboard navigation
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const prevImg = useCallback(
    () => setLightbox((p) => (p === null ? null : (p - 1 + ALL_PHOTOS.length) % ALL_PHOTOS.length)),
    []
  );
  const nextImg = useCallback(
    () => setLightbox((p) => (p === null ? null : (p + 1) % ALL_PHOTOS.length)),
    []
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

  // Scroll lock while lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  return (
    <section className="py-14">

      {/* Usage hint */}
      <p
        className="text-center mb-10"
        style={{
          color: "rgba(255,255,255,0.18)",
          fontSize: "0.6rem",
          letterSpacing: "0.32em",
          textTransform: "uppercase",
        }}
      >
        Passe o mouse para pausar · Clique para ampliar
      </p>

      {/* ── Strips wrapper — hover pauses both ── */}
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
          {[...ALL_PHOTOS, ...ALL_PHOTOS].map((photo, i) => (
            <PhotoCard
              key={`s1-${i}`}
              photo={photo}
              globalIdx={i % ALL_PHOTOS.length}
              onClick={() => setLightbox(i % ALL_PHOTOS.length)}
            />
          ))}
        </div>

        {/* 12px gap between strips */}
        <div className="h-3" />

        {/* Strip 2 — slides RIGHT, offset start */}
        <div
          className="flex"
          style={{
            animation: "marquee-right 36s linear infinite",
            animationPlayState: paused ? "paused" : "running",
            willChange: "transform",
          }}
        >
          {[...STRIP2, ...STRIP2].map((photo, i) => {
            // Map back to original ALL_PHOTOS index for the lightbox
            const originalIdx = ALL_PHOTOS.findIndex((p) => p.id === photo.id);
            return (
              <PhotoCard
                key={`s2-${i}`}
                photo={photo}
                globalIdx={originalIdx}
                onClick={() => setLightbox(originalIdx)}
              />
            );
          })}
        </div>
      </div>

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
          {ALL_PHOTOS.length} trabalhos · Studio Afro Rosa&apos;s
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
                src={driveImageUrl(ALL_PHOTOS[lightbox].id, 1400)}
                alt={`${ALL_PHOTOS[lightbox].cat} — Studio Afro Rosa's`}
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
                    {String(lightbox + 1).padStart(2, "0")} / {String(ALL_PHOTOS.length).padStart(2, "0")}
                  </span>
                  <span
                    className="text-white/45 text-sm font-medium tracking-wide"
                  >
                    {ALL_PHOTOS[lightbox].cat}
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

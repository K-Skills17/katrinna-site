"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { DRIVE_IMAGE_IDS, driveImageUrl } from "@/lib/constants";

// ─── Photo pools grouped by style (corridor order) ───────────────────────────
type Photo = { id: string; cat: string; tall: boolean };

const BOX_BRAIDS: Photo[] = [
  { id: DRIVE_IMAGE_IDS[1],  cat: "Box Braids", tall: true  },
  { id: DRIVE_IMAGE_IDS[2],  cat: "Box Braids", tall: false },
  { id: DRIVE_IMAGE_IDS[9],  cat: "Box Braids", tall: false },
  { id: DRIVE_IMAGE_IDS[10], cat: "Box Braids", tall: true  },
  { id: DRIVE_IMAGE_IDS[20], cat: "Box Braids", tall: false },
  { id: DRIVE_IMAGE_IDS[22], cat: "Box Braids", tall: true  },
];

const BOHO_BRAIDS: Photo[] = [
  { id: DRIVE_IMAGE_IDS[4],  cat: "Boho Braids", tall: true  },
  { id: DRIVE_IMAGE_IDS[6],  cat: "Boho Braids", tall: false },
  { id: DRIVE_IMAGE_IDS[11], cat: "Boho Braids", tall: true  },
  { id: DRIVE_IMAGE_IDS[12], cat: "Boho Braids", tall: false },
  { id: DRIVE_IMAGE_IDS[13], cat: "Boho Braids", tall: true  },
  { id: DRIVE_IMAGE_IDS[21], cat: "Boho Braids", tall: false },
];

const NAGO: Photo[] = [
  { id: DRIVE_IMAGE_IDS[7],  cat: "Nagô", tall: true  },
  { id: DRIVE_IMAGE_IDS[8],  cat: "Nagô", tall: false },
  { id: DRIVE_IMAGE_IDS[14], cat: "Nagô", tall: false },
  { id: DRIVE_IMAGE_IDS[17], cat: "Nagô", tall: true  },
  { id: DRIVE_IMAGE_IDS[19], cat: "Nagô", tall: true  },
];

const TWISTE: Photo[] = [
  { id: DRIVE_IMAGE_IDS[15], cat: "Twiste", tall: true  },
  { id: DRIVE_IMAGE_IDS[16], cat: "Twiste", tall: false },
  { id: DRIVE_IMAGE_IDS[18], cat: "Twiste", tall: false },
  { id: DRIVE_IMAGE_IDS[23], cat: "Twiste", tall: true  },
];

// Flat list for lightbox (same order as sections)
const ALL_PHOTOS: Photo[] = [...BOX_BRAIDS, ...BOHO_BRAIDS, ...NAGO, ...TWISTE];

// ─── Layout engine ─────────────────────────────────────────────────────────
// Each slot: [flex-grow, dy offset px, rotation deg]
type Slot = [number, number, number];

type LayoutRow = Array<{ photo: Photo; flex: number; dy: number; rot: number }>;

function buildRows(photos: Photo[], rowSlots: Slot[][]): LayoutRow[] {
  let cursor = 0;
  return rowSlots.map((slots) =>
    slots.map(([flex, dy, rot]) => ({ photo: photos[cursor++], flex, dy, rot }))
  );
}

// 6-photo sections — 2 rows of 3, each row with intentional offsets
const BOX_ROWS = buildRows(BOX_BRAIDS, [
  [[5, 0, -1.2], [4, 58, 0.7], [3, 22, -0.4]],
  [[3, 44, 0.9], [5, 0, -0.6], [4, 32, 1.1]],
]);

const BOHO_ROWS = buildRows(BOHO_BRAIDS, [
  [[4, 0,  0.6], [5, 64, -1.0], [3, 30,  0.4]],
  [[5, 48, -0.8], [3, 0,  0.7], [4, 36, -0.5]],
]);

// 5-photo section — row of 2, row of 3
const NAGO_ROWS = buildRows(NAGO, [
  [[5, 0, -0.8], [4, 52, 0.5]],
  [[3, 32, 1.0], [4, 0, -0.6], [5, 42, 0.8]],
]);

// 4-photo section — 2 rows of 2
const TWISTE_ROWS = buildRows(TWISTE, [
  [[5, 0, -1.0], [4, 62, 0.6]],
  [[4, 36, 0.8], [5, 0, -0.5]],
]);

// Section offsets in the flat ALL_PHOTOS array
const SECTIONS = [
  { id: "box-braids",  label: "Box Braids",  idx: "01", rows: BOX_ROWS,   offset: 0  },
  { id: "boho-braids", label: "Boho Braids", idx: "02", rows: BOHO_ROWS,  offset: 6  },
  { id: "nago",        label: "Nagô",        idx: "03", rows: NAGO_ROWS,  offset: 12 },
  { id: "twiste",      label: "Twiste",      idx: "04", rows: TWISTE_ROWS,offset: 17 },
];

// ─── Single photo card ────────────────────────────────────────────────────
function PhotoCard({
  photo, flex, dy, rot, globalIdx, onOpen,
}: {
  photo: Photo; flex: number; dy: number; rot: number;
  globalIdx: number; onOpen: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div
      style={{
        flex: `${flex} ${flex} 0%`,
        minWidth: 0,
        transform: `translateY(${dy}px) rotate(${rot}deg)`,
      }}
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.04 }}
        className="relative overflow-hidden rounded-xl cursor-pointer group"
        style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.35)" }}
        onClick={onOpen}
      >
        <img
          src={driveImageUrl(photo.id, 900)}
          alt={`${photo.cat} — Studio Afro Rosa's`}
          className="w-full object-cover object-top"
          style={{ aspectRatio: photo.tall ? "3/4" : "4/3", display: "block" }}
          loading="lazy"
        />

        {/* Hover gradient overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3.5"
          style={{ background: "linear-gradient(to top, rgba(12,17,22,0.92) 0%, transparent 55%)" }}
        >
          <span
            style={{
              color: "#c9a052", fontSize: "0.52rem", fontWeight: 700,
              letterSpacing: "0.18em", textTransform: "uppercase", display: "block",
            }}
          >
            {String(globalIdx + 1).padStart(2, "0")}
          </span>
          <span className="text-white/90 text-xs font-semibold tracking-wide mt-0.5">
            {photo.cat}
          </span>
        </div>

        {/* Gold ring on hover */}
        <div
          className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ boxShadow: "inset 0 0 0 1.5px rgba(201,160,82,0.5)" }}
        />
      </motion.div>
    </div>
  );
}

// ─── Section divider label ─────────────────────────────────────────────────
function SectionDivider({ idx, label, count }: { idx: string; label: string; count: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="flex items-end gap-5 mb-8"
    >
      {/* Ghost number */}
      <span
        className="font-serif font-black leading-none select-none flex-shrink-0"
        style={{ fontSize: "clamp(4rem, 10vw, 7rem)", color: "rgba(255,255,255,0.04)" }}
      >
        {idx}
      </span>

      {/* Title + line */}
      <div className="flex-1 pb-1">
        <h2
          className="font-serif font-black text-white leading-none"
          style={{ fontSize: "clamp(1.5rem, 4vw, 2.4rem)" }}
        >
          {label}
        </h2>
        <div className="flex items-center gap-3 mt-2">
          <span
            className="block h-px flex-1"
            style={{ background: "linear-gradient(90deg, rgba(201,160,82,0.5), transparent)", maxWidth: "120px" }}
          />
          <span
            style={{
              color: "rgba(201,160,82,0.6)", fontSize: "0.58rem",
              fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase",
            }}
          >
            {count} trabalhos
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────
export default function GalleryGrid() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState("box-braids");

  // Scroll-spy: highlight active section tab
  useEffect(() => {
    const handler = () => {
      for (const s of [...SECTIONS].reverse()) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= 140) {
          setActiveSection(s.id);
          return;
        }
      }
      setActiveSection(SECTIONS[0].id);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 96, behavior: "smooth" });
  };

  // Lightbox controls
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

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  return (
    <section className="py-10 px-5">
      <div className="max-w-6xl mx-auto">

        {/* ── Sticky style-navigation strip ── */}
        <div
          className="sticky top-16 z-30 flex justify-center gap-1 py-3 mb-16"
          style={{
            background: "rgba(17,24,32,0.92)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          {SECTIONS.map((s) => {
            const active = activeSection === s.id;
            return (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className="px-4 py-1.5 rounded-full transition-all duration-200 font-bold"
                style={{
                  background: active ? "linear-gradient(135deg, #e8c87a, #c9a052, #9a7a38)" : "transparent",
                  color: active ? "#0e1318" : "rgba(255,255,255,0.4)",
                  fontSize: "0.66rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                {s.label}
              </button>
            );
          })}
        </div>

        {/* ── Corridor — all sections flow together ── */}
        {SECTIONS.map((section) => (
          <div key={section.id} id={section.id} className="mb-20 md:mb-28">

            <SectionDivider
              idx={section.idx}
              label={section.label}
              count={section.rows.flat().length}
            />

            {/* Photo rows with intentional dy offsets */}
            <div className="flex flex-col" style={{ gap: "10px" }}>
              {section.rows.map((row, ri) => {
                // For the last row, add extra bottom padding so dy offsets don't clip
                const maxDy = Math.max(...row.map((r) => r.dy));
                return (
                  <div
                    key={ri}
                    className="flex items-start"
                    style={{ gap: "10px", paddingBottom: maxDy > 0 ? `${maxDy}px` : "0" }}
                  >
                    {row.map(({ photo, flex, dy, rot }, pi) => {
                      const flatIdx = section.rows.slice(0, ri).reduce((a, r) => a + r.length, 0) + pi;
                      const globalIdx = section.offset + flatIdx;
                      return (
                        <PhotoCard
                          key={photo.id}
                          photo={photo}
                          flex={flex}
                          dy={dy}
                          rot={rot}
                          globalIdx={globalIdx}
                          onOpen={() => setLightbox(globalIdx)}
                        />
                      );
                    })}
                  </div>
                );
              })}
            </div>

          </div>
        ))}

        {/* Footer count */}
        <div
          className="flex items-center justify-center gap-4 pt-4 pb-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <span
            style={{
              color: "rgba(255,255,255,0.18)", fontSize: "0.6rem",
              letterSpacing: "0.28em", textTransform: "uppercase",
            }}
          >
            {ALL_PHOTOS.length} trabalhos · Studio Afro Rosa&apos;s
          </span>
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
            style={{ background: "rgba(6,10,14,0.97)" }}
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="relative max-w-2xl w-full flex flex-col gap-5"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={closeLightbox}
                className="absolute -top-9 right-0 flex items-center gap-1.5 transition-colors text-sm"
                style={{ color: "rgba(255,255,255,0.4)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
              >
                Fechar <X size={15} />
              </button>

              {/* Image */}
              <img
                src={driveImageUrl(ALL_PHOTOS[lightbox].id, 1400)}
                alt={`${ALL_PHOTOS[lightbox].cat} — Studio Afro Rosa's`}
                className="w-full rounded-2xl"
                style={{
                  maxHeight: "74vh",
                  objectFit: "contain",
                  boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
                }}
              />

              {/* Nav */}
              <div className="flex items-center justify-between px-1">
                <button
                  onClick={prevImg}
                  className="flex items-center gap-1 transition-colors text-xs font-medium tracking-wider uppercase"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#c9a052")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
                >
                  <ChevronLeft size={18} /> Anterior
                </button>

                <div className="text-center">
                  <span
                    style={{
                      color: "#c9a052", fontSize: "0.58rem", fontWeight: 700,
                      letterSpacing: "0.22em", textTransform: "uppercase", display: "block",
                    }}
                  >
                    {String(lightbox + 1).padStart(2, "0")} / {String(ALL_PHOTOS.length).padStart(2, "0")}
                  </span>
                  <span className="text-white/50 text-sm font-medium">
                    {ALL_PHOTOS[lightbox].cat}
                  </span>
                </div>

                <button
                  onClick={nextImg}
                  className="flex items-center gap-1 transition-colors text-xs font-medium tracking-wider uppercase"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#c9a052")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
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

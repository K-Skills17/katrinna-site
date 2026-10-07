import { BRAND_NAME, STUDIO_NAME, WA_GENERAL } from "@/lib/constants";

export default function Footer() {
  return (
    <footer
      className="bg-[#0a0e12]"
      style={{ borderTop: "1px solid rgba(201,160,82,0.2)" }}
    >
      {/* Top decorative strip */}
      <div
        className="h-px w-full"
        style={{ background: "linear-gradient(90deg, transparent, rgba(201,160,82,0.4), transparent)" }}
      />

      <div className="max-w-6xl mx-auto px-5 py-12">
        {/* Main footer row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <span
                style={{ display: "block", width: "4px", height: "4px", background: "#c9a052", transform: "rotate(45deg)", opacity: 0.7 }}
              />
              <span
                className="font-serif font-black text-base tracking-[0.25em] uppercase"
                style={{ color: "#c9a052" }}
              >
                {BRAND_NAME.toUpperCase()}
              </span>
              <span
                style={{ display: "block", width: "4px", height: "4px", background: "#c9a052", transform: "rotate(45deg)", opacity: 0.7 }}
              />
            </div>
            <span className="text-white/40 text-xs tracking-widest uppercase">{STUDIO_NAME}</span>
          </div>

          {/* Center tagline */}
          <p
            className="text-white/25 text-center hidden md:block"
            style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase" }}
          >
            Tranças · Técnica · Negócio · Liberdade
          </p>

          {/* CTA link */}
          <a
            href={WA_GENERAL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 hover:text-[#c9a052] transition-colors text-xs tracking-wider uppercase"
          >
            Falar no WhatsApp →
          </a>
        </div>

        {/* Bottom copyright */}
        <div
          className="mt-8 pt-6 flex justify-center"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-white/25 text-xs text-center">
            &copy; {new Date().getFullYear()} {BRAND_NAME} — {STUDIO_NAME}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

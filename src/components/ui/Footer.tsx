import { BRAND_NAME, STUDIO_NAME, WA_GENERAL } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0a0e12]">
      <div className="max-w-6xl mx-auto px-5 py-12 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-white/50">
        <div className="flex flex-col items-center md:items-start gap-1">
          <span
            className="font-serif font-black text-lg tracking-widest text-[#c9a052]"
            style={{ letterSpacing: "0.2em" }}
          >
            {BRAND_NAME.toUpperCase()}
          </span>
          <span className="text-xs">{STUDIO_NAME}</span>
        </div>

        <p className="text-center text-xs">
          &copy; {new Date().getFullYear()} {BRAND_NAME} — {STUDIO_NAME}. Todos os direitos reservados.
        </p>

        <a
          href={WA_GENERAL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/60 hover:text-[#c9a052] transition-colors text-xs"
        >
          Falar no WhatsApp
        </a>
      </div>
    </footer>
  );
}

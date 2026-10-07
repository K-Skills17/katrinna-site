"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { WA_GENERAL } from "@/lib/constants";

const navLinks = [
  { label: "Início",     href: "/"          },
  { label: "Portfólio",  href: "/portfolio" },
  { label: "Cursos",     href: "/cursos"    },
  { label: "Sobre",      href: "/#sobre"    },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false; // anchor — never "active"
    return pathname.startsWith(href);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(14,19,24,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(201,160,82,0.15)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between h-16">

        {/* Logo */}
        <Link
          href="/"
          className="font-serif font-black text-xl tracking-widest uppercase text-gold-gradient flex items-center gap-2"
        >
          <span
            className="diamond-shimmer"
            style={{
              display: "block",
              width: "5px",
              height: "5px",
              background: "#c9a052",
              transform: "rotate(45deg)",
              flexShrink: 0,
              opacity: 0.7,
            }}
          />
          KATRINNA
          <span
            className="diamond-shimmer"
            style={{
              display: "block",
              width: "5px",
              height: "5px",
              background: "#c9a052",
              transform: "rotate(45deg)",
              flexShrink: 0,
              opacity: 0.7,
            }}
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => {
            const active = isActive(l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="flex flex-col items-center text-sm font-medium tracking-wide transition-colors"
                  style={{ color: active ? "#c9a052" : "rgba(255,255,255,0.7)" }}
                >
                  {l.label}
                  {active && (
                    <span
                      className="block h-px w-full mt-0.5"
                      style={{ background: "rgba(201,160,82,0.5)" }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTA */}
        <a
          href={WA_GENERAL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex btn-gold text-sm px-5 py-2.5 rounded-full font-bold"
        >
          Falar Comigo
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all ${open ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0e1318]/98 px-5 pb-6 pt-2 flex flex-col gap-4 border-t border-white/10">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-base font-medium py-1 transition-colors"
              style={{ color: isActive(l.href) ? "#c9a052" : "rgba(255,255,255,0.8)" }}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={WA_GENERAL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold text-sm px-5 py-3 rounded-full font-bold text-center mt-2"
          >
            Falar Comigo
          </a>
        </div>
      )}
    </nav>
  );
}

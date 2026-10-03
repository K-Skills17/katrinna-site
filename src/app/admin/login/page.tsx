"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);
    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Senha incorreta. Tente novamente.");
    }
  }

  return (
    <div className="min-h-screen bg-[#0e1318] flex items-center justify-center px-5">
      <div
        className="w-full max-w-sm rounded-3xl p-8 flex flex-col gap-6"
        style={{ background: "rgba(20,28,36,0.95)", border: "1px solid rgba(201,160,82,0.2)" }}
      >
        <div className="text-center">
          <span
            className="font-serif font-black text-2xl tracking-widest"
            style={{
              background: "linear-gradient(135deg, #e8c87a, #c9a052)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            KATRINNA
          </span>
          <p className="text-white/40 text-sm mt-1">Área administrativa</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-white/60">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              required
              autoFocus
              className="rounded-xl px-4 py-3 text-sm bg-white/5 border border-white/10 focus:border-[#c9a052] outline-none transition-colors"
            />
          </div>

          {error && <p className="text-sm text-[#c4637a]">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="btn-gold py-3 rounded-xl font-bold text-sm"
            style={{ opacity: loading ? 0.6 : 1 }}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <a
          href="/"
          className="text-center text-white/30 hover:text-white/60 text-xs transition-colors"
        >
          ← Voltar ao site
        </a>
      </div>
    </div>
  );
}

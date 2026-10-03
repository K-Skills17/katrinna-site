"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

type PortfolioItem = {
  id: string;
  url: string;
  storage_path: string;
  category: string;
  title: string;
  created_at: string;
};

const CATEGORIES = ["Box Braids", "Boho Braids", "Nagô", "Twiste", "Outros"];

export default function AdminPage() {
  const router = useRouter();
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [category, setCategory] = useState("Outros");
  const [title, setTitle] = useState("");
  const [msg, setMsg] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function loadItems() {
    setLoading(true);
    const res = await fetch("/api/portfolio");
    const data = await res.json();
    setItems(data.items || []);
    setLoading(false);
  }

  useEffect(() => { loadItems(); }, []);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (!file) return;

    setUploading(true);
    setMsg("");
    const form = new FormData();
    form.append("file", file);
    form.append("category", category);
    form.append("title", title);

    const res = await fetch("/api/upload", { method: "POST", body: form });
    const data = await res.json();
    setUploading(false);

    if (data.error) {
      setMsg("Erro: " + data.error);
    } else {
      setMsg("Imagem enviada com sucesso!");
      setTitle("");
      if (fileRef.current) fileRef.current.value = "";
      loadItems();
    }
  }

  async function handleDelete(item: PortfolioItem) {
    if (!confirm("Remover esta imagem do portfólio?")) return;
    await fetch("/api/portfolio", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: item.id, storage_path: item.storage_path }),
    });
    loadItems();
  }

  async function handleLogout() {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#0e1318] text-white">
      {/* Header */}
      <header
        className="flex items-center justify-between px-6 py-4 border-b border-white/10"
        style={{ background: "rgba(20,28,36,0.9)" }}
      >
        <span className="font-serif font-black text-lg text-[#c9a052] tracking-widest">
          KATRINNA · Admin
        </span>
        <button
          onClick={handleLogout}
          className="text-white/50 hover:text-white text-sm transition-colors"
        >
          Sair
        </button>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col gap-10">
        {/* Upload form */}
        <section
          className="rounded-2xl p-7"
          style={{ background: "rgba(20,28,36,0.9)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <h2 className="font-serif font-bold text-2xl mb-6">Adicionar ao Portfólio</h2>
          <form onSubmit={handleUpload} className="flex flex-col gap-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-white/60">Título (opcional)</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Box Braids com extensão"
                  className="rounded-xl px-4 py-3 text-sm bg-white/5 border border-white/10 focus:border-[#c9a052] outline-none transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-white/60">Categoria</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="rounded-xl px-4 py-3 text-sm bg-white/5 border border-white/10 focus:border-[#c9a052] outline-none transition-colors"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c} style={{ background: "#141c24" }}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-white/60">Arquivo (imagem ou vídeo)</label>
              <input
                ref={fileRef}
                type="file"
                accept="image/*,video/*"
                required
                className="rounded-xl px-4 py-3 text-sm bg-white/5 border border-white/10 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#c9a052] file:text-[#0e1318] cursor-pointer"
              />
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="btn-gold px-6 py-3 rounded-xl font-bold text-sm w-fit"
              style={{ opacity: uploading ? 0.6 : 1 }}
            >
              {uploading ? "Enviando..." : "Enviar Arquivo"}
            </button>

            {msg && (
              <p
                className="text-sm"
                style={{ color: msg.startsWith("Erro") ? "#c4637a" : "#c9a052" }}
              >
                {msg}
              </p>
            )}
          </form>
        </section>

        {/* Portfolio grid */}
        <section>
          <h2 className="font-serif font-bold text-2xl mb-6">
            Portfólio ({items.length} itens)
          </h2>

          {loading ? (
            <p className="text-white/40 text-sm">Carregando...</p>
          ) : items.length === 0 ? (
            <p className="text-white/40 text-sm">
              Nenhuma imagem ainda. Envie a primeira acima.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {items.map((item) => (
                <div key={item.id} className="relative group rounded-xl overflow-hidden">
                  <img
                    src={item.url}
                    alt={item.title || "Portfolio"}
                    className="w-full aspect-square object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                    <span className="text-xs text-[#c9a052] font-bold">{item.category}</span>
                    {item.title && (
                      <span className="text-xs text-white/70 text-center">{item.title}</span>
                    )}
                    <button
                      onClick={() => handleDelete(item)}
                      className="text-xs bg-[#c4637a] text-white px-3 py-1.5 rounded-full font-bold mt-1"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export const BRAND_NAME = "Katrinna";
export const STUDIO_NAME = "Studio Afro Rosa's";
export const TAGLINE = "Trance. Empreenda. Domine.";

export const WHATSAPP_NUMBER = "5521986960463";
export const WHATSAPP_BASE = `https://wa.me/${WHATSAPP_NUMBER}`;

export function whatsappLink(message: string) {
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(message)}`;
}

export const WA_ETM = whatsappLink(
  "Olá Katrinna! Quero saber mais sobre o curso Especialista em Tranças (ETM) 🖤"
);
export const WA_EBOOK = whatsappLink(
  "Olá Katrinna! Quero adquirir o E-book de Gestão Financeira 💰"
);
export const WA_GENERAL = whatsappLink(
  "Olá Katrinna! Vim pelo site e quero saber mais 😊"
);

export type GalleryPhoto = { id: string; cat: string };

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  // Box Braids
  { id: "1CL1IgT-woA5bFWFUGrlN9CcgrAVq8oNk", cat: "Box Braids" },
  { id: "1jS7s-a0_AXHo2lKmgoNsZ7949djGnXlf", cat: "Box Braids" },
  { id: "1FrA2bXXJwVM989gimE6zZ7_wxy35HJWS", cat: "Box Braids" },
  // Dreads Sintético
  { id: "1lZDBfbXS_Tz0uSCgyGSoyZEeFHX3TCcK", cat: "Dreads Sintético" },
  { id: "10XZuvJNzH908gseKMcHnRDrWemQIrq4e", cat: "Dreads Sintético" },
  // Entrelace
  { id: "1Gqvu6xJKKKQN3fCcfafFTER69d2hF8Bv", cat: "Entrelace" },
  { id: "1YZLC-IYh9qdXICBUfQucn66ylNzXD2Or", cat: "Entrelace" },
  { id: "1Uh8_phR2B5ySK-5GakGiixqd7TAMCFMY", cat: "Entrelace" },
  { id: "1hfRskGqvO9I3r9ZeFherufR5ryKy7o6i", cat: "Entrelace" },
  // Gypsy Braids
  { id: "1BtL2mygNmkaSUFdDWQaHMB6-uplw58BA", cat: "Gypsy Braids" },
  { id: "1xwZ6x3Y2OP2lEID6Symg6yAu4ONxTeWR", cat: "Gypsy Braids" },
  { id: "190f6hrEqRu08-aEBkCGrUtq5syDAy-uz", cat: "Gypsy Braids" },
  { id: "1rAuEUP1nAzUEGWjwPGVfdXYeKC3-L2Yv", cat: "Gypsy Braids" },
  // Lemonade Braids
  { id: "1Uwgo1QG4Sx12u6Qh3x51Hjm_kobnzb8x", cat: "Lemonade Braids" },
  { id: "1gjlUAYj_Ocx3A8kTMvAHLd79Zcx9LfzC", cat: "Lemonade Braids" },
  { id: "1VIns4XkEMGhYxBsPb_NPUkXdOSXJlrNU", cat: "Lemonade Braids" },
  { id: "1XMAjaUEgzo4p1kudMyMQnBsIFet2FFrd", cat: "Lemonade Braids" },
  // Nagô
  { id: "14dklAYNCViC9nhZtOd-XpVONJTomDv3h", cat: "Nagô" },
  { id: "1oaG5lwDMr8iDrEuhFehtbnG81i3ihAZf", cat: "Nagô" },
  { id: "1tAMsu_mloTJZOBfy-fjgfFqDJRSjsht6", cat: "Nagô" },
  { id: "1NyLxmvaka3gZXUpvzkLsL5bFuMmhd8Y6", cat: "Nagô" },
  { id: "1nHjgC9fyid8CDm5_90iZVXfvXN7k05jB", cat: "Nagô" },
  { id: "1an81c4UKLedN15W7Im875RE5tpdXeM3j", cat: "Nagô" },
  { id: "1uNaK9F9g_9Bh7D7cjy7BBSxgPTt_90ow", cat: "Nagô" },
  { id: "1jBMHgMhkb833B8JmWTBh35KPrHuu9ZMw", cat: "Nagô" },
  { id: "1qK3M7vYsKhPuaQrFnezg8LH7VE-vXWNS", cat: "Nagô" },
  { id: "1zY0-LuqOwbI96mRAeD9TZ97nmcoXc-vE", cat: "Nagô" },
  { id: "1gVhpUoUJ-1QgC5d1m8RO0PAnE59GUUmd", cat: "Nagô" },
  // Twiste Braids
  { id: "1Dq8aZTwXRtKm7kbOW0OBHH8p0tQV1ULo", cat: "Twiste Braids" },
  { id: "1UuKZyNa4iggdxG_iks1j07QhCDwUHhrH", cat: "Twiste Braids" },
];

export const GALLERY_CATEGORIES = [
  "Todos",
  "Box Braids",
  "Dreads Sintético",
  "Entrelace",
  "Gypsy Braids",
  "Lemonade Braids",
  "Nagô",
  "Twiste Braids",
] as const;

export function driveImageUrl(id: string, size = 800) {
  return `https://lh3.googleusercontent.com/d/${id}=w${size}`;
}

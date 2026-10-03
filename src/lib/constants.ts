export const BRAND_NAME = "Katrinna";
export const STUDIO_NAME = "Studio Afro Rosa's";
export const TAGLINE = "Trance. Empreenda. Domine.";

export const WHATSAPP_NUMBER = "5511999999999"; // Replace with real number
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

export const DRIVE_IMAGE_IDS = [
  "1PPSaU8Q1pK9N9KoL1t0wDJMtsc65btyi",
  "1PR4SttDGLuGqW-0MvJVRIpgQQoWuboO2",
  "1PRC1KvxveOvE_KaeSFXMEZtvtY6kd0Rv",
  "1PRWuCoxMR7YDNMTMqQWwRlCOLPp8FXMP",
  "1PVeFsVLgBdwDqGZCb6fHddi3qh5fti8z",
  "1PecPM78-GJNK2_JYMwduGwPae0AVeQaB",
  "1PgazRK56nGbcnb-o-clc_9O2i2ByxHYF",
  "1PmTmxvWKxtVBSP6oEMY30YpG9UnLyzPG",
  "1PsSUjF-dZxAYL7AK-jAEI9GPVbtI_Y0X",
  "1Q3ViHtinw4RRQEfUBEDmyGODOCjm00NF",
  "1QAkl5_DGdEzG7ceSrcgnb_tau84yWrmY",
  "1QGCb0fGw3cvLYDEIRPQT1mKyiN8i344q",
  "1QGmrGfgotHMBUXKd_ciZJDpUAXWfJo2P",
  "1QIxbTNOShTFbYbybj9QSNKEjgkOP3Cvt",
  "1QNAES5VXtJ6xaNHdiIVLyP3H78puFljN",
  "1QPiS995y1O0ebXYEEjHAtRaPDq6Hhb7J",
  "1QagDQR4xFUAlYNkwQS9hBhdDhgPfRf8o",
  "1QbgOyWCBrtWfmB7DDJmAxYleYQ-6iC9_",
  "1Qglnq4IfuZjq9zvWIq0rn5nCRHWTHhe_",
  "1QjFYAGa6mnIhXiWJcMAsFr80r35jTCKI",
  "1QkW6VvW2iGImDSKd9o6CDlirUv3Ndd1i",
  "1QoSY0E3OlKemGgKQHF2-CqiUHzYRcGnS",
  "1Qw8LpEQTO68hPmS8kUVXFO8pqHE0hE1l",
  "1R0tN3yshfvEBSeEzg6-g5yiASXqhwgzm",
];

export function driveImageUrl(id: string, size = 800) {
  return `https://lh3.googleusercontent.com/d/${id}=w${size}`;
}

/**
 * Static image paths under /public/images/legacy (mirrored from the legacy WordPress site).
 */
export const artverdImages = {
  gat: "/images/hero-sliders/gat.webp",
  nadal: "/images/hero-sliders/nadal.webp",
  roses: "/images/hero-sliders/roses.webp",
  tenda: "/images/hero-sliders/tenda.webp",

  logo: "/images/legacy/logo.webp",
  categoryRams: "/images/legacy/category-rams.webp",
  categoryPlantes: "/images/legacy/category-plantes.webp",
  categoryAccesoris: "/images/legacy/category-accesoris.webp",
  categoryEvents: "/images/legacy/category-events.webp",
  bestSeller: "/images/legacy/best-seller.webp",
  workshopsRams: "/images/legacy/workshops-rams.webp",
  flowerSectionBg: "/images/legacy/flower-section-bg.webp",
  flowerFooterBg: "/images/legacy/flower-footer-bg.webp",
  socialInstagram: "/images/legacy/social-instagram.webp",
  socialFacebook: "/images/legacy/social-facebook.webp",
} as const;

/** Full-viewport home hero background rotation (legacy marketing imagery). */
export const artverdHeroSlides = [
  artverdImages.tenda,
  artverdImages.roses,
  artverdImages.gat,
  artverdImages.nadal,
] as const;

export const artverdDecorIcons = {
  iconPlanta1: "/images/legacy/planta-1.webp",
  iconPlanta2: "/images/legacy/planta-2.webp",
  iconFlor: "/images/legacy/flor.webp",
  iconGirasol: "/images/legacy/girasol.webp",
} as const;

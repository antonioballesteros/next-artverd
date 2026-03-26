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
  categoryEvents: "/images/legacy/category-events.jpg",
  bestSeller: "/images/legacy/best-seller.jpg",
  workshopsRams: "/images/legacy/workshops-rams.jpg",
  flowerSectionBg: "/images/legacy/flower-section-bg.png",
  flowerFooterBg: "/images/legacy/flower-footer-bg.png",
  socialInstagram: "/images/legacy/social-instagram.png",
  socialFacebook: "/images/legacy/social-facebook.png",
  siteFavicon: "/images/legacy/site-favicon.png",
} as const;

/** Full-viewport home hero background rotation (legacy marketing imagery). */
export const artverdHeroSlides = [
  artverdImages.tenda,
  artverdImages.roses,
  artverdImages.gat,
  artverdImages.nadal,
] as const;

export const artverdDecorIcons = {
  iconPlanta1: "/images/legacy/planta-1.png",
  iconPlanta2: "/images/legacy/planta-2.png",
  iconFlor: "/images/legacy/flor.png",
  iconGirasol: "/images/legacy/girasol.png",
} as const;

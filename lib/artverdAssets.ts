/**
 * Static image paths under /public/images/legacy (mirrored from the legacy WordPress site).
 */
export const artverdLegacyImages = {
  logo: "/images/legacy/logo.png",
  heroPortada: "/images/legacy/hero-portada.jpg",
  nadal: "/images/legacy/nadal.jpg",
  gato: "/images/legacy/gato.jpg",
  introTenda: "/images/legacy/intro-tenda.jpg",
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
  artverdLegacyImages.heroPortada,
  artverdLegacyImages.nadal,
  artverdLegacyImages.gato,
  artverdLegacyImages.introTenda,
  artverdLegacyImages.workshopsRams,
  artverdLegacyImages.bestSeller,
  artverdLegacyImages.categoryEvents,
] as const;

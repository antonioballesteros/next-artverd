/** In `pb=` embed URLs, `!5e0!` = roadmap, `!5e1!` = satellite (default from Share can be either). */
const STORE_MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4940.457332825901!2d2.010401777247806!3d41.563518885049774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a492e9fb7ad36f%3A0x184857181b7cbdf3!2sArtverd!5e0!3m2!1ses!2ses!4v1774379333026!5m2!1ses!2ses";

interface StoreGoogleMapEmbedProps {
  /** Merges with the default map wrapper (home uses top margin; contact may pass `mt-0`). */
  className?: string;
}

export function StoreGoogleMapEmbed({ className }: StoreGoogleMapEmbedProps) {
  return (
    <div className={className ?? "mt-10 h-120 w-full"}>
      <iframe
        title="Artverd Floristeria a Google Maps"
        src={STORE_MAP_EMBED_SRC}
        width="100%"
        height="100%"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="block h-full w-full border-0"
      />
    </div>
  );
}

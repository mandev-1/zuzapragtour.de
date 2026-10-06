import React from 'react';

/**
 * Homepage hero photo, shared by both homepages (A = Home, B = HomeMobileV2).
 * Responsive AVIF/WebP variants live in /images/hero; the originals stay as
 * sources. Identical markup in both variants means the browser fetches it once.
 */
export default function HomeHeroPicture({ alt }: { alt: string }) {
  return (
    <picture>
      {/* Desktop hero */}
      <source
        media="(min-width: 768px)"
        type="image/avif"
        sizes="100vw"
        srcSet="/images/hero/prague-old-town-square-tourist-1280.avif 1280w, /images/hero/prague-old-town-square-tourist-1920.avif 1920w, /images/hero/prague-old-town-square-tourist-2560.avif 2560w"
      />
      <source
        media="(min-width: 768px)"
        type="image/webp"
        sizes="100vw"
        srcSet="/images/hero/prague-old-town-square-tourist-1280.webp 1280w, /images/hero/prague-old-town-square-tourist-1920.webp 1920w, /images/hero/prague-old-town-square-tourist-2560.webp 2560w"
      />
      {/* Mobile keeps the Vltava-bridges hero */}
      <source
        type="image/avif"
        sizes="100vw"
        srcSet="/images/hero/vltava-bridges-hero-480.avif 480w, /images/hero/vltava-bridges-hero-720.avif 720w, /images/hero/vltava-bridges-hero-1080.avif 1080w"
      />
      <source
        type="image/webp"
        sizes="100vw"
        srcSet="/images/hero/vltava-bridges-hero-480.webp 480w, /images/hero/vltava-bridges-hero-720.webp 720w, /images/hero/vltava-bridges-hero-1080.webp 1080w"
      />
      <img
        src="/images/hero/vltava-bridges-hero-1080.jpg"
        alt={alt}
        className="absolute inset-0 h-full w-full animate-kenburns object-cover [object-position:center_42%] motion-reduce:animate-none"
        fetchPriority="high"
      />
    </picture>
  );
}

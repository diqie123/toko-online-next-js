"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

export function ProductImageGallery({ images, alt }: { images: string[]; alt: string }) {
  const list = useMemo(() => images.filter(Boolean), [images]);
  const [active, setActive] = useState(0);
  const activeSrc = list[active] ?? list[0] ?? "https://placehold.co/1200x800/png";

  return (
    <div className="space-y-3">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))]">
        <Image
          src={activeSrc}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, 520px"
          className="object-cover transition-transform duration-300 hover:scale-[1.03]"
          priority
        />
      </div>
      {list.length > 1 ? (
        <div className="grid grid-cols-4 gap-2">
          {list.slice(0, 8).map((src, idx) => (
            <button
              key={`${src}-${idx}`}
              type="button"
              onClick={() => setActive(idx)}
              className={`relative aspect-[4/3] overflow-hidden rounded-xl border ${
                idx === active ? "border-[rgb(var(--primary))]" : "border-[rgb(var(--border))]"
              } bg-[rgb(var(--card))]`}
              aria-label={`Select image ${idx + 1}`}
            >
              <Image src={src} alt={alt} fill sizes="120px" className="object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}


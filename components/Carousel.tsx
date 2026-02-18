"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type Slide = {
  title: string;
  subtitle: string;
  image: string;
  href: string;
};

export function Carousel({ slides }: { slides: Slide[] }) {
  const safeSlides = useMemo(() => slides.filter((s) => Boolean(s)), [slides]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (safeSlides.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % safeSlides.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, [safeSlides.length]);

  const active = safeSlides[index];
  if (!active) return null;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--card))]">
      <div className="relative h-[320px] w-full sm:h-[380px]">
        <Image
          src={active.image}
          alt={active.title}
          fill
          sizes="(max-width: 640px) 100vw, 960px"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-lg px-6 py-10 sm:px-10">
            <div className="text-2xl font-semibold text-white sm:text-3xl">{active.title}</div>
            <p className="mt-2 text-sm text-white/90 sm:text-base">{active.subtitle}</p>
            <Link
              href={active.href}
              className="mt-5 inline-flex items-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black hover:opacity-95"
            >
              Belanja sekarang
            </Link>
          </div>
        </div>
      </div>

      {safeSlides.length > 1 ? (
        <>
          <button
            type="button"
            onClick={() => setIndex((i) => (i - 1 + safeSlides.length) % safeSlides.length)}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-xl bg-white/85 p-2 text-black hover:bg-white"
            aria-label="Previous slide"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => setIndex((i) => (i + 1) % safeSlides.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl bg-white/85 p-2 text-black hover:bg-white"
            aria-label="Next slide"
          >
            <ChevronRight size={18} />
          </button>

          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {safeSlides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={`h-2 w-2 rounded-full ${i === index ? "bg-white" : "bg-white/50"}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

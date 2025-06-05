"use client";
import { notFound } from "next/navigation";
import Image from "next/image";
import { useState, useRef } from "react";

const albums = [
  {
    title: "Residential Designs",
    slug: "residential-designs",
    subtitle: "Where function meets identity.",
    description:
      "Our commercial interiors are designed to do more than just look good — they perform, adapt, and reflect the brand they belong to. From workspaces that fuel productivity to retail environments that shape experience, we craft interiors that balance utility, aesthetics, and emotion.",
    images: [
      "/img(1).png",
      "/img(2).png",
      "/img(3).png",
      "/img(4).png",
      "/img(5).png",
      "/img(2).png",
      "/img(3).png",
      "/img(4).png",
      "/img(5).png",
      "/img(2).png",
      "/img(3).png",
      "/img(4).png",
      "/img(5).png",
      "/img(2).png",
      "/img(3).png",
      "/img(4).png",
      "/img(5).png",
    ],
  },
  {
    title: "Commercial Designs",
    slug: "commercial-designs",
    subtitle: "Where business meets beauty.",
    description:
      "Our commercial designs are tailored to enhance productivity and brand presence. We create spaces that inspire innovation and foster collaboration.",
    images: [
      "/img(2).png",
      "/img(3).png",
      "/img(4).png",
      "/img(5).png",
      "/img(6).png",
    ],
  },
  {
    title: "Exterior Designs",
    slug: "exterior-designs",
    subtitle: "Where exteriors make impressions.",
    description:
      "Our exterior designs blend form and function, creating stunning facades that stand out and endure.",
    images: [
      "/img(3).png",
      "/img(2).png",
      "/img(4).png",
      "/img(5).png",
      "/img(6).png",
    ],
  },
];

export default function AlbumPage({ params }: { params: { slug: string } }) {
  const album = albums.find((a) => a.slug === params.slug);
  if (!album) return notFound();

  const [mainIdx, setMainIdx] = useState(0);
  const thumbRowRef = useRef<HTMLDivElement>(null);

  // Filter out the current album for the "More Albums" section
  const moreAlbums = albums.filter((a) => a.slug !== params.slug);

  // Scroll thumbnail row by a fixed amount
  const scrollThumbnails = (dir: "left" | "right") => {
    const row = thumbRowRef.current;
    if (!row) return;
    const scrollAmount = row.offsetWidth * 0.6; // Scroll by 60% of visible width
    row.scrollBy({ left: dir === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-neutral-light flex flex-col items-center py-12">
      <div className="w-full max-w-[1300px] flex flex-col items-start mt-16 mx-auto px-4">
        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-extrabold mb-2 text-neutral-900">
          {album.title}
          <span className="text-yellow-400">.</span>
        </h1>
        {/* Subtitle */}
        <h2 className="text-2xl font-bold mb-2 text-neutral-900">
          {album.subtitle}
        </h2>
        {/* Description */}
        <p className="text-base md:text-xl text-neutral-800 mb-8 text-left w-full">
          {album.description}
        </p>
        {/* Main Image */}
        <div className="w-full rounded-2xl overflow-hidden mb-4">
          <Image
            src={album.images[mainIdx]}
            alt={album.title}
            width={1200}
            height={600}
            className="w-full h-[350px] md:h-[720px] object-cover"
            priority
          />
        </div>
        {/* Thumbnails with scroll, gradients, and arrows */}
        <div className="relative w-full max-w-full flex items-center mt-2">
          {/* Left Arrow */}
          <button
            type="button"
            aria-label="Scroll thumbnails left"
            className="absolute left-0 z-20 h-full flex items-center px-2 md:px-3 bg-gradient-to-r from-neutral-light/90 to-transparent hover:from-neutral-light/100 transition disabled:opacity-30"
            onClick={() => scrollThumbnails("left")}
            tabIndex={0}
          >
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-neutral-700"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          {/* Thumbnails Row */}
          <div
            ref={thumbRowRef}
            className="relative flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide w-full px-8 md:px-16 py-1"
            style={{ scrollBehavior: "smooth" }}
          >
            {album.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setMainIdx(idx)}
                className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all focus:outline-none ${mainIdx === idx ? "border-yellow-400" : "border-transparent"}`}
                style={{ width: '8rem', height: '5.5rem' }}
                aria-label={`Show image ${idx + 1}`}
              >
                <Image
                  src={img}
                  alt={`${album.title} thumbnail ${idx + 1}`}
                  width={128}
                  height={88}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
          {/* Right Arrow */}
          <button
            type="button"
            aria-label="Scroll thumbnails right"
            className="absolute right-0 z-20 h-full flex items-center px-2 md:px-3 bg-gradient-to-l from-neutral-light/90 to-transparent hover:from-neutral-light/100 transition disabled:opacity-30"
            onClick={() => scrollThumbnails("right")}
            tabIndex={0}
          >
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-neutral-700"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
          {/* Left Gradient Overlay */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-10 md:w-16 z-10 bg-gradient-to-r from-neutral-light/90 to-transparent" />
          {/* Right Gradient Overlay */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-10 md:w-16 z-10 bg-gradient-to-l from-neutral-light/90 to-transparent" />
        </div>

        {/* More Albums Section */}
        <div className="w-full mt-16 mb-10">
          <h2 className="text-3xl font-bold mb-16 text-neutral-900 text-center">More Albums<span className="text-yellow-400">.</span></h2>
          <div className="flex flex-wrap gap-10 justify-center">
            {moreAlbums.map((a) => (
              <a
                key={a.slug}
                href={`/gallery/${a.slug}`}
                className="relative w-96 h-[28rem] rounded-3xl overflow-hidden shadow-lg bg-white transition-transform duration-300 hover:scale-105"
              >
                <Image
                  src={a.images[0]}
                  alt={a.title}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 w-full bg-black/60 p-4">
                  <div className="text-2xl font-semibold text-white drop-shadow-md text-center">{a.title}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
} 
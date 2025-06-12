"use client";
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { fetchAPI, Gallery } from '@/lib/api';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface GalleryPageProps {
  params: {
    slug: string;
  };
}

export default function GalleryPage({ params }: GalleryPageProps) {
  const [gallery, setGallery] = useState<Gallery | null>(null);
  const [otherGalleries, setOtherGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mainIdx, setMainIdx] = useState(0);
  const thumbRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        // Fetch current gallery
        const response = await fetchAPI<{ data: Gallery[] }>(
          `galleries?filters[slug][$eq]=${params.slug}&populate=*`
        );
        if (response.data.length > 0) {
          setGallery(response.data[0]);
        } else {
          setError('Gallery not found');
        }

        // Fetch other galleries
        const otherResponse = await fetchAPI<{ data: Gallery[] }>(
          'galleries?populate=*'
        );
        // Filter out the current gallery
        const filteredGalleries = otherResponse.data.filter(
          (g) => g.slug !== params.slug
        );
        setOtherGalleries(filteredGalleries);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch gallery');
      } finally {
        setLoading(false);
      }
    };

    fetchGalleries();
  }, [params.slug]);

  // Scroll thumbnail row by a fixed amount
  const scrollThumbnails = (dir: "left" | "right") => {
    const row = thumbRowRef.current;
    if (!row) return;
    const scrollAmount = row.offsetWidth * 0.6; // Scroll by 60% of visible width
    row.scrollBy({ left: dir === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-neutral-light flex flex-col items-center justify-center py-12">
        <div className="text-2xl font-semibold">Loading gallery...</div>
      </main>
    );
  }

  if (error || !gallery) {
    return (
      <main className="min-h-screen bg-neutral-light flex flex-col items-center justify-center py-12">
        <div className="text-2xl font-semibold text-red-600">Error: {error || 'Gallery not found'}</div>
        <Link href="/gallery" className="mt-4 text-blue-600 hover:underline">
          Back to Gallery
        </Link>
      </main>
    );
  }

  // Check if collection data exists
  if (!gallery.collection || gallery.collection.length === 0) {
    return (
      <main className="min-h-screen bg-neutral-light flex flex-col items-center justify-center py-12">
        <div className="text-2xl font-semibold text-red-600">Error: No images found in this gallery</div>
        <Link href="/gallery" className="mt-4 text-blue-600 hover:underline">
          Back to Gallery
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-light flex flex-col items-center py-12">
      <div className="w-full max-w-[1300px] flex flex-col items-start mt-16 mx-auto px-4">
        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-extrabold mb-2 text-neutral-900">
          {gallery.title}
          <span className="text-yellow-400">.</span>
        </h1>
        {/* Subtitle */}
        <h2 className="text-2xl font-bold mb-2 text-neutral-900">
          {gallery.tagline}
        </h2>
        {/* Description */}
        <p className="text-base md:text-xl text-neutral-800 mb-8 text-left w-full">
          {gallery.description}
        </p>
        {/* Main Image */}
        <div className="w-full rounded-2xl overflow-hidden mb-4">
          <Image
            src={gallery.collection[mainIdx].formats?.large?.url || gallery.collection[mainIdx].url}
            alt={gallery.collection[mainIdx].alternativeText || gallery.title}
            width={1200}
            height={600}
            className="w-full h-[500px] md:h-[800px] object-contain bg-neutral-100"
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
            {gallery.collection.map((image, idx) => {
              const imageUrl = image.formats?.large?.url || image.url;
              if (!imageUrl) return null;
              
              return (
                <button
                  key={image.id}
                  onClick={() => setMainIdx(idx)}
                  className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all focus:outline-none ${mainIdx === idx ? "border-yellow-400" : "border-transparent"}`}
                  style={{ width: '8rem', height: '5.5rem' }}
                  aria-label={`Show image ${idx + 1}`}
                >
                  <Image
                    src={imageUrl}
                    alt={image.alternativeText || `Gallery image ${idx + 1}`}
                    width={128}
                    height={88}
                    className="w-full h-full object-contain bg-neutral-100"
                  />
                </button>
              );
            })}
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
        {otherGalleries.length > 0 && (
          <div className="w-full mt-16 mb-10">
            <h2 className="text-3xl font-bold mb-16 text-neutral-900 text-center">More Albums<span className="text-yellow-400">.</span></h2>
            <div className="flex flex-wrap gap-10 justify-center">
              {otherGalleries.map((otherGallery) => {
                const coverImage = otherGallery.collection[0];
                const imageUrl = coverImage?.formats?.large?.url || coverImage?.url;
                
                return (
                  <Link
                    key={otherGallery.id}
                    href={`/gallery/${otherGallery.slug}`}
                    className="relative w-96 h-[28rem] rounded-3xl overflow-hidden shadow-lg bg-white transition-transform duration-300 hover:scale-105"
                  >
                    {imageUrl && (
                      <Image
                        src={imageUrl}
                        alt={otherGallery.title}
                        width={600}
                        height={600}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute bottom-0 left-0 w-full bg-black/60 p-4">
                      <div className="text-2xl font-semibold text-white drop-shadow-md text-center">{otherGallery.title}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Back Button */}
        <div className="text-center mt-12 w-full">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 bg-[#4b6b4a] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#3d5a3c] transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="rotate-180"
            >
              <path
                d="M7 13L13 7M13 7H7M13 7V13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to Gallery
          </Link>
        </div>
      </div>
    </main>
  );
} 
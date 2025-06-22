'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchAPI, GalleryResponse } from "@/lib/api";
import { GalleryCardSkeleton } from '@/components/ui/skeleton';
import ScrollToTop from "../components/ScrollToTop";

export default function GalleryPage() {
  const [galleries, setGalleries] = useState<GalleryResponse['data']>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const response = await fetchAPI<GalleryResponse>('galleries?populate=*');
        setGalleries(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch galleries');
      } finally {
        setLoading(false);
      }
    };

    fetchGalleries();
  }, []);

  return (
    <main className="min-h-screen bg-neutral-light flex flex-col items-center py-12">
      <ScrollToTop />
      {/* Title - Always visible */}
      <div className="flex flex-col items-center mb-8 mt-20">
        <span className="bg-secondary rounded-2xl px-10 py-2 mb-4">
          <h1 className="text-6xl md:text-7xl font-extrabold text-neutral-900 text-center inline-block">
            Gallery<span className="text-neutral-900">.</span>
          </h1>
        </span>
        {/* Albums Button */}
        <button className="bg-[#4b6b4a] text-white px-6 py-1 rounded-lg font-semibold text-lg mb-8 shadow">
          Albums
        </button>
      </div>

      {/* Content Section */}
      {loading ? (
        // Show skeleton loading for gallery cards only
        <div className="flex flex-wrap gap-10 justify-center w-full max-w-6xl">
          {[...Array(6)].map((_, i) => (
            <GalleryCardSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        // Show error message
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-2xl font-semibold text-red-600">Error: {error}</div>
        </div>
      ) : (
        // Show actual gallery cards
        <div className="flex flex-wrap gap-10 justify-center w-full max-w-6xl">
          {galleries.map((gallery) => {
            const coverImage = gallery.collection[0];
            const imageUrl = coverImage?.formats?.large?.url || coverImage?.url;
            
            return (
              <Link
                key={gallery.id}
                href={`/gallery/${gallery.slug}`}
                className="relative w-80 h-[26rem] rounded-2xl overflow-hidden shadow-lg bg-white transition-transform hover:scale-105"
              >
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt={gallery.title}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute bottom-0 left-0 w-full bg-black/60 p-6 flex items-end">
                  <span className="text-2xl font-bold text-white drop-shadow-md w-full text-center">
                    {gallery.title}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
} 
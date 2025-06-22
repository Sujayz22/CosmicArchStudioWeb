'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchAPI } from "@/lib/api";
import { CgProfile } from "react-icons/cg";
import { ReviewCardSkeleton } from '@/components/ui/skeleton';
import ScrollToTop from "../components/ScrollToTop";

interface Review {
  id: number;
  name: string;
  location: string;
  type: string;
  rating: number;
  review: string;
  profilepic: {
    id: number;
    name: string;
    url: string;
    formats?: {
      thumbnail: {
        url: string;
      };
    };
  } | null;
  image: {
    id: number;
    name: string;
    url: string;
    formats?: {
      medium: {
        url: string;
      };
    };
  } | null;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 justify-end">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-secondary" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetchAPI<{ data: Review[] }>('reviews?populate=*');
        if (response.data) {
          // Transform the data to match our interface
          const transformedReviews = response.data.map(review => ({
            id: review.id,
            name: review.name,
            location: review.location,
            type: review.type,
            rating: review.rating,
            review: review.review,
            profilepic: review.profilepic ? {
              id: review.profilepic.id,
              name: review.profilepic.name,
              url: review.profilepic.formats?.thumbnail?.url || review.profilepic.url
            } : null,
            image: review.image ? {
              id: review.image.id,
              name: review.image.name,
              url: review.image.formats?.medium?.url || review.image.url
            } : null
          }));
          setReviews(transformedReviews);
        }
      } catch (err) {
        console.error('Failed to fetch reviews:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-neutral-light flex flex-col items-center py-12">
        <div className="flex flex-col items-center mt-20 mb-14">
          <span className="bg-secondary rounded-2xl px-10 py-2 mb-8">
            <h1 className="text-5xl md:text-6xl font-extrabold text-neutral-900 text-center inline-block">
              Reviews<span className="text-neutral-900">.</span>
            </h1>
          </span>
          <p className="text-center text-xl text-neutral-700 max-w-2xl px-6 md:px-0">
            Hear from our happy clients about their experience working with Cosmic Arch Studio and the quality of our craftsmanship.
          </p>
        </div>
        
        {/* Skeleton Grid */}
        <div className="columns-1 md:columns-2 gap-8 max-w-4xl w-full px-6 md:px-0">
          {[...Array(6)].map((_, i) => (
            <ReviewCardSkeleton key={i} />
          ))}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-light flex flex-col items-center py-12">
      <ScrollToTop />
      {/* Title */}
      <div className="flex flex-col items-center mt-20 mb-14">
        <span className="bg-secondary rounded-2xl px-10 py-2 mb-8">
          <h1 className="text-5xl md:text-6xl font-extrabold text-neutral-900 text-center inline-block">
            Reviews<span className="text-neutral-900">.</span>
          </h1>
        </span>
        <p className="text-center text-xl text-neutral-700 max-w-2xl px-6 md:px-0">
          Hear from our happy clients about their experience working with Cosmic Arch Studio and the quality of our craftsmanship.
        </p>
      </div>
      {/* Reviews Grid */}
      <div className="columns-1 md:columns-2 gap-8 max-w-4xl w-full px-6 md:px-0">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-2xl shadow p-6 mb-8 break-inside-avoid">
            {review.image && (
              <Image
                src={review.image.url}
                alt={`Project for ${review.name}'s review`}
                width={400}
                height={220}
                className="rounded-xl w-full h-48 object-cover mb-4"
              />
            )}
            <div className={`flex items-center${review.image ? " mb-2" : ""}`}>
              {review.profilepic?.url ? (
                <Image
                  src={review.profilepic.url}
                  alt={`${review.name}'s profile picture`}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <CgProfile className="w-8 h-8 text-gray-500" />
                </div>
              )}
              <div className="ml-3 flex-1">
                <div className="font-semibold">{review.name}</div>
                <div className="text-xs text-gray-500">
                  {review.type}
                  {review.location ? ` • ${review.location}` : ""}
                </div>
              </div>
              <StarRating rating={review.rating} />
            </div>
            <p className="text-sm text-neutral-700">{review.review}</p>
          </div>
        ))}
      </div>
    </main>
  );
} 
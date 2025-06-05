import Image from "next/image";

const reviewsData = [
  {
    type: "Personal Testimonial",
    name: "Alice Johnson",
    location: "Las Vegas",
    avatar: "/profilepic.jpg",
    rating: 5,
    text: "Cosmic Arch Studio took our ideas for a modern, minimalist design and turned them into something even better. The design, attention to detail, and communication was top-notch. We are so happy with how everything turned out, and the team was great to work with throughout the process.",
    image: "/img(1).png",
  },
  {
    type: "Google Review",
    name: "Edward Stark",
    location: "Las Vegas",
    avatar: "/profilepic.jpg",
    rating: 5,
    text: "Cosmic Arch Studio took our ideas for a modern, minimalist design and turned them into something even better. The design, attention to detail, and communication was top-notch. We are so happy with how everything turned out, and the team was great to work with throughout the process.",
  },
  {
    type: "Personal Testimonial",
    name: "Priya Sharma",
    location: "Mumbai",
    avatar: "/profilepic.jpg",
    rating: 4,
    text: "The team at Cosmic Arch Studio was very professional and creative. They listened to our needs and delivered a beautiful home. Highly recommended!",
    image: "/img(2).png",
  },
  {
    type: "Google Review",
    name: "Michael Lee",
    location: "Singapore",
    avatar: "/profilepic.jpg",
    rating: 5,
    text: "Excellent service and attention to detail. The project was completed on time and exceeded our expectations.",
  },
  {
    type: "Personal Testimonial",
    name: "Sara Kim",
    location: "Seoul",
    avatar: "/profilepic.jpg",
    rating: 5,
    text: "We loved working with Cosmic Arch Studio. The design process was smooth and the results are stunning!",
    image: "/img(3).png",
  },
  {
    type: "Google Review",
    name: "Carlos Mendez",
    location: "Madrid",
    avatar: "/profilepic.jpg",
    rating: 4,
    text: "Very happy with the outcome. The team was responsive and creative throughout the project.",
  },
  {
    type: "Personal Testimonial",
    name: "Alice Johnson",
    location: "Las Vegas",
    avatar: "/profilepic.jpg",
    rating: 5,
    text: "Cosmic Arch Studio took our ideas for a modern, minimalist design and turned them into something even better. The design, attention to detail, and communication was top-notch. We are so happy with how everything turned out, and the team was great to work with throughout the process.",
    image: "/img(1).png",
  },
  {
    type: "Google Review",
    name: "Edward Stark",
    location: "Las Vegas",
    avatar: "/profilepic.jpg",
    rating: 5,
    text: "Cosmic Arch Studio took our ideas for a modern, minimalist design and turned them into something even better. The design, attention to detail, and communication was top-notch. We are so happy with how everything turned out, and the team was great to work with throughout the process.",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 justify-end">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
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
  return (
    <main className="min-h-screen bg-neutral-light flex flex-col items-center py-12">
      {/* Title */}
      <div className="flex flex-col items-center mt-20 mb-14">
        <span className="bg-yellow-300 rounded-2xl px-10 py-2 mb-8">
          <h1 className="text-5xl md:text-6xl font-extrabold text-neutral-900 text-center inline-block">
            Reviews<span className="text-neutral-900">.</span>
          </h1>
        </span>
        <p className="text-center text-xl text-neutral-700 max-w-2xl">
          Hear from our happy clients about their experience working with Cosmic Arch Studio and the quality of our craftsmanship.
        </p>
      </div>
      {/* Reviews Grid */}
      <div className="columns-1 md:columns-2 gap-8 max-w-4xl w-full">
        {reviewsData.map((review, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow p-6 mb-8 break-inside-avoid">
            {review.image && (
              <Image
                src={review.image}
                alt="Project"
                width={400}
                height={220}
                className="rounded-xl w-full h-48 object-cover mb-4"
              />
            )}
            <div className={`flex items-center${review.image ? " mb-2" : ""}`}>
              <Image
                src={review.avatar}
                alt={review.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="ml-3 flex-1">
                <div className="font-semibold">{review.name}</div>
                <div className="text-xs text-gray-500">
                  {review.type}
                  {review.location ? ` • ${review.location}` : ""}
                </div>
              </div>
              <StarRating rating={review.rating} />
            </div>
            <p className="text-sm text-neutral-700">{review.text}</p>
          </div>
        ))}
      </div>
    </main>
  );
} 
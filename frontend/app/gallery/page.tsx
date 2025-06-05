import Image from "next/image";
import Link from "next/link";

const albums = [
  {
    title: "Residential Designs",
    image: "/img(1).png",
    slug: "residential-designs",
  },
  {
    title: "Commercial Designs",
    image: "/img(2).png",
    slug: "commercial-designs",
  },
  {
    title: "Exterior Designs",
    image: "/img(3).png",
    slug: "exterior-designs",
  },
];

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-neutral-light flex flex-col items-center py-12">
      {/* Title */}
      <div className="flex flex-col items-center mb-8 mt-20">
        <span className="bg-yellow-300 rounded-2xl px-10 py-2 mb-4">
          <h1 className="text-6xl md:text-7xl font-extrabold text-neutral-900 text-center inline-block">
            Gallery<span className="text-neutral-900">.</span>
          </h1>
        </span>
        {/* Albums Button */}
        <button className="bg-[#4b6b4a] text-white px-6 py-1 rounded-lg font-semibold text-lg mb-8 shadow">
          Albums
        </button>
      </div>
      {/* Cards */}
      <div className="flex flex-wrap gap-10 justify-center w-full max-w-6xl">
        {albums.map((album) => (
          <Link
            key={album.slug}
            href={`/gallery/${album.slug}`}
            className="relative w-80 h-[26rem] rounded-2xl overflow-hidden shadow-lg bg-white transition-transform hover:scale-105"
          >
            <Image
              src={album.image}
              alt={album.title}
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full  bg-black/60 p-6 flex items-end">
              <span className="text-2xl font-bold text-white drop-shadow-md w-full text-center">
                {album.title}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
} 
import Image from "next/image";
import Link from "next/link";

const moreProjects = [
  {
    slug: 'nivara-villa',
    image: '/img(1).png',
    title: 'Nivara Villa',
    tags: ['Residential', 'Individual House'],
    client: 'John Arnold',
    location: 'Chennai',
    services: 'Full Interior and Exterior Design',
    duration: '5 Months',
    theme: 'Modern Minimalism',
    category: 'Residential',
    type: 'Individual House',
    size: '3000 sq ft.',
  },
  {
    slug: 'urban-oasis',
    image: '/img(2).png',
    title: 'Urban Oasis',
    tags: ['Commercial', 'Office Space'],
    client: 'Tech Corp',
    location: 'Bangalore',
    services: 'Interior Design and Furnishing',
    duration: '3 Months',
    theme: 'Contemporary',
    category: 'Commercial',
    type: 'Office Space',
    size: '5000 sq ft.',
  },
  {
    slug: 'heritage-home',
    image: '/img(3).png',
    title: 'Heritage Home',
    tags: ['Residential', 'Villa'],
    client: 'Emily Clark',
    location: 'Pune',
    services: 'Restoration and Interior Design',
    duration: '8 Months',
    theme: 'Classic Heritage',
    category: 'Residential',
    type: 'Villa',
    size: '4500 sq ft.',
  },
  {
    slug: 'green-retreat',
    image: '/img(4).png',
    title: 'Green Retreat',
    tags: ['Residential', 'Eco-Friendly'],
    client: 'Eco Living',
    location: 'Goa',
    services: 'Sustainable Design and Landscaping',
    duration: '6 Months',
    theme: 'Eco-Friendly',
    category: 'Residential',
    type: 'Eco-Friendly House',
    size: '3500 sq ft.',
  },
];

export default function MoreProjects() {
  return (
    <section className="w-full py-12 mt-16 flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-neutral-900 text-center">
        More Projects<span className="text-yellow-400">.</span>
      </h2>
      <div className="flex flex-wrap gap-10 justify-center">
        {moreProjects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="relative w-96 h-[28rem] rounded-3xl overflow-hidden shadow-lg bg-white transition-transform hover:scale-105"
          >
            <Image
              src={project.image}
              alt={project.title}
              width={600}
              height={600}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full bg-black/60 p-4">
              <div className="text-2xl font-semibold text-white drop-shadow-md">{project.title}</div>
              <div className="text-sm text-white mt-2 flex gap-2 drop-shadow-md">
                <span>{project.type}</span>
                <span>•</span>
                <span>{project.category}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
} 
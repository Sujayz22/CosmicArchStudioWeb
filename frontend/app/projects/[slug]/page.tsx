import Image from 'next/image';
import { Metadata } from 'next';
import Carousel from '../../../components/ui/carousel';
import MoreProjects from '../../../components/MoreProjects';

const projects = [
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

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug);
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: project.title,
    description: `${project.title} - ${project.type} in ${project.location}`,
  };
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    return <div className="text-center py-20 text-2xl text-gray-500">Project not found.</div>;
  }

  return (
    <main className="min-h-screen bg-neutral-light pb-16 flex flex-col items-center">
      <div className="w-full max-w-6xl">
        {/* Title */}
        <h1 className="mt-32 text-6xl md:text-7xl font-bold mb-8 flex items-center gap-2 text-left">
          <span>{project.title}<span className="text-yellow-400">.</span></span>
        </h1>
        {/* Image */}
        <div className="mb-12">
          <Image
            src={project.image}
            alt={project.title}
            width={1200}
            height={600}
            className="object-cover w-full h-[350px] md:h-[420px] rounded-[2rem]"
          />
        </div>
        {/* Details Box */}
        <div className="bg-[#4b6b4a] rounded-[2rem] p-10 md:p-14 text-white grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-8 text-lg w-full mx-auto">
          <div className="space-y-6">
            <div>
              <div className="text-white/70 text-lg">Client:</div>
              <div className="font-bold text-2xl md:text-2xl leading-tight">{project.client}</div>
            </div>
            <div>
              <div className="text-white/70 text-lg">Location:</div>
              <div className="font-bold text-2xl md:text-2xl leading-tight">{project.location}</div>
            </div>
            <div>
              <div className="text-white/70 text-lg">Services:</div>
              <div className="font-bold text-2xl md:text-2xl leading-tight">{project.services}</div>
            </div>
            <div>
              <div className="text-white/70 text-lg">Duration:</div>
              <div className="font-bold text-2xl md:text-2xl leading-tight">{project.duration}</div>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <div className="text-white/70 text-lg">Theme:</div>
              <div className="font-bold text-2xl md:text-2xl leading-tight">{project.theme}</div>
            </div>
            <div>
              <div className="text-white/70 text-lg">Category:</div>
              <div className="font-bold text-2xl md:text-2xl leading-tight">{project.category}</div>
            </div>
            <div>
              <div className="text-white/70 text-lg">Type:</div>
              <div className="font-bold text-2xl md:text-2xl leading-tight">{project.type}</div>
            </div>
            <div>
              <div className="text-white/70 text-lg">Size:</div>
              <div className="font-bold text-2xl md:text-2xl leading-tight">{project.size}</div>
            </div>
          </div>
        </div>
        {/* Project Description Section */}
        <section className="w-full max-w-5xl mt-12 bg-transparent">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-left">Project Description</h2>
          <p className="text-lg md:text-xl text-gray-800 mb-6">
            The Nivara Villa project was conceived with the client's vision of a modern, minimalist villa that blends seamlessly into its surroundings. The goal was to create a space that feels open and inviting, with an emphasis on contemporary design while also ensuring privacy, functionality, and a sense of tranquility. Every aspect of the exterior design was carefully considered to provide both aesthetic appeal and practical solutions for everyday living. Key features include:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-lg md:text-xl text-gray-800">
            <li><b>Contemporary Design:</b> The house boasts expansive windows, a large door entry, and a spacious car park, all set on a rectangular corner plot.</li>
            <li><b>Large Windows:</b> Expansive windows were added to maximize natural light and provide a connection to the outdoors.</li>
            <li><b>Natural Materials:</b> Cobblestone masonry and wooden accents are incorporated to blend with the surroundings, while fluted composite louvers mimic wood for a modern touch.</li>
            <li><b>Privacy and Functionality:</b> A large stone wall, extending to the roof, provides privacy from the neighboring property, while the secondary car park at the rear adds convenience.</li>
            <li><b>Lighting:</b> Warm lighting is used to create a soft glow, highlighting the design's key features and enhancing the overall ambiance.</li>
          </ul>
        </section>
        {/* Showcase Section */}
        <section className="w-full flex flex-col items-center mt-24">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 flex items-center justify-center gap-2">
            <span>Showcase<span className="text-yellow-400">.</span></span>
            
          </h2>
          <div className="w-full flex justify-center">
            <div className="w-full max-w-6xl">
              <Carousel
                slides={[
                  { title: '', button: '', src: '/img(1).png' },
                  { title: '', button: '', src: '/img(2).png' },
                  { title: '', button: '', src: '/img(3).png' },
                  { title: '', button: '', src: '/img(4).png' },
                ]}
              />
            </div>
          </div>
        </section>
        <MoreProjects />
      </div>
    </main>
  );
} 
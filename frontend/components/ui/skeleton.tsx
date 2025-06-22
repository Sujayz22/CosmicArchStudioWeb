import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

// Project Card Skeleton
export function ProjectCardSkeleton() {
  return (
    <div className="group relative overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="aspect-[4/3] overflow-hidden">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="p-6">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-4" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </div>
    </div>
  )
}

// Gallery Card Skeleton
export function GalleryCardSkeleton() {
  return (
    <div className="relative w-96 h-[28rem] rounded-3xl overflow-hidden shadow-lg bg-white">
      <Skeleton className="h-full w-full" />
      <div className="absolute bottom-0 left-0 w-full bg-black/60 p-4">
        <Skeleton className="h-8 w-3/4 mx-auto" />
      </div>
    </div>
  )
}

// Project Detail Skeleton
export function ProjectDetailSkeleton() {
  return (
    <div className="w-full max-w-6xl">
      {/* Title */}
      <Skeleton className="h-16 w-3/4 mb-8" />
      
      {/* Cover Image */}
      <Skeleton className="w-full h-[450px] md:h-[750px] rounded-[2rem] mb-12" />
      
      {/* Details Box */}
      <div className="bg-[#4b6b4a] rounded-[2rem] p-10 md:p-14 text-white grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-8 w-full mx-auto">
        <div className="space-y-6">
          {[...Array(4)].map((_, i) => (
            <div key={i}>
              <Skeleton className="h-4 w-16 mb-2 bg-white/20" />
              <Skeleton className="h-8 w-3/4 bg-white/30" />
            </div>
          ))}
        </div>
        <div className="space-y-6">
          {[...Array(4)].map((_, i) => (
            <div key={i}>
              <Skeleton className="h-4 w-16 mb-2 bg-white/20" />
              <Skeleton className="h-8 w-3/4 bg-white/30" />
            </div>
          ))}
        </div>
      </div>
      
      {/* Description Section */}
      <section className="w-full max-w-5xl mt-12">
        <Skeleton className="h-10 w-64 mb-6" />
        <Skeleton className="h-6 w-full mb-4" />
        <Skeleton className="h-6 w-5/6 mb-4" />
        <Skeleton className="h-6 w-4/5 mb-6" />
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-6 w-full" />
          ))}
        </div>
      </section>
      
      {/* Review Section */}
      <section className="w-full flex flex-col items-center mt-16">
        <div className="w-full max-w-3xl bg-yellow-200 rounded-lg p-6 md:p-8">
          <Skeleton className="h-6 w-full mb-4" />
          <Skeleton className="h-6 w-5/6 mb-4" />
          <Skeleton className="h-6 w-4/5 mb-4" />
          <div className="flex items-center gap-3 mt-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-6 w-32" />
          </div>
        </div>
      </section>
      
      {/* Showcase Section */}
      <section className="w-full flex flex-col items-center mt-24">
        <Skeleton className="h-12 w-48 mb-8" />
        <Skeleton className="w-full max-w-6xl h-[400px] rounded-2xl" />
      </section>
    </div>
  )
}

// Gallery Detail Skeleton
export function GalleryDetailSkeleton() {
  return (
    <div className="w-full max-w-[1300px] flex flex-col items-start mt-16 mx-auto px-4">
      {/* Title */}
      <Skeleton className="h-16 w-3/4 mb-2" />
      {/* Subtitle */}
      <Skeleton className="h-8 w-1/2 mb-2" />
      {/* Description */}
      <Skeleton className="h-6 w-full mb-8" />
      {/* Main Image */}
      <Skeleton className="w-full h-[300px] md:h-[800px] rounded-2xl mb-4" />
      {/* Thumbnails */}
      <div className="relative w-full max-w-full flex items-center mt-2">
        <div className="flex gap-3 md:gap-4 w-full px-8 md:px-16 py-1">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="w-32 h-22 rounded-lg flex-shrink-0" />
          ))}
        </div>
      </div>
    </div>
  )
}

// Service Card Skeleton
export function ServiceCardSkeleton() {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center gap-4 mb-6">
        <Skeleton className="h-12 w-12 rounded-lg" />
        <Skeleton className="h-8 w-48" />
      </div>
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6 mb-2" />
      <Skeleton className="h-4 w-4/5" />
    </div>
  )
}

// FAQ Skeleton
export function FAQSkeleton() {
  return (
    <div className="bg-[#566c54] rounded-[3rem] p-0 md:p-0 flex flex-col md:flex-row items-stretch overflow-hidden">
      <div className="flex-1 flex flex-col justify-center px-8 py-12 md:py-24 md:pl-16 md:pr-8 text-white">
        <Skeleton className="h-12 w-64 mb-8 bg-white/20" />
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-6 w-full bg-white/20" />
              <Skeleton className="h-4 w-5/6 bg-white/10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// CTA Skeleton
export function CTASkeleton() {
  return (
    <div className="bg-primary rounded-[2.5rem] py-4 mx-4 mb-4 md:mx-14 md:mb-12 md:py-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="space-y-3 bg-muted/55 backdrop-blur-sm rounded-[2rem] p-8 shadow-lg">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-16 bg-white/20" />
                  <Skeleton className="h-6 w-3/4 bg-white/30" />
                </div>
              ))}
              <div className="bg-accent/55 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <Skeleton className="h-8 w-48 mb-4 bg-white/20" />
                <Skeleton className="h-10 w-full bg-white/30" />
              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="bg-white/95 backdrop-blur-sm rounded-[2rem] p-8 shadow-lg">
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-full mb-6" />
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
              <Skeleton className="h-12 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Hero Skeleton
export function HeroSkeleton() {
  return (
    <section className="min-h-screen bg-neutral-light relative">
      <div className="container-custom pt-16 pb-12 sm:pt-25">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 md:space-y-8">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-24 w-full" />
          </div>
          <Skeleton className="h-[500px] md:h-[600px] lg:h-[700px] rounded-2xl" />
        </div>
      </div>
    </section>
  )
}

// Review Card Skeleton
export function ReviewCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <div className="flex items-center gap-4 mb-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="flex-1">
          <Skeleton className="h-5 w-32 mb-1" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6 mb-2" />
      <Skeleton className="h-4 w-4/5" />
    </div>
  )
}

// Stats Skeleton
export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="text-center">
          <Skeleton className="h-12 w-24 mx-auto mb-2" />
          <Skeleton className="h-6 w-32 mx-auto mb-1" />
          <Skeleton className="h-4 w-48 mx-auto" />
        </div>
      ))}
    </div>
  )
}

// Team Member Card Skeleton
export function TeamMemberCardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-3xl shadow-lg group w-full max-w-xs">
      <Skeleton className="w-full aspect-[4/5]" />
      <div className="absolute bottom-4 left-4 right-4 p-0">
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 text-center">
          <Skeleton className="h-6 w-3/4 mx-auto mb-2 bg-white/30" />
          <Skeleton className="h-4 w-1/2 mx-auto bg-white/20" />
        </div>
      </div>
    </div>
  );
}

export { Skeleton } 
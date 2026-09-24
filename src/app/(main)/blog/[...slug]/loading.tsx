
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="bg-[#0b0e0c] min-h-screen">
      {/* Hero Skeleton (Header) */}
      <header className="container mx-auto px-4 pt-32 pb-12 max-w-5xl">
        <div className="flex items-center gap-2 mb-6">
          <Skeleton className="h-4 w-12 bg-[#111512]" />
          <span className="text-white/45">/</span>
          <Skeleton className="h-4 w-24 bg-[#111512]" />
        </div>
        
        <Skeleton className="h-12 md:h-16 w-3/4 mb-8 bg-[#111512] rounded-lg" />
        
        <div className="flex flex-wrap gap-2 mb-6">
          <Skeleton className="h-6 w-20 bg-[#111512] rounded-full" />
          <Skeleton className="h-6 w-24 bg-[#111512] rounded-full" />
        </div>
        
        <div className="flex gap-6 py-6 border-t border-b border-white/9">
           <Skeleton className="h-4 w-32 bg-[#111512]" />
           <Skeleton className="h-4 w-24 bg-[#111512]" />
           <Skeleton className="h-4 w-28 bg-[#111512]" />
        </div>
      </header>

      {/* Main Content Skeleton */}
      <div className="container mx-auto px-4 pb-24 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-8">
            {/* Main Image Skeleton */}
            <Skeleton className="w-full aspect-video mb-12 rounded-lg bg-[#111512]" />
            
            {/* Content Text Skeletons */}
            <div className="space-y-6">
               <Skeleton className="h-6 w-full bg-[#111512]" />
               <Skeleton className="h-6 w-5/6 bg-[#111512]" />
               <Skeleton className="h-6 w-4/6 bg-[#111512]" />
               <Skeleton className="h-6 w-full bg-[#111512]" />
               
               <div className="py-8">
                  <Skeleton className="h-8 w-1/3 mb-4 bg-[#111512]" />
                  <Skeleton className="h-6 w-full bg-[#111512]" />
                  <Skeleton className="h-6 w-full bg-[#111512]" />
               </div>
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-4">
             <div className="sticky top-24 space-y-8">
                <Skeleton className="h-64 w-full bg-[#111512] rounded-lg" />
                <Skeleton className="h-40 w-full bg-[#111512] rounded-lg" />
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}

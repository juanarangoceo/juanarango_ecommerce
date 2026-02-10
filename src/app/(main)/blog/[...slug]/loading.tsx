
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="bg-white dark:bg-zinc-950 min-h-screen">
      {/* Hero Skeleton (Header) */}
      <header className="container mx-auto px-4 pt-32 pb-12 max-w-5xl">
        <div className="flex items-center gap-2 mb-6">
          <Skeleton className="h-4 w-12 bg-zinc-200 dark:bg-zinc-800" />
          <span className="text-zinc-500">/</span>
          <Skeleton className="h-4 w-24 bg-zinc-200 dark:bg-zinc-800" />
        </div>
        
        <Skeleton className="h-12 md:h-16 w-3/4 mb-8 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
        
        <div className="flex flex-wrap gap-2 mb-6">
          <Skeleton className="h-6 w-20 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
          <Skeleton className="h-6 w-24 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
        </div>
        
        <div className="flex gap-6 py-6 border-t border-b border-zinc-100 dark:border-zinc-900">
           <Skeleton className="h-4 w-32 bg-zinc-200 dark:bg-zinc-800" />
           <Skeleton className="h-4 w-24 bg-zinc-200 dark:bg-zinc-800" />
           <Skeleton className="h-4 w-28 bg-zinc-200 dark:bg-zinc-800" />
        </div>
      </header>

      {/* Main Content Skeleton */}
      <div className="container mx-auto px-4 pb-24 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-8">
            {/* Main Image Skeleton */}
            <Skeleton className="w-full aspect-video mb-12 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
            
            {/* Content Text Skeletons */}
            <div className="space-y-6">
               <Skeleton className="h-6 w-full bg-zinc-200 dark:bg-zinc-800" />
               <Skeleton className="h-6 w-5/6 bg-zinc-200 dark:bg-zinc-800" />
               <Skeleton className="h-6 w-4/6 bg-zinc-200 dark:bg-zinc-800" />
               <Skeleton className="h-6 w-full bg-zinc-200 dark:bg-zinc-800" />
               
               <div className="py-8">
                  <Skeleton className="h-8 w-1/3 mb-4 bg-zinc-200 dark:bg-zinc-800" />
                  <Skeleton className="h-6 w-full bg-zinc-200 dark:bg-zinc-800" />
                  <Skeleton className="h-6 w-full bg-zinc-200 dark:bg-zinc-800" />
               </div>
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-4">
             <div className="sticky top-24 space-y-8">
                <Skeleton className="h-64 w-full bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
                <Skeleton className="h-40 w-full bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}

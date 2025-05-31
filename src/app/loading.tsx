import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto py-12 px-6 flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
      <Skeleton className="h-12 w-1/2 mb-4" />
      <Skeleton className="h-8 w-3/4 mb-6" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    </div>
  );
}

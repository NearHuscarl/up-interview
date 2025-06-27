import { Skeleton } from "@shared/ui-base/skeleton";

export function ListItemSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-full" />
    </div>
  );
}

import { GalleryVerticalEnd } from "lucide-react";

export function LocationBanner() {
  return (
    <div className="flex items-center gap-2 self-center font-medium">
      <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
        <GalleryVerticalEnd className="size-4" />
      </div>
      <span className="text-xl">Unifiedpost Group</span>
    </div>
  );
}

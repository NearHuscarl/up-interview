import { Loader2 } from "lucide-react";

const Icons = {
  spinner: Loader2,
};

// https://github.com/shadcn-ui/ui/issues/697#issuecomment-1605883170
export function CircularProgress() {
  return (
    <div className="flex items-center justify-center">
      <Icons.spinner className="h-5 w-5 animate-spin" />
    </div>
  );
}

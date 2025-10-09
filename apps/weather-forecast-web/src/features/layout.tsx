import { Outlet } from "react-router";

export default function AppLayout() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full flex-1 flex-col gap-6 items-center">
        <Outlet />
      </div>
    </div>
  );
}

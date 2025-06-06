import { render } from "@testing-library/react";
import AppLayout from "./layout";

describe("AppLayout", () => {
  it("renders without crashing", () => {
    render(<AppLayout />);
  });

  it("renders outer container with the correct tailwind style", () => {
    const { container } = render(<AppLayout />);
    const outerDiv = container.firstChild as HTMLDivElement;
    expect(outerDiv).toHaveClass(
      "flex",
      "min-h-svh",
      "flex-col",
      "items-center",
      "justify-center",
      "gap-6",
      "bg-muted",
      "p-6",
      "md:p-10",
    );
  });

  it("renders inner container with the correct tailwind style", () => {
    const { container } = render(<AppLayout />);
    const innerDiv = container.firstChild?.firstChild as HTMLDivElement;
    expect(innerDiv).toHaveClass("flex", "w-full", "flex-1", "flex-col", "gap-6", "items-center");
  });
});

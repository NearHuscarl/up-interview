export function stringifyError(error: unknown, verbose = false): string {
  if (error instanceof Error) {
    if (verbose) {
      return `${error.name}: ${error.message}\nStack: ${error.stack || "No stack trace available"}`;
    }
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  return "An unknown error occurred";
}

export function handleError(err: unknown) {
  const errorMessage = err instanceof Error ? err.message : "Unknown Error";
  alert("Error: " + errorMessage);
}

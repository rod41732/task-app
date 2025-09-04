export function handleError(
  err: unknown,
  errMessageBuilder: (msg: string) => string
) {
  const errorMessage = err instanceof Error ? err.message : "Unknown Error";
  console.error("Error", err);
  alert(errMessageBuilder(errorMessage));
}

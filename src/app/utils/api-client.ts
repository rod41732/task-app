import { BackendApp } from "@/backend";
import { edenFetch } from "@elysiajs/eden";

// passthrough API using next.js to avoid CORS
export const apiClient = edenFetch<BackendApp>(
  "http://localhost:3000/api/backend"
);

export const wrappedClient: typeof apiClient = (...args) => apiClient(...args);

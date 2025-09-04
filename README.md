# Task app

## Stack

- Frontend: Next.js, TailwindCSS
- Backend: Elysia
- Testing: Vite + Vitest

DB is in-memory

## Runing

- Frontend: Next.js `npm run dev`, listing on port 3000
- Backend: Elysia: `npm run backend:dev`, listening on port 3001
- Test: `npx vitest`

## Implemented

- Task CRUD API (list, create, delete, toggle, update title)
- Frontend: React (Next.js/Tailwind CSS),
  - Typesafety with Typescrpit and Elysia's EdenFetch
- Loading Status (loading task list and action)

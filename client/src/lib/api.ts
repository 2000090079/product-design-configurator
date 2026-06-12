const BASE = import.meta.env.VITE_API_URL ?? ''

export const api = {
  post: (path: string, body: unknown) =>
    fetch(`${BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }),
  get: (path: string) => fetch(`${BASE}${path}`),
}

export const config = {
  apiBaseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  appEnv: import.meta.env.MODE, // "development" | "production" | "test"
  debug: import.meta.env.VITE_DEBUG === 'true',
};
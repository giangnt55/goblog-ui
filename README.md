# GoBlog-UI

A **React + Vite + TypeScript** frontend project with Material-UI, React Query, and feature-based architecture.

---

## 🚀 Tech Stack
- [Vite](https://vitejs.dev/) – Fast dev server & build tool
- [React](https://react.dev/) – UI library
- [TypeScript](https://www.typescriptlang.org/) – Static typing
- [React Router](https://reactrouter.com/) – Client-side routing
- [React Query](https://tanstack.com/query) – Data fetching & caching
- [Material UI (MUI)](https://mui.com/) – UI components & theming

---

## 📂 Project Structure
```
├── 📁 .git/ 🚫 (auto-hidden)
├── 📁 node_modules/ 🚫 (auto-hidden)
├── 📁 public/
│ └── 🖼️ vite.svg
├── 📁 src/
│ ├── 📁 app/ # App-level configs (routes, providers, etc.)
│ │ └── 📄 routes.tsx
│ ├── 📁 assets/ # Static assets (images, icons, etc.)
│ │ └── 🖼️ react.svg
│ ├── 📁 components/ # Reusable UI & layout components
│ │ ├── 📁 layout/
│ │ │ └── 📄 ThemeProvider.tsx
│ │ └── 📁 ui/
│ ├── 📁 features/ # Feature-based modules
│ │ └── 📁 auth/
│ │ ├── 📄 LoginPage.tsx
│ │ ├── 📄 api.ts
│ │ ├── 📄 hooks.ts
│ │ └── 📄 types.ts
│ ├── 📁 hooks/ # Global reusable hooks
│ │ └── 📄 .keep
│ ├── 📁 lib/ # Core libraries & configs
│ │ ├── 📁 api/
│ │ │ ├── 📄 client.ts
│ │ │ ├── 📄 endpoints.ts
│ │ │ └── 📄 types.ts
│ │ ├── 📄 config.ts
│ │ ├── 📄 queryClient.ts
│ │ └── 📄 storage.ts
│ ├── 📁 styles/ # Global theme & styling
│ │ └── 📄 theme.ts
│ ├── 📁 types/ # Shared TypeScript types
│ │ └── 📄 .keep
│ ├── 📁 utils/ # Utility functions
│ │ └── 📄 .keep
│ ├── 📄 main.tsx # App entry point
│ └── 📄 vite-env.d.ts
├── 🔒 .env 🚫 (auto-hidden) # Environment variables (not committed)
├── 📄 .env.example # Example env file for setup
├── 🚫 .gitignore
├── 📖 README.md
├── 📄 eslint.config.js
├── 🌐 index.html
├── 📄 package-lock.json
├── 📄 package.json
├── 📄 tsconfig.app.json
├── 📄 tsconfig.json
├── 📄 tsconfig.node.json
└── 📄 vite.config.ts
```
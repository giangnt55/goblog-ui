├─ .env # env defaults (never commit secrets)
├─ .env.example # document required env vars
├─ .editorconfig
├─ .eslintrc.cjs
├─ .prettierrc
├─ index.html
├─ package.json
├─ tsconfig.json
├─ vite.config.ts
└─ src/
├─ app/
│ ├─ App.tsx
│ ├─ routes.tsx
│ └─ providers.tsx
├─ components/ # shared/presentational components
│ ├─ ErrorBoundary.tsx
│ └─ Spinner.tsx
├─ features/ # vertical slices (per domain)
│ ├─ auth/
│ │ ├─ api.ts
│ │ ├─ hooks.ts
│ │ ├─ LoginPage.tsx
│ │ └─ types.ts
│ └─ users/
│ ├─ api.ts
│ ├─ hooks.ts
│ ├─ UsersPage.tsx
│ └─ types.ts
├─ hooks/
│ └─ useDebouncedValue.ts
├─ lib/
│ ├─ api/
│ │ ├─ client.ts # fetch wrapper + interceptors
│ │ ├─ http.ts # low-level HTTP helpers
│ │ ├─ endpoints.ts # API paths in one place
│ │ └─ types.ts # ApiError, Result, etc.
│ ├─ config.ts # env + runtime config
│ ├─ logger.ts # tiny logger abstraction
│ ├─ storage.ts # localStorage/sessionStorage helpers + JWT refresh
│ └─ time.ts # time utilities / ISO helpers
├─ styles/
│ └─ globals.css
├─ types/
│ └─ global.d.ts
├─ utils/
│ ├─ assert.ts
│ ├─ cn.ts # className merge
│ ├─ debounce.ts
│ ├─ invariant.ts
│ └─ retry.ts
└─ main.tsx
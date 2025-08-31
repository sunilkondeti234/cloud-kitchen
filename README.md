# Cloud Kitchen Starter (Vite + React + Tailwind v4 + Firebase placeholder + Razorpay)

## 1) Run locally
```bash
npm install
npm run dev
```
Open http://localhost:5173

## 2) Deploy to Vercel
- Framework preset: **Vite**
- Build command: `npm run build`
- Output dir: `dist`

## 3) Environment
Create `.env` with your keys (optional during local dev):
```
VITE_RAZORPAY_KEY=rzp_test_dkpg62pL0Kb6vs

VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

## Notes
- Tailwind v4 is already configured via `@tailwindcss/postcss` (see `postcss.config.js`).
- Entry file is `/src/main.jsx` — matches `index.html`.
- A few sample items are shown on the homepage so you can verify UI immediately.

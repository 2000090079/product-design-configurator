# Product Design Configurator

A real-time product customization tool for footwear, tops, and bottoms. Configure color, material, and product type with an instant live preview, save your design to the database, and share it with anyone via a unique URL.

---

## Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | React 18, TypeScript, Tailwind CSS, Vite |
| Backend   | Node.js, Express, TypeScript      |
| Database  | MongoDB (Mongoose)                |
| Storage   | AWS S3 (image uploads)            |
| Testing   | Jest, React Testing Library       |

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/product-design-configurator.git
cd product-design-configurator
```

### 2. Install dependencies

```bash
npm run install:all
```

### 3. Set environment variables

Copy the example file and fill in your values:

```bash
cp server/.env.example server/.env
```

Edit `server/.env`:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/design-configurator
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=us-east-1
S3_BUCKET_NAME=your-bucket-name
```

### 4. Run the app

In two separate terminals:

```bash
# Terminal 1 — API server
npm run dev:server

# Terminal 2 — Vite dev server
npm run dev:client
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Features

- Choose between three product categories: Footwear, Tops, and Bottoms
- Pick from 8 curated colorways with real-time SVG preview
- Select from 5 materials, each with a short description
- Name your design (up to 60 characters)
- Save to MongoDB and get a shareable link instantly
- Shareable link renders a read-only view of the saved configuration
- Image upload to S3 via `/api/uploads` (optional, for custom thumbnails)
- Fully accessible — ARIA roles, `aria-pressed`, `aria-selected`, `role="alert"`

---

## Folder Structure

```
product-design-configurator/
├── client/
│   ├── src/
│   │   ├── __mocks__/       # Jest style mock
│   │   ├── __tests__/       # Component tests
│   │   ├── components/      # UI components
│   │   ├── data/            # Static color/material options
│   │   ├── hooks/           # useConfigurator hook
│   │   ├── pages/           # ConfiguratorPage, SharedConfigPage
│   │   └── types/           # Shared TypeScript types
│   ├── index.html
│   ├── jest.config.ts
│   ├── tailwind.config.js
│   └── vite.config.ts
├── server/
│   ├── src/
│   │   ├── models/          # Mongoose Configuration model
│   │   └── routes/          # configurations.ts, uploads.ts
│   ├── .env.example
│   └── tsconfig.json
└── package.json
```

---

## Testing

```bash
npm test
```

Runs Jest with `@testing-library/react`. Tests cover:

- `ColorPicker` — renders options, aria-selected state, onChange firing
- `ProductTypeSelector` — renders all types, aria-pressed, onChange
- `MaterialSelector` — renders all materials, onChange on click

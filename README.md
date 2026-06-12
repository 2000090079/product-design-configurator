# 🎨 Product Design Configurator

<div align="center">

![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![AWS S3](https://img.shields.io/badge/AWS_S3-FF9900?style=for-the-badge&logo=amazons3&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)

**A real-time product customization tool — configure color, material, and product type with an instant live preview. Save your design and share it with anyone via a unique URL.**

[🚀 Live Demo](https://pdc-client-xxxx.onrender.com) · [📦 API](https://pdc-server-s19t.onrender.com/api/health) · [🐛 Report Bug](https://github.com/2000090079/product-design-configurator/issues)

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🖼️ **Live Preview** | SVG product shape updates instantly as you configure |
| 🎨 **Color Picker** | 8 curated colorways with accessible ring selection |
| 🧵 **Material Selector** | 5 materials — Flyknit, Leather, Mesh, Canvas, Recycled Poly |
| 👟 **Product Types** | Footwear, Tops, and Bottoms |
| 💾 **Save & Share** | Saves to MongoDB, generates a unique shareable URL |
| ♿ **Accessible** | Full ARIA roles, keyboard nav, focus-visible rings |
| 📱 **Responsive** | Stacked on mobile, side-by-side on desktop |

---

## 🖥️ UI Overview

```
┌─────────────────────────────────────────────────────┐
│  Design Studio                     Real-time preview │
├──────────────────────┬──────────────────────────────┤
│                      │                              │
│  Design Name         │                              │
│  ┌──────────────┐    │         👟                   │
│  │ My Design    │    │    [SVG Preview]             │
│  └──────────────┘    │                              │
│                      │    ● Chalk White             │
│  Product Category    │    ● Flyknit                 │
│  [Footwear][Top]     │                              │
│  [Bottoms]           │                              │
│                      │                              │
│  Color               │                              │
│  ⬤ ⬤ ⬤ ⬤ ⬤ ⬤ ⬤ ⬤   │                              │
│                      │                              │
│  Material            │                              │
│  ▶ Flyknit           │                              │
│    Leather           │                              │
│    Mesh              │                              │
│                      │                              │
│  [Save & Get Link]   │                              │
│                      │                              │
│  🔗 your-link-here   │                              │
└──────────────────────┴──────────────────────────────┘
```

---

## 🗂️ Project Structure

```
product-design-configurator/
├── client/                        # React + TypeScript + Vite
│   └── src/
│       ├── components/
│       │   ├── ColorPicker.tsx        # 8-color accessible picker
│       │   ├── MaterialSelector.tsx   # Material option list
│       │   ├── ProductPreview.tsx     # Live SVG preview
│       │   ├── ProductTypeSelector.tsx
│       │   ├── ConfigNameInput.tsx
│       │   └── SharePanel.tsx         # Copy-to-clipboard share link
│       ├── hooks/
│       │   └── useConfigurator.ts     # All config state + save logic
│       ├── pages/
│       │   ├── ConfiguratorPage.tsx   # Main configurator view
│       │   └── SharedConfigPage.tsx   # Read-only shared design view
│       ├── lib/
│       │   └── api.ts                 # Env-aware fetch wrapper
│       ├── data/options.ts            # Colors, materials, product types
│       └── types/index.ts             # Shared TS interfaces
│
├── server/                        # Node.js + Express + TypeScript
│   └── src/
│       ├── models/
│       │   └── Configuration.ts       # Mongoose schema
│       ├── routes/
│       │   ├── configurations.ts      # POST /save, GET /share/:id
│       │   └── uploads.ts             # POST /upload → AWS S3
│       └── index.ts                   # App entry, MongoDB connect
│
├── render.yaml                    # Render deploy config
└── package.json                   # Root scripts
```

---

## ⚙️ Tech Stack

### Frontend
- **React 18** — component-based UI with hooks
- **TypeScript** — strict typing across all components
- **Tailwind CSS** — utility-first responsive styling
- **Vite** — lightning-fast dev server and build tool
- **React Router v6** — client-side routing for share links

### Backend
- **Node.js + Express** — REST API server
- **TypeScript** — typed routes, models, middleware
- **Mongoose** — MongoDB ODM with schema validation
- **nanoid** — generates unique 10-char share IDs
- **Multer + AWS S3** — multipart image upload pipeline

### Testing
- **Jest** — unit test runner
- **React Testing Library** — component behavior tests
- **@testing-library/jest-dom** — custom DOM matchers

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- AWS S3 bucket (optional — only for image uploads)

### 1. Clone

```bash
git clone https://github.com/2000090079/product-design-configurator.git
cd product-design-configurator
```

### 2. Install all dependencies

```bash
npm run install:all
```

### 3. Configure environment

```bash
cp server/.env.example server/.env
```

Open `server/.env` and fill in:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/design-configurator

# Optional — only needed for /api/uploads
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_REGION=us-east-1
S3_BUCKET_NAME=your-bucket
```

### 4. Start dev servers

```bash
# Terminal 1 — backend
npm run dev:server

# Terminal 2 — frontend
npm run dev:client
```

Open **http://localhost:5173**

---

## 🧪 Testing

```bash
npm test
```

| Test File | Coverage |
|---|---|
| `ColorPicker.test.tsx` | Renders all colors, aria-selected, onChange |
| `ProductTypeSelector.test.tsx` | All types render, aria-pressed, onChange |
| `MaterialSelector.test.tsx` | All materials render, onChange on click |

---

## 🌐 API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/configurations` | Save config → returns `shareId` |
| `GET` | `/api/configurations/share/:shareId` | Fetch saved config by share ID |
| `POST` | `/api/uploads` | Upload image to S3 → returns URL |
| `GET` | `/api/health` | Health check |

### Example — Save a configuration

```bash
curl -X POST https://pdc-server-s19t.onrender.com/api/configurations \
  -H "Content-Type: application/json" \
  -d '{
    "productType": "shoe",
    "colorId": "velocity-red",
    "materialId": "flyknit",
    "name": "Summer Runner Pro"
  }'
```

**Response:**
```json
{
  "shareId": "aB3xKp92Lm",
  "_id": "..."
}
```

---

## ☁️ Deployment

Deployed on **Render** using `render.yaml`:

- **Frontend** (Static Site) — auto-deploys on push to `main`
- **Backend** (Web Service) — Node.js, connects to MongoDB Atlas

| Service | URL |
|---|---|
| Frontend | https://pdc-client-xxxx.onrender.com |
| Backend | https://pdc-server-s19t.onrender.com |

---

<div align="center">
  <sub>Built with React, TypeScript, and a lot of ☕</sub>
</div>

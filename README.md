# GATE it — GATE CSE Preparation Platform

A **brutally minimal, high-velocity** web app for GATE Computer Science aspirants. Built with React 19, TypeScript 6, Vite 8, and Tailwind CSS v4.

---

## Features

### 📚 Learn Hub
Subject-wise syllabus breakdown with curated resource links (playlists, one-shot revisions, handwritten notes). Navigate by subject and jump directly to relevant study materials.

### 🧠 PYQ Intelligence (2007–2026)
Complete year-and-shift-wise question paper browser with **real GATE CSE questions** for:

| Years | Status |
|-------|--------|
| 2022 | ✅ Full paper (65 questions) |
| 2023 | ✅ Full paper (64 questions) |
| 2024 | ✅ Both shifts (138 questions) |
| 2025 | ✅ Both shifts (132 questions) |
| 2026 | ✅ Shift 2 (50 questions) |
| 2007–2021, 2026 Shift 1 | 📦 Placeholder files — add your own |

Each question supports:
- **Multiple Choice** (A/B/C/D with answer highlighting)
- **Integer / Numeric** type answers
- Subject filter chips (GA, EM, DSA, ALGO, OS, DBMS, CN, TOC, CD)
- Expand/collapse with correct answer reveal

### ⏱ Quick Test
Timed subject-wise quizzes using real GATE 2026 questions. Pick a subject, set your pace, and get instant scoring with percentile feedback.

### 🗺 Roadmap
Level-based preparation roadmap (Foundation → Core → Advanced) with monthly battle plans for GATE 2027 (5-month sprint) and GATE 2028 (18-month comprehensive), complete with video timestamps and prerequisite tracking.

### 📦 Resources
Curated collection of study materials, quick links, and peer-reviewed papers organized by subject and category.

### 💬 Community Board
A MongoDB-backed discussion board for sharing issues, problems, new implementations, and suggestions. Includes automatic IP ban for off-topic content.

### 🎯 Countdown Overlay
First-visit countdown timer to GATE 2027 (Feb 6, 2027) with a fullscreen loading animation.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 |
| Language | TypeScript 6 (strict mode) |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |
| Routing | React Router DOM v7 |
| Backend | Express 4 (community chat) |
| Database | MongoDB + Mongoose 8 |
| Proxy | Vite dev server → Express (port 3001) |

---

## Project Structure

```
Gateit/
├── public/
├── server/                    ← Express backend (community chat)
│   ├── models/
│   │   ├── Message.js         ← Message schema (author, category, content, IP)
│   │   └── Ban.js             ← IP ban schema
│   ├── routes/
│   │   └── community.js       ← CRUD + content filter + ban logic
│   ├── index.js               ← Express entry point
│   └── package.json
├── src/
│   ├── components/            ← 16 React components
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx
│   │   ├── PYQPage.tsx
│   │   ├── QuickTestPage.tsx
│   │   ├── CommunityPage.tsx
│   │   ├── RoadmapPage.tsx
│   │   └── ...
│   ├── data/                  ← All content in JSON
│   │   ├── hero.json
│   │   ├── subjects.json
│   │   ├── pyqs.json          ← Topic-based PYQ cards
│   │   ├── pyqs/              ← Year-wise full papers
│   │   │   ├── 2007/cs.json
│   │   │   ├── ...
│   │   │   ├── 2024/shift1.json
│   │   │   ├── 2024/shift2.json
│   │   │   ├── 2025/shift1.json
│   │   │   ├── 2025/shift2.json
│   │   │   ├── 2026/shift1.json
│   │   │   ├── 2026/shift2.json
│   │   │   └── index.ts       ← Auto-generated manifest
│   │   ├── questions/         ← QuickTest subject question banks
│   │   ├── roadmaps.json
│   │   └── ...
│   ├── index.css              ← Tailwind entry
│   ├── App.tsx                ← Router + layout
│   └── main.tsx
├── vite.config.ts             ← Tailwind plugin + API proxy
├── package.json
└── README.md
```

---

## Getting Started

### Prerequisites
- Node.js ≥ 20
- npm ≥ 10
- MongoDB (only if running the community chat backend)

### Installation

```bash
# Clone the repo
cd Gateit

# Install frontend dependencies
npm install

# Install server dependencies
cd server && npm install && cd ..

# Start both frontend + backend
npm run dev:all

# Or start individually:
# Terminal 1: npm run dev          (frontend on :5173)
# Terminal 2: npm run dev:server   (backend on :3001)
```

### Environment

Create `server/.env`:

```
MONGODB_URI=mongodb://localhost:27017/gateit-community
PORT=3001
```

---

## Adding PYQ Data

Each year paper follows this schema:

```json
[
  {
    "id": "unique-string",
    "questionNumber": 1,
    "section": "OS",
    "text": "Question text here...",
    "type": "Multiple Choice",
    "options": { "A": "Option A", "B": "Option B", "C": "Option C", "D": "Option D" },
    "correctAnswer": "A"
  }
]
```

For Integer type questions:

```json
{
  "id": "unique-string",
  "questionNumber": 10,
  "section": "DSA",
  "text": "What is the time complexity of...?",
  "type": "Integer",
  "options": {},
  "correctAnswer": "42"
}
```

Place them in `src/data/pyqs/{year}/{shift}.json` and rebuild.

---

## Scripts

| Command | Action |
|---------|--------|
| `npm run dev` | Start Vite dev server |
| `npm run dev:server` | Start Express backend |
| `npm run dev:all` | Start both concurrently |
| `npm run build` | TypeScript check + production build |
| `npm run preview` | Preview production build |

---

## Content Architecture

All content is JSON-driven — zero hardcoded strings in components:

- **`navbar.json`** — Navigation items and labels
- **`hero.json`** — Hero section copy and CTAs
- **`subjects.json`** — Subject names, icons, syllabus, targets
- **`resources.json`** — Study materials categorized by type
- **`pyqs.json`** — Topic-based featured PYQ cards
- **`pyqs/*.json`** — Year/shift full paper question banks
- **`questions/*.json`** — QuickTest subject question banks
- **`roadmaps.json`** — Level-based preparation plans with timelines
- **`footer.json`** — Footer sections and links
- **`stats.json`** — Homepage statistics counters
- **`testimonials.json`** — User testimonials
- **`marquee.json`** — Scrolling marquee text
- **`problemSolution.json`** — Problem/solution section copy

---

## License

MIT

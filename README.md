<div align="center">
  <br>
  <h1>⚡ GATE&nbsp;it ⚡</h1>
  <p><strong>THE DIRECT-TO-RESULT INTERFACE FOR GATE CSE DOMINANCE</strong></p>
  <br>
  <p>
    <img alt="React" src="https://img.shields.io/badge/React_19-222222?logo=react&logoColor=61DAFB">
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript_6-3178C6?logo=typescript&logoColor=white">
    <img alt="Vite" src="https://img.shields.io/badge/Vite_8-646CFF?logo=vite&logoColor=white">
    <img alt="Tailwind" src="https://img.shields.io/badge/Tailwind_v4-06B6D4?logo=tailwindcss&logoColor=white">
    <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white">
    <img alt="Express" src="https://img.shields.io/badge/Express_4-000000?logo=express&logoColor=white">
  </p>
  <br>
</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [PYQ Data](#-pyq-data)
- [API Reference](#-api-reference)
- [Scripts](#-scripts)
- [Content Architecture](#-content-architecture)
- [Contributing](#-contributing)

---

## 🔭 Overview

**GATE it** is a brutally minimal, high-velocity web platform purpose-built for **GATE Computer Science & Information Technology** aspirants. Every interface is optimized for one goal — maximum knowledge density per second.

Unlike generic study platforms, GATE it treats preparation as a **sprint** rather than a marathon. The entire UX is designed around speed: instant navigation, zero-bloat UI, keyboard-first interactions, and content that loads before you click.

---

## ✨ Features

### 📚 Learn Hub
Subject-wise syllabus breakdown with intelligence assets — **Full Course Playlists**, **One Shot Revisions**, and **Short Handwritten Notes**. Navigate 8 CS subjects (DSA, OS, DBMS, CN, TOC, CD, COA, EM) with instant switching and zero page reloads.

### 🧠 PYQ Intelligence — 2007 to 2026
A complete year-and-shift browser matching the actual GATE CSE examination pattern:

| Years | Shift Pattern | Questions |
|-------|---------------|-----------|
| 2007–2013 | Single shift | Placeholder |
| 2014–2015 | **Triple shift** (3 sessions) | Placeholder |
| 2016–2017, 2021 | Double shift | Placeholder |
| 2018–2020, 2022–2023 | Single shift | **2022 (65), 2023 (64)** |
| 2024–2026 | Double shift | **2024 S1 (69) + S2 (69), 2025 S1 (65) + S2 (67), 2026 S2 (50)** |

Each question supports **Multiple Choice** (with highlighted correct answer) and **Integer/Numeric** input types. Filter by subject (GA, EM, DSA, ALGO, OS, DBMS, CN, TOC, CD) within any paper.

### ⏱ Quick Test Engine
Timed subject-wise quizzes using the **real GATE 2026 question bank**. Three-phase flow:
1. **Setup** — pick subject, number of questions, difficulty
2. **Test** — countdown timer, MCQ option pads, integer input
3. **Results** — instant score, accuracy %, percentile, question-by-question review with correct answers

### 🗺️ Level-Based Roadmaps
Two preparation plans powered by a structured dependency graph:

```
LEVEL 1 (Foundation)          LEVEL 2 (Core)              LEVEL 3 (Advanced)
┌─────────────────────┐      ┌─────────────────────┐      ┌─────────────────────┐
│ General Aptitude    │      │ Data Structures     │      │ Operating Systems   │
│ Engineering Maths   │ ──▶  │ Algorithms (DSA)    │ ──▶  │ DBMS                │
│ Discrete Maths      │      │ TOC                 │      │ Compiler Design     │
│ C Programming       │      │ COA                 │      │ Computer Networks   │
│ Digital Logic       │      └─────────────────────┘      └─────────────────────┘
└─────────────────────┘
```

- **GATE 2027 Sprint** (June–Nov 2026): 5-month, month-by-month battle plan
- **GATE 2028 Comprehensive** (June 2026–Nov 2027): 18-month deep dive with mastery phase

### 💬 Community Board
A MongoDB-backed discussion forum with strict content governance:
- **4 allowed categories**: Issue, Problem, New Implementation, Suggestion
- **Auto IP ban** on off-topic content (gaming, social, entertainment keywords)
- Soft-delete for any message
- Express API with Mongoose schemas

### 🎯 GATE 2027 Countdown
First-visit fullscreen overlay with **live countdown timer** (days/hours/minutes/seconds). Dismisses once per browser via `localStorage`. Persistent countdown widget embedded in hero section below CTAs.

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **UI Framework** | React 19 | Component architecture |
| **Language** | TypeScript 6 (strict: `noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax`) | Type safety |
| **Build** | Vite 8 | Sub-second HMR, optimized chunks |
| **Styling** | Tailwind CSS v4 + `@tailwindcss/vite` plugin | Utility-first CSS |
| **Icons** | Lucide React | Consistent icon system |
| **Routing** | React Router DOM v7 | URL-based navigation |
| **Backend** | Express 4 | Community chat API |
| **Database** | MongoDB + Mongoose 8 | Message + ban persistence |
| **Proxy** | Vite dev server → Express (3001) | Seamless dev experience |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Browser (React 19 SPA)                    │
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────────┐ │
│  │  Navbar  │  │  Routes  │  │  Pages   │  │  Footer    │ │
│  └──────────┘  └──────────┘  └──────────┘  └────────────┘ │
│       │              │              │                       │
│       │         ┌────┴────┐         │                       │
│       │         │ JSON    │         │                       │
│       │         │ Data    │         │                       │
│       │         └─────────┘         │                       │
└───────┼─────────────────────────────┼───────────────────────┘
        │                             │
        │  Vite Dev Proxy (/api/*)    │
        │                             │
┌───────┴─────────────────────────────┴───────────────────────┐
│                    Express Server (:3001)                     │
│                                                             │
│  ┌─────────────────────┐    ┌────────────────────────────┐  │
│  │  community.js       │    │  MongoDB                   │  │
│  │  (GET/POST/DELETE)  │───▶│  ├─ Message (author,       │  │
│  │  + content filter   │    │  │   category, content,    │  │
│  │  + IP ban logic     │    │  │   ip, deleted)          │  │
│  └─────────────────────┘    │  └─ Ban (ip, reason)       │  │
│                             └────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

**Data flow:**
1. All static content lives in `src/data/*.json` — zero hardcoded strings
2. `src/data/pyqs/index.ts` acts as a manifest, auto-importing all year files
3. Question banks for Quick Test are dynamically imported via `await import()` per subject
4. Community API calls are proxied through Vite dev server in development

---

## 🚀 Getting Started

### Prerequisites

```bash
node >= 20
npm  >= 10
# MongoDB only needed if running the community backend
```

### Installation

```bash
# 1. Clone and enter
cd Gateit

# 2. Install frontend
npm install

# 3. Install server
cd server && npm install && cd ..

# 4. Configure MongoDB (optional)
#    Edit server/.env:
#    MONGODB_URI=mongodb://localhost:27017/gateit-community
#    PORT=3001

# 5. Run everything
npm run dev:all

# Or run separately:
# Terminal 1: npm run dev          → http://localhost:5173
# Terminal 2: npm run dev:server   → http://localhost:3001
```

### Quick Build

```bash
npm run build     # tsc -b + vite build → outputs to dist/
npm run preview   # Preview the production build
```

---

## 📁 Project Structure

```
Gateit/
├── public/
├── server/                          ← Express backend
│   ├── models/
│   │   ├── Message.js               ← Schema: author, category, content, ip, deleted
│   │   └── Ban.js                   ← Schema: ip (unique), reason
│   ├── routes/
│   │   └── community.js             ← CRUD + content filter
│   ├── index.js                     ← Express app + MongoDB connection
│   ├── .env                         ← MONGODB_URI, PORT
│   └── package.json
├── src/
│   ├── components/                  ← 16 React components
│   │   ├── Navbar.tsx               ← Responsive nav with mobile drawer
│   │   ├── HeroSection.tsx          ← GATE 2027 countdown + CTAs
│   │   ├── PYQPage.tsx              ← Full paper browser with shift/ subject filters
│   │   ├── QuickTestPage.tsx        ← Timed subject quiz engine
│   │   ├── CommunityPage.tsx        ← Categorized message board
│   │   ├── RoadmapPage.tsx          ← Level-based prep plans
│   │   ├── LearnPage.tsx            ← Subject syllabus + resources
│   │   ├── ResourcesPage.tsx        ← Material library
│   │   ├── StudyLab.tsx             ← Lab workspace
│   │   ├── JoinPage.tsx             ← Sprint signup
│   │   ├── HomeStats.tsx            ← Stats counters
│   │   ├── SubjectsGrid.tsx         ← Curriculum grid
│   │   ├── ProblemSolution.tsx      ← Problem/solution section
│   │   ├── KineticMarquee.tsx       ← Scrolling text
│   │   ├── Footer.tsx               ← Site footer
│   │   └── StyleBlock.tsx           ← Global styles
│   ├── data/
│   │   ├── pyqs/                    ← Year-/shift-wise paper JSONs
│   │   │   ├── index.ts             ← Auto-generated manifest
│   │   │   ├── 2007/cs.json
│   │   │   ├── ...
│   │   │   ├── 2024/shift1.json
│   │   │   ├── 2024/shift2.json
│   │   │   ├── 2025/shift1.json
│   │   │   ├── 2025/shift2.json
│   │   │   ├── 2026/shift1.json
│   │   │   └── 2026/shift2.json
│   │   ├── questions/               ← QuickTest question banks
│   │   │   ├── ga.json
│   │   │   ├── em.json
│   │   │   ├── dsa.json
│   │   │   ├── algo.json
│   │   │   ├── os.json
│   │   │   ├── dbms.json
│   │   │   ├── cn.json
│   │   │   ├── toc.json
│   │   │   └── cd.json
│   │   ├── navbar.json
│   │   ├── hero.json
│   │   ├── subjects.json
│   │   ├── resources.json
│   │   ├── pyqs.json                ← Topic-based PYQ cards
│   │   ├── roadmaps.json
│   │   ├── footer.json
│   │   ├── stats.json
│   │   ├── testimonials.json
│   │   ├── marquee.json
│   │   ├── problemSolution.json
│   │   └── questionSubjects.json
│   ├── App.tsx                      ← BrowserRouter + layout
│   ├── main.tsx                     ← Entry point
│   └── index.css                    ← @import "tailwindcss"
├── vite.config.ts                   ← Tailwind plugin + API proxy
├── tsconfig.json                    ← Strict TypeScript config
├── package.json
└── README.md
```

---

## 📊 PYQ Data

### Question Schema

Each year/shift JSON file contains an array of question objects:

```json
[
  {
    "id": "S2OS42",
    "questionNumber": 42,
    "section": "OS",
    "text": "A system uses demand-paged virtual memory...",
    "type": "Multiple Choice",
    "options": {
      "A": "3 page faults",
      "B": "4 page faults",
      "C": "5 page faults",
      "D": "6 page faults"
    },
    "correctAnswer": "C"
  }
]
```

**Integer type** (omit options, provide numeric `correctAnswer`):

```json
{
  "id": "S2DSA31",
  "questionNumber": 31,
  "section": "DSA",
  "text": "What is the minimum number of nodes in an AVL tree of height 5?",
  "type": "Integer",
  "options": {},
  "correctAnswer": "20"
}
```

### Adding a New Paper

1. Create the year folder: `src/data/pyqs/2027/`
2. Create shift JSONs: `shift1.json`, `shift2.json`, etc.
3. Add imports in `src/data/pyqs/index.ts` (or re-run the generation script)
4. Rebuild: `npm run build`

---

## 🌐 API Reference

Base URL (development): `http://localhost:3001/api/community`

| Method | Endpoint | Description | Status Codes |
|--------|----------|-------------|-------------|
| `GET` | `/messages` | Fetch latest 100 messages | `200` |
| `POST` | `/messages` | Create a message | `201`, `400`, `403` |
| `DELETE` | `/messages/:id` | Soft-delete a message | `200`, `404` |

### POST `/messages`

```json
{
  "author": "username (max 30 chars)",
  "category": "issue | problem | new-implementation | suggestion",
  "content": "message text (max 2000 chars)"
}
```

**403 responses:**
- IP is already banned
- Content matches off-topic patterns → auto-ban + reject

### Content Filter Patterns

Auto-banned keywords: greeting messages (`hello`, `hey`), games/gaming, social/entertainment, shopping/market, dating/relationships.

---

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server (`:5173`) |
| `npm run dev:server` | Start Express backend (`:3001`) |
| `npm run dev:all` | Start both concurrently |
| `npm run build` | `tsc -b && vite build` |
| `npm run preview` | Serve production build locally |
| `npm run lint` | ESLint check |

---

## 📦 Content Architecture

| File | Type | Purpose |
|------|------|---------|
| `navbar.json` | `Array<{id, label}>` | Navigation items |
| `hero.json` | `{badge, headline, subheadline, ctaPrimary, ctaSecondary}` | Hero section copy |
| `subjects.json` | `Array<{id, name, icon, targets, syllabus}>` | 8 CS subjects |
| `resources.json` | `{categories, materials, quickLinks, peerPapers}` | Study materials library |
| `pyqs.json` | `Array<{id, subject, year, difficulty, title, snippet, driveUrl}>` | Topic-based PYQ cards |
| `pyqs/{year}/*.json` | `Array<Question>` | Full paper question banks |
| `questions/*.json` | `Array<Question>` | QuickTest subject banks |
| `roadmaps.json` | `{gate-2027, gate-2028}` | Level-based plans + timelines |
| `footer.json` | `{brand, tagline, sections}` | Footer links and copyright |
| `stats.json` | `Array<{value, label}>` | Homepage stat counters |
| `testimonials.json` | `Array<{name, text, year, rank}>` | User testimonials |
| `marquee.json` | `{left, right}` | Scrolling marquee text |
| `problemSolution.json` | `{heading, problem, solution}` | Problem/solution section |
| `questionSubjects.json` | `Array<{file, name}>` | QuickTest subject mapping |

---

## 🤝 Contributing

1. **Content** — Add PYQ questions to the year/shift JSONs, update roadmap data, or improve resource links
2. **Code** — Open an issue first; follow the existing code style (strict TypeScript, Tailwind utility classes, JSON-driven data)
3. **Bugs** — Report via issues with the error message and steps to reproduce

### Code Style

- `noUnusedLocals` and `noUnusedParameters` enabled — clean code required
- All content must go in JSON files, not components
- Components use Tailwind v4 utility classes; no custom CSS files
- Icons from `lucide-react` only

---

<div align="center">
  <br>
  <p>
    Built with ⚡ for GATE CSE aspirants<br>
    <sub>MIT License · 2026</sub>
  </p>
  <br>
</div>

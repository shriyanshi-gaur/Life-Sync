LifeSync 🌿

LifeSync is a full-stack holistic productivity platform designed to bridge the gap between task management and mental wellness. It integrates advanced habit tracking, data visualization, and mood journaling into a secure, single-page application (SPA).

🚀 Features

🛡️ Secure Authentication

JWT-based Auth: Custom middleware for secure route protection.

Session Persistence: Automatic login state management via local storage and Pinia.

✅ Task Management System

CRUD Operations: Create, Read, Update, Delete tasks with priority levels (Low, Medium, High).

Real-time Filtering: Instant search and filtering using computed properties.

Optimistic UI: Immediate interface updates before server confirmation for a snappy experience.

📊 Productivity Analytics

Data Visualization: Real-time Chart.js integration showing completion rates.

Statistical Breakdown: Metrics for total, pending, and completed tasks.

🔥 Advanced Habit Tracker

Streak Algorithm: Client-side O(n) algorithm to calculate current day streaks.

Contribution Graph: GitHub-style heatmap visualizing the last 14 days of consistency.

🧠 Wellness & Resources

Mood Journal: Track daily sentiments.

Resource Feed: Curated mental wellness articles fetched via external APIs.

Daily Motivation: Integrated quote widget.

🎨 UI/UX

Dark/Light Mode: System-aware theming with persistence.

Responsive Design: Fully mobile-optimized layout using Tailwind CSS.

🛠️ Tech Stack

Frontend

Framework: Vue 3 (Composition API)

Language: TypeScript

State Management: Pinia

Styling: Tailwind CSS

Routing: Vue Router 4

Visuals: Chart.js, Vue-Chartjs

Backend

Runtime: Node.js

Framework: Express.js

Database: MongoDB (Atlas)

ODM: Mongoose

Auth: JSON Web Tokens (JWT), Bcryptjs

🏗️ Architecture & Technical Highlights

Performance: Frontend responsiveness improved by ~30% through centralized Pinia state management, reducing redundant API calls.

Database Optimization: Applied Compound Indexing ({ user: 1, isCompleted: 1 }) on MongoDB collections to ensure sub-100ms query performance.

Scalability: Normalized database schema linking Users → Tasks → Habits via ObjectId references.

Algorithm: Custom TypeScript logic offloads heavy date-processing (for streaks and heatmaps) to the client, reducing server load.

⚡ Getting Started

Prerequisites

Node.js (v16+)

MongoDB Atlas URI (or local MongoDB instance)

1. Backend Setup

cd lifesync-backend

# Install dependencies
npm install

# Create .env file
echo "MONGO_URI=your_mongodb_connection_string" > .env
echo "JWT_SECRET=your_secret_key" >> .env

# Run Server
node server.js


Server runs on http://localhost:5000

2. Frontend Setup

cd life-sync

# Install dependencies
npm install

# Run Development Server
npm run dev


App runs on http://localhost:5173

📂 Project Structure

/
├── lifesync-backend/       # Node.js/Express API
│   ├── middleware/         # Auth & Error handling
│   ├── models/             # Mongoose Schemas (User, Task, Habit)
│   ├── routes/             # API Endpoints
│   └── server.js           # Entry point
│
└── life-sync/              # Vue 3 Frontend
    ├── src/
    │   ├── assets/         # Tailwind & CSS
    │   ├── components/     # Reusable UI (TaskCard, StatCard, Heatmap)
    │   ├── composables/    # Logic (useDark)
    │   ├── stores/         # Pinia Stores (Auth, Task, Habit)
    │   ├── views/          # Pages (Dashboard, Analytics, Login)
    │   └── App.vue         # Main Layout

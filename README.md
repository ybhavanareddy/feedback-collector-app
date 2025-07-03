# 💬 Feedback Collector App

A simple full-stack application that allows users to submit and manage feedback. Built using **HTML**, **CSS**, **JavaScript**, **Node.js**, and **Express**.

---

## 🌐 Live Demo

🔗 [Live App on Render](https://feedback-collector-app-rdfh.onrender.com/)

---

## 🚀 Features

- 📝 Collect user feedback with name and message
- 📃 Display all feedback dynamically
- ❌ Delete feedback with confirmation popup
- 🌙 Dark mode toggle
- ✅ Toast notifications on actions (submit/delete)
- 💾 Feedback stored in a `feedbacks.json` file
- 📱 Fully responsive (mobile-first design)
- 🎨 Animated UI with icons

---

## 🛠️ Tech Stack

**Frontend:**
- HTML
- CSS (Media Queries, Animations, Dark Mode)
- JavaScript (DOM, Fetch API)

**Backend:**
- Node.js
- Express.js
- File system storage using `fs` module

---

## 📂 Folder Structure

```text
feedback-collector-app/
├── backend/
│   ├── server.js
│   └── feedbacks.json
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
└── README.md

```

---

## ⚙️ Setup Instructions

1. **Clone the repo:**
   ```bash
   git clone https://github.com/your-username/feedback-collector-app.git
   cd feedback-collector-app```
2,Install backend dependencies:
   ```
   cd backend
   npm install
   ```
3.Start the server:
      ```
      node server.js
      ```
4.View the frontend:

Open frontend/index.html in browser, or serve it using Live Server / deploy both on Render.

📦 Deployment

Frontend: Static HTML/CSS/JS — hosted on Render

Backend: Node.js Express server — hosted on Render with static serving for frontend


👤 Author

Bhavana Yatham

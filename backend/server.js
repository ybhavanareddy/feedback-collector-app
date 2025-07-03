const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "feedbacks.json");

// Start express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, "frontend")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// Functions to handle feedback file
function readFeedbacks() {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

function writeFeedbacks(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Routes
app.post("/feedback", (req, res) => {
  const feedbacks = readFeedbacks();
  const { username, message } = req.body;
  feedbacks.push({ username, message });
  writeFeedbacks(feedbacks);
  res.status(201).json({ message: "Feedback added" });
});

app.get("/feedback", (req, res) => {
  const feedbacks = readFeedbacks();
  res.json(feedbacks);
});

app.delete("/feedback/:id", (req, res) => {
  const index = parseInt(req.params.id);
  const feedbacks = readFeedbacks();
  if (index >= 0 && index < feedbacks.length) {
    feedbacks.splice(index, 1);
    writeFeedbacks(feedbacks);
    res.status(200).json({ message: "Deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

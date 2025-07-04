const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.post("/business-data", (req, res) => {
  const { name, location } = req.body;
  if (!name.trim() || !location.trim()) {
    return res.status(400).json({ error: "Missing fields" });
  }

  res.json({
    rating: 4.5,
    reviews: 120,
    headline: `Boost Your ${name}'s Sales in ${location} with Local SEO!`,
  });
});

const headlines = [
  "The Go-To Place in 2025!",
  "Top Choice for Locals!",
  "Why Everyone’s Talking About This Place",
  "Trusted by Hundreds – See Why!",
  "Discover What Makes Them Special!"
];

app.get("/regenerate-headline", (req, res) => {
  const random = headlines[Math.floor(Math.random() * headlines.length)];
  res.json({ headline: random });
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});

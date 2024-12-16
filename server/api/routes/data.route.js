const express = require("express");
const router = express.Router();
const data = require("../../db/data.js");

router.get("/get-data", async (req, res) => {
  try {
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

router.get("/search", async (req, res) => {
  try {
    const { search } = req.query;
    if (!search) {
      return res.status(400).json({ error: "Search query is required" });
    }
    const result = data.filter(
      (item) =>
        item.id.toString().includes(search) ||
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.author.name.toLowerCase().includes(search.toLowerCase()) ||
        item.author.details.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())
    );
    if (result.length === 0) {
      return res.status(404).json({ message: "No matching data found" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to search data" });
  }
});

module.exports = router;

// routes/noteRoutes.js
const express = require("express");
const { Note } = require("../models");
const authenticateToken = require("../middleware/authenticateToken");

const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
  const notes = await Note.findAll({ where: { userId: req.user.userId } });
  res.json(notes);
});

router.post("/", authenticateToken, async (req, res) => {
  const { title, content, tags, color, reminder } = req.body;
  try {
    const note = await Note.create({
      title,
      content,
      tags,
      color,
      reminder,
      userId: req.user.userId,
    });
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    await Note.update(
      { isTrashed: true },
      { where: { id: req.params.id, userId: req.user.userId } }
    );
    res.sendStatus(204);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;

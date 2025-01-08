const express = require("express");
const { addUser } = require("../models/userModel");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Add a new member
router.post("/add-member", verifyToken, isAdmin, async (req, res) => {
  const { email, name, assignedClass } = req.body;

  if (!email || !name || !assignedClass) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    await addUser(email, "member", name, assignedClass);
    res.status(201).json({ message: "Member added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add member", error: error.message });
  }
});

// Add a new trainer
router.post("/add-trainer", verifyToken, isAdmin, async (req, res) => {
  const { email, name } = req.body;

  if (!email || !name) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    await addUser(email, "trainer", name, null);
    res.status(201).json({ message: "Trainer added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add trainer", error: error.message });
  }
});

// Add a new class
router.post("/add-class", verifyToken, isAdmin, async (req, res) => {
  const { className } = req.body;

  if (!className) {
    return res.status(400).json({ message: "Class name is required" });
  }

  try {
    const classRef = db.collection("classes").doc(className);
    await classRef.set({ className, createdAt: admin.firestore.Timestamp.now() });
    res.status(201).json({ message: "Class added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add class", error: error.message });
  }
});

module.exports = router;

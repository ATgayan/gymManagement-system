const express = require("express");
const {
  addTrainer,
  fetchTrainers,
  updateTrainer,
  deleteTrainer,
  assignSchedule,
} = require("../controllers/trainerCntoller");

const router = express.Router();

// Ensure these controller functions are correctly implemented
router.post("/", addTrainer);
router.get("/", fetchTrainers); // Error points to this line
router.put("/:id", updateTrainer);
router.delete("/:id", deleteTrainer);
router.post("/schedule", assignSchedule);

module.exports = router;

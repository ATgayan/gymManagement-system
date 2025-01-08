const express = require("express");
const {
  createClass,
  fetchClasses,
  updateClass,
  deleteClass,
} = require("../controllers/classCntroller");
const router = express.Router();

router.post("/", createClass);
router.get("/", fetchClasses);
router.put("/:id", updateClass);
router.delete("/:id", deleteClass);

module.exports = router;

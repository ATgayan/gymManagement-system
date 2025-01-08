const express = require("express");
const {
  createPackage,
  fetchPackages,
  updatePackage,
  deletePackage,
} = require("../controllers/packageController");
const router = express.Router();

router.post("/", createPackage);
router.get("/", fetchPackages);
router.put("/:id", updatePackage);
router.delete("/:id", deletePackage);

module.exports = router;

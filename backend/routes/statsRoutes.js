const express = require("express");
const { fetchStats } = require("../controllers/statsController");
const router = express.Router();

router.get("/", fetchStats); 

module.exports = router;

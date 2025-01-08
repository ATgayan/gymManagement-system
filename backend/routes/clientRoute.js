const express = require("express");
const {
  addClient,
  fetchClients,
  updateClient,
  deleteClient,
//   searchClients,
} = require("../controllers/clientController");
const router = express.Router();

router.post("/", addClient);
router.get("/", fetchClients);
router.put("/:id", updateClient);
router.delete("/:id", deleteClient);
// router.get("/search", searchClients);

module.exports = router;


const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Import Routes
const statsRoutes = require("./routes/statsRoutes");
const packageRoutes = require("./routes/packageRoutes");
const clientRoutes = require("./routes/clientRoute");
const trainerRoutes = require("./routes/trainerRoutes");
const classRoutes = require("./routes/classRoute"); 

// Initialize App
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use("/stats", statsRoutes);       // For dashboard statistics
app.use("/packages", packageRoutes); // For package management
app.use("/clients", clientRoutes);   // For client management
app.use("/trainers", trainerRoutes); // For trainer management
app.use("/classes", classRoutes);    // For class management (new route)

// Health Check Endpoint
app.get("/", (req, res) => {
  res.send("API is running successfully!");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "An unexpected error occurred!", error: err.message });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

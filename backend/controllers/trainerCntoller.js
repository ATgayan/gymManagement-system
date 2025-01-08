const {db} = require("../firebase/firebaseAdmin"); // Import Firestore instance

// Add Trainer to Firestore
const addTrainer = async (req, res) => {
  try {
    const trainer = req.body;
    console.log(db);
    const docRef = await db.collection("trainer").add(trainer); 
    res.status(201).json({
      message: "Trainer added successfully!",
      trainerId: docRef.id,
      trainer,
    });
    console.log("Trainer added successfully:", trainer);
  } catch (error) {
    console.error("Error adding trainer:", error);
    res.status(500).json({ message: "Failed to add trainer" });
  }
};


// Fetch Trainers from Firestore
const fetchTrainers = async (req, res) => {
  try {
    const snapshot = await db.collection("trainer").get(); // Get all trainers
    const trainers = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(trainers);
  } catch (error) {
    console.error("Error fetching trainers:", error);
    res.status(500).json({ message: "Failed to fetch trainers" });
  }
};

// Update Trainer in Firestore
const updateTrainer = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const trainerRef = db.collection("trainer").doc(id); // Get specific trainer by ID
    await trainerRef.update(updatedData); // Update the trainer document
    res.status(200).json({ message: `Trainer ${id} updated successfully!` });
  } catch (error) {
    console.error("Error updating trainer:", error);
    res.status(500).json({ message: "Failed to update trainer" });
  }
};

// Delete Trainer from Firestore
const deleteTrainer = async (req, res) => {
  const { id } = req.params;
  try {
    const trainerRef = db.collection("trainer").doc(id); // Get specific trainer by ID
    await trainerRef.delete(); // Delete the trainer document
    res.status(200).json({ message: `Trainer ${id} deleted successfully!` });
  } catch (error) {
    console.error("Error deleting trainer:", error);
    res.status(500).json({ message: "Failed to delete trainer" });
  }
};

// Assign Schedule to Trainer
const assignSchedule = async (req, res) => {
  const { trainerId, schedule } = req.body;
  try {
    const trainerRef = db.collection("trainer").doc(trainerId); // Get specific trainer by ID
    await trainerRef.update({ schedule }); // Assign the schedule to the trainer
    res.status(200).json({ message: `Schedule assigned to trainer ${trainerId}` });
  } catch (error) {
    console.error("Error assigning schedule:", error);
    res.status(500).json({ message: "Failed to assign schedule" });
  }
};

module.exports = {
  addTrainer,
  fetchTrainers,
  updateTrainer,
  deleteTrainer,
  assignSchedule,
};

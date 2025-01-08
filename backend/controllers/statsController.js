const { db } = require("../firebase/firebaseAdmin");

exports.fetchStats = async (req, res) => {
  try {
    // Fetch all collections concurrently
    const [membersSnapshot, trainersSnapshot, classesSnapshot] = await Promise.all([
      db.collection("members").get(),
      db.collection("trainer").get(),
      db.collection("class").get(),
    ]);

    // Get the count of documents for each collection
    const stats = {
      members: membersSnapshot.size,
      trainers: trainersSnapshot.size,
      classes: classesSnapshot.size,
    };

    // Return the counts in one response
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch stats", error: error.message });
  }
};

const {db} = require("../firebase/firebaseAdmin");

exports.createClass = async (req, res) => {
  const { name, exercise_name, day, start_time, end_time } = req.body;
  if (!name || !exercise_name || !day || !start_time || !end_time) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const classRef = db.collection("class").doc();
    await classRef.set({ name, exercise_name, day, start_time, end_time });
    res.status(201).json({ message: "Class created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create class", error });
  }
};

exports.fetchClasses = async (req, res) => {
  try {
    const snapshot = await db.collection("class").get();
    const classes = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch classes", error });
  }
};

exports.updateClass = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    await db.collection("class").doc(id).update(updates);
    res.status(200).json({ message: "Class updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update class", error });
  }
};

exports.deleteClass = async (req, res) => {
  const { id } = req.params;

  try {
    await db.collection("class").doc(id).delete();
    res.status(200).json({ message: "Class deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete class", error });
  }
};

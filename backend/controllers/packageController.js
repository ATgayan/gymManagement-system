const { db } = require("../firebase/firebaseAdmin");

exports.createPackage = async (req, res) => {
  const { name, type, price } = req.body;
  if (!name || !type || !price) return res.status(400).json({ message: "Missing fields" });

  try {
    const packageRef = db.collection("plans").doc();
    await packageRef.set({ name, type, price });
    res.status(201).json({ message: "Package created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create package", error });
  }
};

exports.fetchPackages = async (req, res) => {
  try {
    // Fetch the packages and classes data
    const packagesSnapshot = await db.collection("plans").get();
    const classesSnapshot = await db.collection("class").get();

    // Map data from Firestore snapshots
    const packages = packagesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const classes = classesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Send the response as a single JSON object
    res.status(200).json({ packages, classes });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch packages", error });
  }
};


exports.updatePackage = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    await db.collection("plans").doc(id).update(updates);
    res.status(200).json({ message: "Package updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update package", error });
  }
};

exports.deletePackage = async (req, res) => {
  const { id } = req.params;

  try {
    await db.collection("plans").doc(id).delete();
    res.status(200).json({ message: "Package deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete package", error });
  }
};

const {db} = require("../firebase/firebaseAdmin");

exports.addClient = async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ message: "Missing fields" });

  try {
    const clientRef = db.collection("members").doc();
    await clientRef.set({ name, email });
    res.status(201).json({ message: "Client added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add client", error });
  }
};

exports.fetchClients = async (req, res) => {
  try {
    const snapshot = await db.collection("members").get();
    const clients = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch clients", error });
  }
};

exports.updateClient = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    await db.collection("members").doc(id).update(updates);
    res.status(200).json({ message: "Client updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update client", error });
  }
};

exports.deleteClient = async (req, res) => {
  const { id } = req.params;

  try {
    await db.collection("members").doc(id).delete();
    res.status(200).json({ message: "Client deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete client", error });
  }
};

// exports.searchClients = async (req, res) => {
//   const { name } = req.query;

//   try {
//     const snapshot = await db.collection("Clients").where("name", "==", name).get();
//     const clients = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//     res.status(200).json(clients);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to search clients", error });
//   }
// };

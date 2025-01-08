const { admin, db } = require("../firebase/firebaseAdmin");
const userModel = require("../models/userModel");

exports.registerUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const userRecord = await admin.auth().createUser({ email, password });
    const userData = {
      email,
      role: role || "member", // Default role is member
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await userModel.createUser(userRecord.uid, userData);

    res.status(201).json({ message: "User created successfully", user: userData });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Failed to create user", error });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await userModel.getUserById(req.user.uid);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

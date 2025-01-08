const { admin } = require("../firebase/firebaseAdmin");
const { getUserByEmail } = require("../models/userModel");

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;

    // Fetch user details from Firestore
    const user = await getUserByEmail(decodedToken.email);
    if (!user) {
      return res.status(403).json({ message: "User not found in the system" });
    }

    req.user.role = user.role;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user?.email !== "thusitha.personal@gmail.com") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

module.exports = { verifyToken, isAdmin };

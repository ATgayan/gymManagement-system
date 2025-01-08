const { db } = require("../firebase/firebaseAdmin");

const getUserByEmail = async (email) => {
  const userRef = db.collection("users").doc(email);
  const userDoc = await userRef.get();
  if (!userDoc.exists) {
    return null;
  }
  return userDoc.data();
};

const addUser = async (email, role, name, assignedClass) => {
  const userRef = db.collection("users").doc(email);
  await userRef.set({
    email,
    role,
    name,
    assignedClass,
    createdAt: admin.firestore.Timestamp.now(),
  });
};

module.exports = { getUserByEmail, addUser };

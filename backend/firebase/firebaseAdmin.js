const admin = require("firebase-admin");

const serviceAccount = require("./gym-manegement-system-42046-firebase-adminsdk-6xv9v-5f4fe3d810.json");

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("Firebase Admin Initialized");
} catch (error) {
  console.log("Failed to initialize Firebase Admin", error);
}

const db = admin.firestore();
console.log(db);  // Verify if this is a Firestore instance



module.exports = { admin, db };

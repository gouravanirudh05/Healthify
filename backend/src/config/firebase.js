import admin from "firebase-admin";
import serviceAccount from "./serviceAccountKey.json"; // Downloaded from Firebase Console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://your-project-id.firebaseio.com", // Replace with your Firebase DB URL
});

const db = admin.firestore();
export { admin, db };

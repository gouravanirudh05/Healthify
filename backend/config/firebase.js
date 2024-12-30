import admin from "firebase-admin";
import dotenv from "dotenv";
dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert({
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: "healthcare-project-88c86.firebaseapp.com",
    projectId: "healthcare-project-88c86",
    storageBucket: "healthcare-project-88c86.firebasestorage.app",
    messagingSenderId: "319750410952",
    appId: "1:319750410952:web:d9da4ae968840dcab9cbfd"
  }),
});

export { admin };

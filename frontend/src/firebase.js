// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc, getDoc, getFirestore } from "firebase/firestore"; // Updated imports for Firestore
import { toast } from "react-toastify";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "healthcare-project-88c86.firebaseapp.com",
  projectId: "healthcare-project-88c86",
  storageBucket: "healthcare-project-88c86.firebasestorage.app",
  messagingSenderId: "319750410952",
  appId: "1:319750410952:web:d9da4ae968840dcab9cbfd",
};

// Initialize Firebase app and services
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Function to handle user signup
const signup = async (name, email, password) => {
  try {
    // Create user with email and password
    const response = await createUserWithEmailAndPassword(auth, email, password);
    const user = response.user;

    // Add user details to Firestore in the 'users' collection using uid as document ID
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name: name,
      authProvider: "local",
      email: email,
    });

    console.log("User signed up and added to Firestore");
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

// Function to handle user login
const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

// Function to handle user logout
const logout = async () => {
  signOut(auth);
};

// Function to handle Google Sign-In
const googleSignIn = async () => {
  const provider = new GoogleAuthProvider(); // Create GoogleAuthProvider instance
  try {
    const response = await signInWithPopup(auth, provider); // Sign in using Google
    const user = response.user;

    // Reference the user's document in Firestore
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    // If the user doesn't already exist in Firestore, add them
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        name: user.displayName || "Unknown",
        authProvider: "google",
        email: user.email,
      });
    }

    console.log("Google user signed in and added to Firestore");
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

export { auth, db, login, signup, logout, googleSignIn };

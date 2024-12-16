// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {


  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "healthcare-project-88c86.firebaseapp.com",
  projectId: "healthcare-project-88c86",
  storageBucket: "healthcare-project-88c86.firebasestorage.app",
  messagingSenderId: "319750410952",
  appId: "1:319750410952:web:d9da4ae968840dcab9cbfd"
};

const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db=getFirestore(app);
const signup = async (name, email, password) => {
    try {
        // Create user with email and password
        const response = await createUserWithEmailAndPassword(auth, email, password);
        const user = response.user;

        // Add user details to Firestore in the 'users' collection
        await addDoc(collection(db, "users"), {  // 'users' is the collection name
            uid: user.uid, 
            name: name, 
            authProvider: 'local', 
            email: email, 
        });

        console.log("User signed up and added to Firestore");
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split("-").join(" "));
    }
};

const login=async(email,password)=>
{
    try {
       await  signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split("-").join(" "));
    }
}
const logout=async()=>
{
    signOut(auth);
}
export {auth,db,login,signup,logout};
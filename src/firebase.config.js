// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLHxVKQ-RKVP8E6Xb_vOtn_Fsm5XrrzHU",
  authDomain: "fir-practic-ef55b.firebaseapp.com",
  projectId: "fir-practic-ef55b",
  storageBucket: "fir-practic-ef55b.appspot.com",
  messagingSenderId: "7648672484",
  appId: "1:7648672484:web:5a1187705b9369fa720af1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
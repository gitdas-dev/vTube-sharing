import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


//web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYHojJdCZwFPhx63EUzsV0_kXMRKnuQak",
  authDomain: "video-16522.firebaseapp.com",
  projectId: "video-16522",
  storageBucket: "video-16522.appspot.com",
  messagingSenderId: "200732879302",
  appId: "1:200732879302:web:6abb6c5abcda921b916ac7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const provider = new GoogleAuthProvider()

export default app;
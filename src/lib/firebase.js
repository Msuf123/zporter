// Import the functions you need from the modular SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBdMEcdp35zggQs42z-apy-ttOHtRDou5c",
  authDomain: "zporter-82cbe.firebaseapp.com",
  projectId: "zporter-82cbe",
  storageBucket: "zporter-82cbe.firebasestorage.app",
  messagingSenderId: "1063052264864",
  appId: "1:1063052264864:web:d33890fef736c0501410c5",
  measurementId: "G-7K1FR68FHX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const firestore=getFirestore(app);  
const storage=getStorage(app)
//const analytics = getAnalytics(app);

// Export the services to use them in other parts of your app
export { auth, firestore,storage ,app};

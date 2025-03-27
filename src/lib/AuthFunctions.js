import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from './firebase';

const auth = getAuth(app);

// Sign Up Function
 const signups = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    console.log('User signed up successfully');
    return true
  } catch (error) {
    console.error(error.message);
    return false
  }
};

// Login Function
export const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log('User logged in successfully');
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

// Sign Out Function
export const logout = async () => {
  try {
    await signOut(auth);
    console.log('User signed out successfully');
    return true
  } catch (error) {
    console.error(error.message);

    return false
  }
};
export{signups,signInWithEmailAndPassword,logout}
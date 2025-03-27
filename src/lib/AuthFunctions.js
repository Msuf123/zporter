import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from './firebase';

const auth = getAuth(app);

// Sign Up Function
export const signup = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    console.log('User signed up successfully');
  } catch (error) {
    console.error(error.message);
    throw error;
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
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};
export{signup,signInWithEmailAndPassword,signOut}
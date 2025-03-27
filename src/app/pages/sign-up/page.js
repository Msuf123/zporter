"use client"; // Ensure it's treated as a client component

import { useState,useEffect } from "react";
import { signup } from "@/lib/AuthFunctions"; // Importing the signup function
import { getAuth, onAuthStateChanged } from "firebase/auth";

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const auth=getAuth()
    useEffect(() => {
    // Listen for authentication state changes
  
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // If the user is signed in, store the user object and redirect them
        setUser(currentUser);
        window.location.href = '/home'; // Or redirect to another page (e.g., dashboard)
      } else {
        // If no user is logged in, keep the page as is
        setUser(null);
      }
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);







  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    console.log('hi')
    try {
      await signup(email, password); // Calls the signup function
      setSuccess("Sign Up Successful!");
      // Redirect to login page after successful sign-up
      setTimeout(() => {
        window.location.href = 'login'; 
      }, 1000);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={"container"}>
      <h2 className={"title"}>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <div>
          <label className={"label"}>Email:</label>
          <input 
            className={"input-field"}
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
        </div>
        <div>
          <label className={"label"}>Password:</label>
          <input 
            className={"input-field"}
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
        </div>
        <button className={"button"} type="submit">Sign Up</button>
      </form>
      
      {error && <p className={"error"}>{error}</p>}
      {success && <p className={"success"}>{success}</p>}

      <footer>
        <p>Already have an account? <a href="/login">Login</a></p>
      </footer>
    </div>
  );
};

export default SignUp;

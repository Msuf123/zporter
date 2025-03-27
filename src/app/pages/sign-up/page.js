"use client"; // Ensure it's treated as a client component

import { useState, useEffect } from "react";
import { signups } from "@/lib/AuthFunctions"; // Importing the signup function
import { getAuth, onAuthStateChanged } from "firebase/auth";

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [user,setUser]=useState('')
  const auth = getAuth();

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // If the user is signed in, store the user object and redirect them
        setUser(currentUser);
        window.location.href = 'home'; // Or redirect to another page (e.g., dashboard)
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
    try {
      let res=await signup(email, password); // Calls the signup function
      setSuccess("Sign Up Successful!");
      if(res){
           window.location.href = 'pages/home'; 
      }
      // Redirect to login page after successful sign-up
      
    } catch (error) {
      setError(error.message);
    }
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    padding: "20px",
    backgroundColor: "#f4f7fc",
  };

  const titleStyle = {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
  };

  const formStyle = {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s",
  };

  const buttonHoverStyle = {
    backgroundColor: "#45a049",
  };

  const errorStyle = {
    color: "#ff4d4d",
    fontSize: "0.9rem",
    marginTop: "10px",
  };

  const successStyle = {
    color: "#4CAF50",
    fontSize: "0.9rem",
    marginTop: "10px",
  };

  const footerStyle = {
    marginTop: "20px",
    fontSize: "1rem",
    color: "#666",
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Sign Up</h2>
      <form style={formStyle} onSubmit={handleSignUp}>
        <div>
          <label>Email:</label>
          <input
            style={inputStyle}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            style={inputStyle}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          style={buttonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
          type="submit"
        >
          Sign Up
        </button>
      </form>

      {error && <p style={errorStyle}>{error}</p>}
      {success && <p style={successStyle}>{success}</p>}

      <footer style={footerStyle}>
        <p>
          Already have an account? <a href="/pages/login">Login</a>
        </p>
      </footer>
    </div>
  );
};

export default SignUp;

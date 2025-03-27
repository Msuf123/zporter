'use client';
import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  // Fetch user info when component mounts
  useEffect(() => {
      // Check if the user is already logged in
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (!user) {
          // Redirect to home page if already logged in
          window.location.href = 'login';
        }else{
            console.log(user)
            setUser(user)
        }
      });
  
      // Cleanup the listener when the component unmounts
      return () => unsubscribe();
    }, []);

  if (!user) {
    return <div>You are not logged in.</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.displayName || 'User'}!</h1>
      <p>Email: {user.email}</p>
      <p>UID: {user.uid}</p>
      {/* You can add more details as needed */}
    </div>
  );
};

export default Dashboard;

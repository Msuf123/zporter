'use client';
import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getUserData } from './fetchFunction/fetchFunction';
import Loader from './InnerComponents/Loading/loading';
import './page.module.css';
import { ScreeningCard } from './InnerComponents/Cards/Cards';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [data,setData]=useState([])
  function onLogout() {
    // Add logout logic here
  }

  // Fetch user info when component mounts
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // Redirect to home page if already logged in
        window.location.href = 'login';
      } else {
        let a = getUserData('asdfasf@gmaiil.com').then((a) => {
         setData(a)
        });

        setUser(user);
      }
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  if (!user) {
    return <Loader />;
  }

  return (
    <div>

        <div className="dashboard-container">
      <h1 className="dashboard-title">
        Welcome, {user.email || 'User'}!
      </h1>
      <button
        onClick={onLogout}
        className="logout-button"
      >
        Logout
      </button>
      
   
    </div> 


         <button
  style={{
    backgroundColor: '#4CAF50', // Green background
    color: 'white',              // White text color
    padding: '10px 20px',        // Padding inside the button
    fontSize: '16px',            // Font size of the text
    border: 'none',              // No border
    borderRadius: '5px',         // Rounded corners
    cursor: 'pointer',          // Pointer cursor on hover
    transition: 'background-color 0.3s ease', // Smooth transition for background color change
  }}
  onClick={() => window.location.href = 'form'}
>
  Add
</button>
<div style={{display:'grid',gridTemplateColumns:"1fr 1fr 1fr",gap:"5px",width:"90%",margin:"auto"}}>
  
{data.length!==0?data.map((i,k)=><ScreeningCard key={k} data={i} tabIndex={k}></ScreeningCard>):null}
    </div>
  
    </div>
  );
};

export default Dashboard;

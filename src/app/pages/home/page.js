'use client';
import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getUserCoach, getUserData } from './fetchFunction/fetchFunction';
import Loader from './InnerComponents/Loading/loading';
import style from './page.module.css';
import { ScreeningCard } from './InnerComponents/Cards/Cards';
import { logout } from '@/lib/AuthFunctions';
import PopUp from './InnerComponents/PopUpCoach/PopUp';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [data,setData]=useState([])
  const [coach,setCoach]=useState(["xxx"])
  const [heading,setHeading]=useState('')
  function onLogout() {
    // Add logout logic here
    logout().then((a)=>{
      if(a){
         window.location.href = 'login';
      }else{
        alert("Error")
      }
    })
  }

  // Fetch user info when component mounts
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // Redirect to home page if already logged in
        window.location.href = 'login';
      } else {
        let a = getUserData(user.email).then((a) => {
         setData(a)
        });
        let b=getUserCoach(user.email).then((a)=>{
          console.log(a,'ll')
            setCoach(a)
        })
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

        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"98%",margin:"20px auto"}}>
      <h1 className="dashboard-title">
        Welcome, {user.email || 'User'}!
      </h1>
      <button
        onClick={onLogout}
       className={style.logoutButton}
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
    transition: 'background-color 0.3s ease',
      margin:"20px" // Smooth transition for background color change
  }}
  onClick={() => window.location.href = 'form'}
>
  Add
</button>
<button style={{
    backgroundColor: '#4CAF50', // Green background
    color: 'white',              // White text color
    padding: '10px 20px',        // Padding inside the button
    fontSize: '16px',            // Font size of the text
    border: 'none',              // No border
    borderRadius: '5px',         // Rounded corners
    cursor: 'pointer',          // Pointer cursor on hover
    transition: 'background-color 0.3s ease',
      margin:"20px" // Smooth transition for background color change
  }} onClick={()=>{setHeading("Change");setCoach([])}} disabled={coach[0]==="xxx"}>
 Change Coach Email
</button>
<div style={{display:'grid',gridTemplateColumns:"1fr 1fr 1fr",gap:"5px",width:"90%",margin:"auto"}}>
  
{data.length!==0?data.map((i,k)=><ScreeningCard key={k} data={i} tabIndex={k}></ScreeningCard>):null}
    </div>
  {coach.length===0?<PopUp userName={user.email} heading={heading} onChange={setCoach}></PopUp>:null}
    </div>
  );
};

export default Dashboard;

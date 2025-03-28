'use client';
import { useState } from 'react';
import { addCoachEmailId, updateCoachEmailId } from '../../fetchFunction/fetchFunction';

export default function PopUp({userName,onChange,heading}) {
  // Create state to hold emailId
  const [emailId, setEmailId] = useState('');
  const [loaidng,setLoading]=useState(false)
  // Handle submit function
  const handleSubmit = () => {
  // Regular expression to validate email format
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Check if the emailId matches the regex
  if (emailRegex.test(emailId)) {
    setLoading(true)
    if(heading==="Change"){
      updateCoachEmailId(userName,emailId).then((a)=>{
        console.log(a,'jj')
       if(a){
        setLoading(false)
        onChange([emailId])
       }
       setEmailId('');
      })
    }
    else{
                console.log('Submitted email ID:', emailId);
                    // Reset the emailId state after submission (optional)
                    addCoachEmailId(userName,emailId).then((a)=>{
                        console.log('Adding email result',a)
                        if(a){
                            console.log("email Added")
                            setLoading(false)
                            onChange([emailId])
                        }
                    })
                    
                    setEmailId('');
    }
    
  } else {
            console.log('Invalid email format');
            alert("Not a vaild email")
            // Optionally, set some error message state here
  }
};


  return (
    <div
      style={{
        position: 'fixed',
        top: '0px',
        left: '0px',
        right: '0px',
        bottom: '0px',
        backgroundColor: 'rgba(26, 25, 26, 0.9)',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          width: '300px',
          textAlign: 'center',
        }}
      >
        <span
          style={{
            fontSize: '16px',
            color: '#333',
            display: 'block',
            marginBottom: '10px',
          }}
        >
          Enter Coach email ID
        </span>
        <input
          type="email"
          placeholder="Team manager email"
          value={emailId} // Set the input value to the state
          onChange={(e) => setEmailId(e.target.value)} // Update the state when input changes
          style={{
            width: '100%',
            padding: '10px',
            margin: '10px 0',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '14px',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
        <button disabled={loaidng}
          onClick={handleSubmit} // Trigger the handleSubmit function on click
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        > {loaidng?"Loading...":heading||'Add'}
          
        </button>
      </div>
    </div>
  );
}

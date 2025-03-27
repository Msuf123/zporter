'use client';
import { useEffect, useState } from 'react';

const HealthIssues = ({ onChange ,value}) => {
  const [healthData, setHealthData] = useState(value);

  const handleChange = (e, question) => {
    const value = e.target.value;
    
    setHealthData((prevData) => {
      const updatedData = { ...prevData, [question]: value };
       // Sending the updated data to parent component
      return updatedData;
    });
    
  };
 useEffect(()=>{
  onChange(healthData)
 },[healthData])
  return (
    <div style={styles.container}>
      <label style={styles.question}>Do you have any current pain?</label>
      <select
        value={healthData.hasPain}
        onChange={(e) => handleChange(e, 'hasPain')}
        style={styles.select}
      >
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>

      <label style={styles.question}>Are you experiencing fatigue?</label>
      <select
        value={healthData.fatigue}
        onChange={(e) => handleChange(e, 'fatigue')}
        style={styles.select}
      >
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>

      <label style={styles.question}>Do you feel dizzy or lightheaded?</label>
      <select
        value={healthData.dizziness}
        onChange={(e) => handleChange(e, 'dizziness')}
        style={styles.select}
      >
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>

      <label style={styles.question}>Do you have any other health issues?</label>
      <select
        value={healthData.otherIssues}
        onChange={(e) => handleChange(e, 'otherIssues')}
        style={styles.select}
      >
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    margin: '20px auto',
    fontFamily: 'Arial, sans-serif',
    width:"max-content"
  },
  question: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: '#333',
  },
  select: {
    width: '200px',
    padding: '8px',
    marginBottom: '20px',
    fontSize: '14px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
};

export default HealthIssues;

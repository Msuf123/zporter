'use client';
import { useState } from 'react';

const MajorHistory = ({ onInjuryChange, onFamilyHistoryChange,onIllnessChange,injuryHistoryProp,familyHistoryProp,illnesshistoryProp}) => {
  const [injuryHistory, setInjuryHistory] = useState(injuryHistoryProp||[]);
  const [illnessHistory, setIllnessHistory] = useState(illnesshistoryProp||[]);
  const [familyHistory, setFamilyHistory] = useState(familyHistoryProp||[]);
  const [injuryInput, setInjuryInput] = useState('');
  const [illnessInput, setIllnessInput] = useState('');
  const [familyHistoryInput, setFamilyHistoryInput] = useState('');

  const handleInjuryChange = (e) => {
    setInjuryInput(e.target.value);
  };

  const handleIllnessChange = (e) => {
    setIllnessInput(e.target.value);
  };

  const handleFamilyHistoryChange = (e) => {
    setFamilyHistoryInput(e.target.value);
  };

  const handleInjurySubmit = () => {
    if (injuryInput) {
      const updatedInjuryHistory = [...new Set([...injuryHistory, injuryInput])];
      setInjuryHistory(updatedInjuryHistory);
      onInjuryChange(updatedInjuryHistory);
      setInjuryInput('');
    }
  };

  const handleIllnessSubmit = () => {
    if (illnessInput) {
      const updatedIllnessHistory = [...new Set([...illnessHistory, illnessInput])];
      setIllnessHistory(updatedIllnessHistory);
      onIllnessChange(updatedIllnessHistory);
      setIllnessInput('');
    }
  };

  const handleFamilyHistorySubmit = () => {
    if (familyHistoryInput) {
      const updatedFamilyHistory = [...new Set([...familyHistory, familyHistoryInput])];
      setFamilyHistory(updatedFamilyHistory);
      onFamilyHistoryChange(updatedFamilyHistory);
      setFamilyHistoryInput('');
    }
  };

  const removeInjury = (injury) => {
    const updatedInjuryHistory = injuryHistory.filter((item) => item !== injury);
    setInjuryHistory(updatedInjuryHistory);
    onInjuryChange(updatedInjuryHistory);
  };

  const removeIllness = (illness) => {
    const updatedIllnessHistory = illnessHistory.filter((item) => item !== illness);
    setIllnessHistory(updatedIllnessHistory);
    onIllnessChange(updatedIllnessHistory);
  };

  const removeFamilyHistory = (history) => {
    const updatedFamilyHistory = familyHistory.filter((item) => item !== history);
    setFamilyHistory(updatedFamilyHistory);
    onIllnessChange(updatedFamilyHistory);
  };

  return (
    <div style={styles.container}>
      {/* Major Injury History */}
      <div style={styles.section}>
        <label style={styles.label}>Major Injury History:</label>
        <div style={styles.selectedContainer}>
          {injuryHistory.map((injury) => (
            <div key={injury} style={styles.selectedItem}>
              {injury}
              <button
                onClick={() => removeInjury(injury)}
                style={styles.removeButton}
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <textarea
          value={injuryInput}
          onChange={handleInjuryChange}
          style={styles.textarea}
          placeholder="Add a major injury"
        />
        <button onClick={handleInjurySubmit} style={styles.submitButton}>Add Injury</button>
      </div>

      {/* Major Illnesses */}
      <div style={styles.section}>
        <label style={styles.label}>Major Illnesses:</label>
        <div style={styles.selectedContainer}>
          {illnessHistory.map((illness) => (
            <div key={illness} style={styles.selectedItem}>
              {illness}
              <button
                onClick={() => removeIllness(illness)}
                style={styles.removeButton}
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <textarea
          value={illnessInput}
          onChange={handleIllnessChange}
          style={styles.textarea}
          placeholder="Add a major illness"
        />
        <button onClick={handleIllnessSubmit} style={styles.submitButton}>Add Illness</button>
      </div>

      {/* Family History of Illness */}
      <div style={styles.section}>
        <label style={styles.label}>Family History of Illness:</label>
        <div style={styles.selectedContainer}>
          {familyHistory.map((history) => (
            <div key={history} style={styles.selectedItem}>
              {history}
              <button
                onClick={() => removeFamilyHistory(history)}
                style={styles.removeButton}
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <textarea
          value={familyHistoryInput}
          onChange={handleFamilyHistoryChange}
          style={styles.textarea}
          placeholder="Add a family history illness"
        />
        <button onClick={handleFamilyHistorySubmit} style={styles.submitButton}>Add Family History</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    fontFamily: 'Arial, sans-serif',
    width: '100%',
    maxWidth: '500px',
    margin: '0 auto',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '16px',
  },
  label: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: '#333',
  },
  selectedContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '8px',
  },
  selectedItem: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: '4px',
    padding: '4px 8px',
    fontSize: '14px',
  },
  textarea: {
    padding: '8px',
    fontSize: '14px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    marginBottom: '8px',
    width: '100%',
    minHeight: '100px', // Makes the textarea taller for more space
    resize: 'vertical', // Allows the user to resize vertically
  },
  submitButton: {
    padding: '8px 16px',
    fontSize: '14px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  removeButton: {
    marginLeft: '8px',
    background: 'none',
    border: 'none',
    color: 'red',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default MajorHistory;

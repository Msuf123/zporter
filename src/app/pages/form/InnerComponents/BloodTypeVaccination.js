'use client';
import { useState } from 'react';

const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const vaccinations = [
  'DTaP', 'MMR', 'Hib', 'Hepatitis B', 'Polio', 'Varicella', 'Influenza', 'Pneumococcal', 'Meningococcal', 'HPV'
];

const BloodTypeVaccination = ({ onBloodTypeChange, onVaccinationChange,bloodTypeValue,vaccinationValue }) => {
  const [bloodType, setBloodType] = useState(bloodTypeValue||'');
  const [vaccination, setVaccination] = useState(vaccinationValue||'');

  const handleBloodTypeChange = (e) => {
    setBloodType(e.target.value);
    onBloodTypeChange(e.target.value);
  };

  const handleVaccinationChange = (e) => {
    const selectedVaccination = e.target.value;
    setVaccination(selectedVaccination);
    onVaccinationChange(selectedVaccination);
  };

  return (
    <div style={styles.container}>
      <div style={styles.section}>
        <label style={styles.label}>Blood Type:</label>
        <select value={bloodType} onChange={handleBloodTypeChange} style={styles.select}>
          <option value="">Select Blood Type</option>
          {bloodTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div style={styles.section}>
        <label style={styles.label}>Vaccination:</label>
        <select
          value={vaccination}
          onChange={handleVaccinationChange}
          style={styles.select}
        >
          <option value="">Select a Vaccination</option>
          {vaccinations.map((vac) => (
            <option key={vac} value={vac}>
              {vac}
            </option>
          ))}
        </select>
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
    maxWidth: '400px',
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
  select: {
    padding: '8px',
    fontSize: '14px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    width: '100%',
    backgroundColor: '#fff',
    marginBottom: '12px',
  },
};

export default BloodTypeVaccination;

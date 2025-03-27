'use client';
import { useState } from 'react';

const allergiesList = [
  'Milk', 'Eggs', 'Fish', 'Shellfish', 'Tree nuts', 'Peanuts', 'Wheat', 'Soybeans', 'Dust mites', 'Pollen'
];

const intolerancesList = [
  'Lactose', 'Gluten', 'Histamine', 'Food Additives', 'Fructose', 'Caffeine', 'Alcohol', 'Sulphites', 'Salicylates', 'Monosodium glutamate (MSG)'
];

const AllergiesAndIntolerances = ({ onAllergyChange, onIntoleranceChange, valueOfIntolerances, valueOfAllergies }) => {
  const [allergies, setAllergies] = useState(valueOfAllergies || []);
  const [intolerances, setIntolerances] = useState(valueOfIntolerances || []);
  const [allergyInput, setAllergyInput] = useState('');
  const [intoleranceInput, setIntoleranceInput] = useState('');

  const handleSearchChange = (e, type) => {
    const { value } = e.target;
    if (type === 'allergy') {
      setAllergyInput(value);
    } else {
      setIntoleranceInput(value);
    }
  };

  const handleSelect = (selectedValue, type) => {
    if (type === 'allergy') {
      // Allow adding custom allergies even if not in the predefined list
      if (selectedValue && !allergies.includes(selectedValue)) {
        const newAllergies = [...allergies, selectedValue];
        setAllergies(newAllergies);
        setAllergyInput('');
        onAllergyChange(newAllergies);
      }
    } else {
      // Allow adding custom intolerances even if not in the predefined list
      if (selectedValue && !intolerances.includes(selectedValue)) {
        const newIntolerances = [...intolerances, selectedValue];
        setIntolerances(newIntolerances);
        setIntoleranceInput('');
        onIntoleranceChange(newIntolerances);
      }
    }
  };

  const removeItem = (itemToRemove, type) => {
    if (type === 'allergy') {
      const newAllergies = allergies.filter(item => item !== itemToRemove);
      setAllergies(newAllergies);
      onAllergyChange(newAllergies);
    } else {
      const newIntolerances = intolerances.filter(item => item !== itemToRemove);
      setIntolerances(newIntolerances);
      onIntoleranceChange(newIntolerances);
    }
  };

  const getFilteredOptions = (input, list) => {
    return list.filter(item => 
      item.toLowerCase().includes(input.toLowerCase()) || 
      input.toLowerCase() === item.toLowerCase()
    );
  };

  const getAllergyOptions = getFilteredOptions(allergyInput, allergiesList);
  const getIntoleranceOptions = getFilteredOptions(intoleranceInput, intolerancesList);

  return (
    <div style={styles.container}>
      <div style={styles.section}>
        <label style={styles.label}>Allergies:</label>
        <div style={styles.selectedContainer}>
          {allergies.map(allergy => (
            <div key={allergy} style={styles.selectedItem}>
              {allergy}
              <button 
                onClick={() => removeItem(allergy, 'allergy')} 
                style={styles.removeButton}
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <select
          value={allergyInput}
          onChange={(e) => {
            const value = e.target.value;
            // If custom option is selected or input doesn't match predefined list
            if (value || (allergyInput && !allergiesList.includes(allergyInput))) {
              handleSelect(value || allergyInput, 'allergy');
            }
          }}
          onInput={(e) => handleSearchChange(e, 'allergy')}
          style={styles.select}
        >
          <option value="">Select or type an allergy</option>
          {getAllergyOptions.map((allergy) => (
            <option key={allergy} value={allergy}>{allergy}</option>
          ))}
          {allergyInput && !allergiesList.includes(allergyInput) && (
            <option value={allergyInput}>
              {allergyInput} (Custom)
            </option>
          )}
        </select>
      </div>

      <div style={styles.section}>
        <label style={styles.label}>Intolerances:</label>
        <div style={styles.selectedContainer}>
          {intolerances.map(intolerance => (
            <div key={intolerance} style={styles.selectedItem}>
              {intolerance}
              <button 
                onClick={() => removeItem(intolerance, 'intolerance')} 
                style={styles.removeButton}
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <select
          value={intoleranceInput}
          onChange={(e) => {
            const value = e.target.value;
            // If custom option is selected or input doesn't match predefined list
            if (value || (intoleranceInput && !intolerancesList.includes(intoleranceInput))) {
              handleSelect(value || intoleranceInput, 'intolerance');
            }
          }}
          onInput={(e) => handleSearchChange(e, 'intolerance')}
          style={styles.select}
        >
          <option value="">Select or type an intolerance</option>
          {getIntoleranceOptions.map((intolerance) => (
            <option key={intolerance} value={intolerance}>{intolerance}</option>
          ))}
          {intoleranceInput && !intolerancesList.includes(intoleranceInput) && (
            <option value={intoleranceInput}>
              {intoleranceInput} (Custom)
            </option>
          )}
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
    width:"50%",
    margin:"auto"
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
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
  removeButton: {
    marginLeft: '8px',
    background: 'none',
    border: 'none',
    color: 'red',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default AllergiesAndIntolerances;
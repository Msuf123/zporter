'use client';
import { useState } from 'react';

const GeneralHealthSlider = ({ onChange ,value}) => {
  const [health, setHealth] = useState(value);

  const handleSliderChange = (e) => {
    setHealth(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div style={styles.container}>
      <div style={styles.labelContainer}>
        <label style={styles.label}>Very Bad</label>
        <label style={styles.label}>Very Good</label>
      </div>
      <input
        type="range"
        min="1"
        max="10"
        value={health}
        onChange={handleSliderChange}
        style={styles.slider}
      />
      <div style={styles.rangeLabels}>
        <span style={styles.valueLabel}>Health: {health}</span>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '20px 0',
    fontFamily: 'Arial, sans-serif',
  },
  labelContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '300px',
    marginBottom: '10px',
    fontSize: '14px',
    color: '#555',
  },
  label: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#555',
  },
  slider: {
    width: '100%',
    maxWidth: '300px',
    margin: '0 0 20px',
  },
  rangeLabels: {
    marginTop: '10px',
  },
  valueLabel: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333',
  },
};

export default GeneralHealthSlider;

'use client';
import { storage } from '@/lib/firebase';
import { useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const ECGTestHistory = ({ onECGTestChange,handleSubmitCall,ecgDetailsValue,ecgTestLocation ,ecgTestPreformedBy}) => {
  
  const [ecgDetails, setEcgDetails] = useState(ecgDetailsValue||'');
  const [testLocation, setTestLocation] = useState(ecgTestLocation||'');
  const [testPerformedBy, setTestPerformedBy] = useState(ecgTestPreformedBy||'');
  const [fileAttachment, setFileAttachment] = useState(null);
 const [filePreview, setFilePreview] = useState(null); // For image/video preview
 const uploadFileToFirebase = async () => {
    if (!fileAttachment) return;

    try {
      
      const storageRef = ref(storage, `uploads/${fileAttachment.name}`);
      const snapshot = await uploadBytes(storageRef, fileAttachment);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      // After upload, set the URL and update Firestore if needed
      console.log('File uploaded successfully. File URL:', downloadURL);
      
      // Optionally, update Firestore with the file URL
       console.log(downloadURL)

      // Update your state or perform any further actions with the URL
      // Example: setState(downloadURL) or trigger another function
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  const handleEcgHistoryChange = (e) => {
    setEcgDetails(e.target.value);
          onECGTestChange({ecgDetails,testLocation,testPerformedBy});
  };

  const handleTestLocationChange = (e) => {
    setTestLocation(e.target.value);
          onECGTestChange({ecgDetails,testLocation,testPerformedBy});
  };

  const handleTestPerformedByChange = (e) => {
    setTestPerformedBy(e.target.value);
          onECGTestChange({ecgDetails,testLocation,testPerformedBy});
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileAttachment(file);
      
      // Show image preview if it's an image file
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setFilePreview(null); // No preview for non-image files
      }

      // Call the onECGTestChange function (if needed)
      onECGTestChange({ ecgDetails, testLocation, testPerformedBy });
    }
  };

  const handleSubmit = () => {
    if (ecgDetails) {
      handleSubmitCall()
      
      setEcgDetails('');
      setTestLocation('');
      setTestPerformedBy('');
      setFileAttachment(null);
    }
  };



  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>ECG Test History</h3>

      <div style={styles.section}>
        <label style={styles.label}>ECG Test History:</label>
        <textarea
          value={ecgDetails}
          onChange={handleEcgHistoryChange}
          style={styles.textarea}
          placeholder="Enter details of your ECG test"
        />
      </div>

      <div style={styles.section}>
        <label style={styles.label}>Location of Test:</label>
        <input
          type="text"
          value={testLocation}
          onChange={handleTestLocationChange}
          style={styles.input}
          placeholder="Where was the test performed?"
        />
      </div>

      <div style={styles.section}>
        <label style={styles.label}>Performed By (Doctor/Hospital):</label>
        <input
          type="text"
          value={testPerformedBy}
          onChange={handleTestPerformedByChange}
          style={styles.input}
          placeholder="Who performed the ECG test?"
        />
      </div>

      <div style={styles.section}>
      <label style={styles.label}>Attach Image/Video:</label>
      <input
        type="file"
        accept="image/*, video/*"
        onChange={handleFileChange}
        style={styles.fileInput}
      />
      
      {/* Show image/video preview if file is an image */}
      {filePreview && (
        <div>
          <img src={filePreview} alt="Preview" style={{ maxWidth: '300px', maxHeight: '300px' }} />
        </div>
      )}

      {/* Optionally, add a button to trigger file upload */}
      {fileAttachment && (
        <button onClick={uploadFileToFirebase}>Upload File</button>
      )}
    </div>

      <button onClick={handleSubmit} style={styles.submitButton}>
        Save Details
      </button>

     
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
    maxWidth: '600px',
    margin: '0 auto',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
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
  input: {
    padding: '8px',
    fontSize: '14px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    marginBottom: '8px',
    width: '100%',
  },
  textarea: {
    padding: '8px',
    fontSize: '14px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    marginBottom: '8px',
    width: '100%',
    minHeight: '100px',
    resize: 'vertical',
  },
  fileInput: {
    padding: '8px',
    fontSize: '14px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    marginBottom: '8px',
    width: '100%',
  },
  submitButton: {
    padding: '10px 20px',
    fontSize: '14px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
  },
  historyContainer: {
    marginTop: '20px',
    borderTop: '2px solid #ddd',
    paddingTop: '10px',
  },
  subHeading: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
  },
  historyItem: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#f9f9f9',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
  },
  historyText: {
    flex: 1,
    fontSize: '14px',
  },
  removeButton: {
    padding: '5px 10px',
    fontSize: '14px',
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default ECGTestHistory;

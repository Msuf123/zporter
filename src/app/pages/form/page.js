// pages/index.js
'use client';
import { useEffect, useState } from 'react';
import GeneralHealthSlider from './InnerComponents/HealthSlider';
import HealthIssues from './InnerComponents/HealthIssues';
import AllergiesAndIntolerances from './InnerComponents/AllergiesAndIntolerance';
import BloodTypeVaccination from './InnerComponents/BloodTypeVaccination';
import SubmitButton from './InnerComponents/SubmitButton';
import MajorHistory from './InnerComponents/MajorHistory';
import ECGTestHistory from './InnerComponents/EcjTestHistory';
import { firestore } from '@/lib/firebase';
import { auth } from '@/lib/firebase';
import { collection, addDoc,updateDoc ,doc} from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';


export default function UserForm({id,generalHealthProp,imageUrlProp,hasHealthIssuesProp,allergiesProp,intolerancesProp,bloodTypeProp,vaccinationsProp,illnessProp,injuryProp,
  ECGTestProp,userNameProp,familyHistoryProp}) {
  const [generalHealth, setGeneralHealth] = useState(generalHealthProp||5);
  const [hasHealthIssues, setHasHealthIssues] = useState(hasHealthIssuesProp||{
    hasPain: 'no',
    fatigue: 'no',
    dizziness: 'no',
    otherIssues: 'no',
  });
  const [allergies, setAllergies] = useState(allergiesProp||[]);
  const [intolerances, setIntolerances] = useState(intolerancesProp||[]);
  const [bloodType, setBloodType] = useState(bloodTypeProp||'');
  const [vaccinations, setVaccinations] = useState(vaccinationsProp||[]);
  const [illness,setIllness]=useState(illnessProp||[])
  const [injury,setInjury]=useState(injuryProp||[])
  const [ECGTest,setECGTest]=useState(ECGTestProp||'')
  const [userName,setUserName]=useState(userNameProp||'')
  const [familyHistory,setFamilyHistoryProp]=useState(familyHistoryProp||'')
  const [imageUrl,setImageUrl]=useState(imageUrlProp||'')
    useEffect(() => {
      // Check if the user is already logged in
      
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (!user) {
          // Redirect to home page if already logged in
          window.location.href = 'login';
        }else{
            console.log("user name is :",user.email)
            setUserName(user.email)
        }
      });
  
      // Cleanup the listener when the component unmounts
      return () => unsubscribe();
    }, []);
  const handleSubmit = () => {
    // Handle form submission
    const formData = {
      generalHealth,
      hasHealthIssues,
      allergies,
      intolerances,
      bloodType,
      vaccinations,
      ECGTest,
      illness,
      injury,imageUrl
    };
    console.log(formData);
    console.log('hi')
    // Optionally send this data to an API or save locally
    if(!userName){
     alert("Wait while we are loading userName")
    }
    if (id) {
      console.log("id val",id)
        // Update document if `id` exists
        const docRef = doc(firestore, 'record', id); 
        // Reference to the document we want to update
        const currentDateTime = new Date();
        const formattedDateTime = `${currentDateTime.toLocaleDateString()} ${currentDateTime.toLocaleTimeString()}`;
        updateDoc(docRef, { userName,formattedDateTime, ...formData }).then((docREf)=>{
          console.log("Documetn updated")
          alert("Eamil sent to trainer")
          setTimeout(()=>{
    window.location.href = '/pages/home';
          },2000)
      
        }) .catch((error) => {
    console.error("Error adding document: ", error);
  });// Update the document with new data
        console.log('Document updated');
      }
    else{
   const usersCollectionRef = collection(firestore,"record");
const currentDateTime = new Date();
        const formattedDateTime = `${currentDateTime.toLocaleDateString()} ${currentDateTime.toLocaleTimeString()}`;
    addDoc(usersCollectionRef,{userName,...formData,formattedDateTime})
  .then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
  })
  .catch((error) => {
    console.error("Error adding document: ", error);
    alert("Error while updating doc")
  });
}
  };

  return (
    <div>
      <h1 style={style.heading}>Health Form</h1>
      
      <GeneralHealthSlider value={generalHealth} onChange={setGeneralHealth} />
      <HealthIssues onChange={setHasHealthIssues} value={hasHealthIssues} />
      <AllergiesAndIntolerances 
        onAllergyChange={setAllergies} 
        onIntoleranceChange={setIntolerances}
        valueOfintolerances={intolerancesProp} 
        valueOfAllergies={allergiesProp}
      />
      <BloodTypeVaccination 
        onBloodTypeChange={setBloodType} 
        onVaccinationChange={setVaccinations} 
        bloodTypeValue={bloodTypeProp}
        vaccinationValue={vaccinationsProp}
      />
      <MajorHistory onIllnessChange={setIllness} onFamilyHistoryChange={setFamilyHistoryProp} familyHistoryProp={familyHistoryProp} onInjuryChange={setInjury} illnesshistoryProp={illnessProp} injuryHistoryProp={injuryProp} ></MajorHistory>
      {ECGTestProp?<ECGTestHistory ecgDetailsValue={ECGTestProp.ecgDetails} ecgTestLocation={ECGTestProp.testLocation} ecgTestPreformedBy={ECGTestProp.testPerformedBy}
       onECGTestChange={setECGTest} handleSubmitCall={handleSubmit} imageUrl={imageUrl} changeImageUrl={setImageUrl}></ECGTestHistory>:
       <ECGTestHistory onECGTestChange={setECGTest} handleSubmitCall={handleSubmit} imageUrl={imageUrl} changeImageUrl={setImageUrl}></ECGTestHistory>
       }
      
     
    </div>
  );
}
const style={
  outer:{

  },
  heading:{
    textAlign:"center"
  }
}
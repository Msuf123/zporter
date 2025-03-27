"use client";

import { useParams } from 'next/navigation'; // Import useParams instead of useRouter
import { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '@/lib/firebase';
import UserForm from '../../form/page';

const EditPage = () => {
  const params = useParams(); // Use useParams for App Router
  const id = params.id; // Directly access the id from params
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const db = getFirestore(app);
        const docRef = doc(db, 'record', id);
        const docSnapshot = await getDoc(docRef);
        
        if (docSnapshot.exists()) {
          console.log(docSnapshot.data());
          setData(docSnapshot.data());
        } else {
          console.error('No document found!');
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, [id]);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit Data</h1>
      <UserForm id={id} generalHealthProp={data.generalHealth} hasHealthIssuesProp={data.hasHealthIssues} intolerancesProp={data.intolerances} allergiesProp={data.allergies}
      bloodTypeProp={data.bloodType} vaccinationsProp={data.vaccinations} injuryProp={data.injury} illnessProp={data.illness} ECGTestProp={data.ECGTest}
      imageUrlProp={data.imageUrl}
      ></UserForm>
    </div>
  );
};

export default EditPage;
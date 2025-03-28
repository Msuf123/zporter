// Import Firebase SDK
import { firestore } from "@/lib/firebase";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore"; 
import {  addDoc,updateDoc ,doc} from "firebase/firestore";
// Initialize Firestore
const db=firestore

// Function to fetch user data based on the username
async function getUserData(username) {
  try {
    // Create a reference to your collection
    const usersRef = collection(db, "record"); // Assuming "ECGTest" is the collection name
    
    // Create a query to search for the specified username
    const q = query(usersRef, where("userName", "==", username));
    
    // Execute the query
    const querySnapshot = await getDocs(q);
    // console.log(querySnapshot)
    // Check if the document exists
    let array=[]
    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data());
        array.push({idDoc:doc.id,...doc.data()})
        // You can also process or return the data here
      });
      return array
    } else {
      console.log("No matching records found");
      return []
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return []
  }
}

// Call the function with the specific username
async function getUserCoach(username) {
  try{
   const usersRef=collection(db,"coach")
   const q = query(usersRef, where("userName", "==", username));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot)
    let array=[]
  if(!querySnapshot.empty){
    querySnapshot.forEach((doc)=>{
      array.push(doc.data())
    })
    return array
  }
  else{
    console.log("empyt coach")
    return array
  }
  }catch(e){
       console.log(e)
       return []
  }
}
async function addCoachEmailId(userName,emailId){
  const usersCollectionRef = collection(firestore,"coach");
return addDoc(usersCollectionRef,{userName,emailId}).then((docRef) => {
    
    return true
  })
  .catch((error) => {
    console.error("Error adding document: ", error);
    return false
  });
}
async function updateCoachEmailId(userName, newEmailId) {
  try {
    // Get a reference to the collection of coaches
    const usersRef = collection(db, "coach");
    const q = query(usersRef, where("userName", "==", userName));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Loop through all the documents in the querySnapshot
      for (const docSnap of querySnapshot.docs) {
        const docRef = doc(db, "coach", docSnap.id); // Get the document reference by doc id
        
        // Update the emailId field
        await updateDoc(docRef, {
          emailId: newEmailId,
        });

        console.log("Email updated successfully for document ID:", docSnap.id);
      }
      
      return true; // Return success after updating all documents
    } else {
      console.log("No coach found with this username.");
      return false; // Return failure if no coach is found
    }
  } catch (e) {
    console.log("Error updating email: ", e);
    return false; // Return failure on error
  }
}


export {getUserData,getUserCoach,addCoachEmailId,updateCoachEmailId}

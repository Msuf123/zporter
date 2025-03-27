// Import Firebase SDK
import { firestore } from "@/lib/firebase";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore"; 

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
    console.log(querySnapshot)
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
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

// Call the function with the specific username

export {getUserData}

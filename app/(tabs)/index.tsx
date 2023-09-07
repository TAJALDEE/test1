import { StyleSheet } from 'react-native';
import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import React, { useEffect, useState } from 'react';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StoryItem from '../../components/StoryItem';

export default function TabOneScreen() {
  
  useEffect(() => {
    const fetchDoc = async () => {
      try {
        // making an instance from db
        const docRef = doc(db, 'isdataupdated', 'lastupdate');
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          const firebaseTimestamp = docSnap.data().lastdate; 
  
          // Retrieve locally stored timestamp
          const localTimestamp = await AsyncStorage.getItem('localTimestamp');
  
          const firestoreTimestamp = firebaseTimestamp.toMillis(); // Convert Firestore Timestamp to milliseconds
          // compare
          if (localTimestamp && Number(localTimestamp) === firestoreTimestamp) {
            console.log('Timestamps are the same. Good to go.');
          } else {
            console.log('Timestamps are different.');
  
            //update stories 
            getStoryDocumentFields();
            

            // Update local timestamp with the fetched timestamp from Firebase
            await AsyncStorage.setItem('localTimestamp', firestoreTimestamp.toString());
            console.log('Local timestamp updated.');
          }
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchDoc();
  }, []);

 // Save the document names locally using AsyncStorage
 async function getStoryDocumentFields() {
  const querySnapshot = await getDocs(collection(db, 'stories'));
  const documentFields: { title: any; categories: any; description: any; }[] = [];

  querySnapshot.forEach((doc) => {
      const documentData = doc.data(); // Get all fields of the document
      const { title, categories, description } = documentData; // Extract specific fields if they exist
      const documentInfo = {
          id: doc.id,
          key:doc.id,
          title,
          categories,
          description,
      };
      documentFields.push(documentInfo);
  });

  try {
      await AsyncStorage.setItem('storyitems', JSON.stringify(documentFields));
  } catch (error) {
      console.error('Error saving data locally:', error);
  }
  return documentFields;
}
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});




// useEffect(() => {
//   const fetchCollection = async () => {
//     const collectionRef = collection(db, 'stories');
//     const querySnapshot = await getDocs(collectionRef);

//     const fetchedStories = querySnapshot.docs.map((docSnap) => {
//       const storyData = docSnap.data();
//       return (
//         <StoryItem
//           key={docSnap.id}
//           id={docSnap.id}
//           title={storyData.title}
//           categories={storyData.categories}
//           description={storyData.description}
//         />
//       );
//     });

//       // Save the fetched stories locally
//       await AsyncStorage.setItem('localStories', JSON.stringify(fetchedStories));
//       console.log('Stories saved locally.');

//     setStories(fetchedStories);
//   };

//   fetchCollection();
// }, []);



// const onPressobject = (id: string) => {
//   return (
//     <Link to={`textread/${id}`}><Text>Go to TextRead</Text></Link>
//   );
// };
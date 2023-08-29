import React, { useCallback, useEffect, useState } from 'react';
import { TextInput, Pressable  } from 'react-native';
import { Text, View, } from '../components/Themed';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Constants from 'expo-constants';

const UserInputScreen = () => {
  console.log('R')

  const [info, setInfo] = useState({
    username:'user',
    email: 'user@scarytext.factionstoris',
    age: '0',
    gender: 'human',
    country: 'earth',
  });

  const handleInputChange = useCallback((key: string, text: string) => {
    setInfo((prevInfo) => ({ ...prevInfo, [key]: text }));
  }, []);

  const [submitted, setSubmitted] = useState(false);
  //const [dbuploded, setdbuploded] = useState(false);
  
  const handleSubmit = async () => {
    try{
        // Save the info object to AsyncStorage as a JSON string
    await AsyncStorage.setItem('userInfo', JSON.stringify(info));
    console.log('Data saved successfully.');
    // Perform actions with the submitted data
    console.log('Submitted Data:', info);
    setSubmitted(true);
    try{await uploadInfo(); } catch (er){console.log(er);} // upload to db
    } catch(e){console.log(e);}
  };

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const userInfoString = await AsyncStorage.getItem('userInfo');
        if (userInfoString !== null) {
          const userInfo = JSON.parse(userInfoString);
          setInfo(userInfo);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
  
    loadUserInfo();
  }, []);

  const uploadInfo = async () => {
    try {
      const infouploder = doc(db, "usersN", Constants.installationId); 
      await setDoc(infouploder, info, { merge: true });
      console.log("the user info is uploaded to db");
    } catch (error) {
      console.error("Error uploading user info to db", error);
    }
  };

  function checking (){
    console.log(info)
  }
  return (
    <View style={styles.container}>
      
      {!submitted ? (
        <>
        <Pressable  onPress={checking}>
        <Text style={styles.labelText}>check</Text> 
        </Pressable >
          <Text style={styles.labelText}>Username</Text>
          <TextInput
            style={styles.form}
            placeholder="Username"
            value={info.username}
            onChangeText={(text) => handleInputChange('username', text)}
          />
         <Text style={styles.labelText}>Email</Text>
          <TextInput
            style={styles.form}
            placeholder="Email"
            value={info.email}
            onChangeText={(text) => handleInputChange('email', text)}
          />
             <Text style={styles.labelText}>Age</Text> 
          <TextInput
            style={styles.form}
            placeholder="Age"
            value={info.age}
            onChangeText={(text) => handleInputChange('age', text)}
            keyboardType="numeric" 
          />
           <Text style={styles.labelText}>Gender</Text>
          <TextInput
            style={styles.form}
            placeholder="Gender"
            value={info.gender}
            onChangeText={(text) => handleInputChange('gender', text)}
          />
             <Text style={styles.labelText}>Country</Text>
          <TextInput
            style={styles.form}
            placeholder="Country"
            value={info.country}
            onChangeText={(text) => handleInputChange('country', text)}
          />
          <Pressable onPress={handleSubmit}><Text>Update info</Text></Pressable>
        </>
      ) : (
        <Text>Hi {info.username}.</Text>
      )}
    </View>
  );
};

export default UserInputScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  form: {
    color: 'green',
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  labelText: {
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'left',
  },
  labelContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 8,
    backgroundColor:'red',
  },
});

import React, { Component } from 'react';
import { Text, View, StyleSheet, Pressable  } from 'react-native';
import { setDoc, doc } from "firebase/firestore"; 
import { db } from '../../firebase';


  class MessageUploader extends Component {
    uploadMessages = async () => {
      const storyData = {
        title: "Story Title", // Set your desired story title here
        thestory: [
        {
          id: 1,
          sender: "John",
          content: "Hello there!",
        },
        {
          id: 2,
          sender: "Jane",
          content: "How are you?",
        },
        {
          id: 3,
          sender: "Jane",
          content: "How are you?",
        },
        {
          id: 4,
          sender: "John",
          content: "How are you?",
        },
        {
          id: 5,
          sender: "John",
          content: "How are you?",
        },
        {
          id: 6,
          sender: "Jane",
          content: "How are you?",
        },
        {
          id: 7,
          sender: "John",
          content: "How are you?",
        },
        {
          id: 8,
          sender: "John",
          content: "How are you?",
        },
        {
          id: 9,
          sender: "John",
          content: "How are you?",
        },
        {
          id: 10,
          sender: "John",
          content: "How are you?",
        },
        {
          id: 11,
          sender: "John",
          content: "How are you?",
        },
        {
          id: 12,
          sender: "John",
          content: "How are you?",
        },
        {
          id: 13,
          sender: "John",
          content: "How are you?",
        },
          // ... (other message objects)
        ],
      };
        
    

      try {
        const messagesDocRef = doc(db, "stories", "story3"); // Change "unique_document_id" to an appropriate ID
  
        await setDoc(messagesDocRef, storyData);
        console.log("Messages and title uploaded to Firestore");
      } catch (error) {
        console.error("Error uploading messages and title:", error);
      }
    };
  
    render() {
      return (
        <>
        <View style={styles.container}>
          <Pressable  onPress={this.uploadMessages} >
            <Text>Upload Messages</Text>
            </Pressable>
        </View>
        </>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#2c3e50',
    },
  });

export default MessageUploader;

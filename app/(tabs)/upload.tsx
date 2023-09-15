import React, { Component } from 'react';
import { StyleSheet, TextInput, Button, ScrollView } from 'react-native';
import { collection, addDoc, Firestore, setDoc, doc } from 'firebase/firestore'; // Import Firestore methods
import { Text, View } from '../../components/Themed';
import { db } from '../../firebase';

interface MessageUploaderProps {
  firestore: Firestore;
}

interface MessageUploaderState {
  title: string;
  thestory: Message[]; // Change 'messages' to 'thestory' here
  newSender: string;
  newContent: string;
}

interface Message {
  id: number;
  sender: string;
  content: string;
}

class MessageUploader extends Component<MessageUploaderProps, MessageUploaderState> {
  constructor(props: MessageUploaderProps) {
    super(props);
    this.state = {
      title: "",
      thestory: [], // Change 'messages' to 'thestory' here
      newSender: "",
      newContent: "",
    };
  }

  // Method to add a new message to the story
  addMessage = () => {
    const { newSender, newContent, thestory } = this.state; // Change 'messages' to 'thestory' here

    if (!newSender || !newContent) {
      alert("Please enter both sender and content.");
      return;
    }

    // Generate a new message object with a unique ID
    const newMessage: Message = {
      id: thestory.length + 1, // Automatically increment the ID
      sender: newSender,
      content: newContent,
    };

    // Update the 'thestory' array
    const updatedTheStory = [...thestory, newMessage]; // Change 'messages' to 'thestory' here

    this.setState({
      thestory: updatedTheStory, // Change 'messages' to 'thestory' here
      newSender: "",
      newContent: "",
    });
  };

  // Method to upload the story to Firestore
  uploadStory = async () => {
    const { title, thestory } = this.state; // Change 'messages' to 'thestory' here

    if (!title || thestory.length === 0) { // Change 'messages' to 'thestory' here
      alert("Please enter a title and at least one message.");
      return;
    }

    const storyData = {
      title,
      thestory, // Change 'messages' to 'thestory' here
    };

    try {
      // Create a reference to the Firestore document
      const storyRef = doc(db, 'stories', title);
  
      // Set the document data with merge: true to update or create the document
      await setDoc(storyRef, storyData, { merge: true });
  
      console.log("Story uploaded to Firestore");
  
      // Optionally, you can reset the input fields here
      this.setState({
        title: "",
        thestory: [],
        newSender: "",
        newContent: "",
      });
  
      // Update the timestamp in another collection/document
      const currentTime = new Date(); // Get the current timestamp
      const updateData = {
        lastdate: currentTime,
      };
  
      // Create a reference to the Firestore document where you want to update the timestamp
      const updateRef = doc(db, 'isdataupdated', 'lastupdate');
  
      // Set the 'lastUpdate' field in the other document
      await setDoc(updateRef, updateData, { merge: true });
  
      console.log("Timestamp updated in the other collection/document.");
    } catch (error) {
      console.error("Error uploading story:", error);
    }
  };

  render() {
    const { title, thestory, newSender, newContent } = this.state; // Change 'messages' to 'thestory' here

    return (
      <View style={styles.container}>
        <Text>Story Title:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ title: text })}
          value={title}
        />

        <Text>New Sender:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ newSender: text })}
          value={newSender}
        />

        <Text>New Content:</Text>
        <TextInput
          style={[styles.input, styles.contentInput]}
          onChangeText={(text) => this.setState({ newContent: text })}
          value={newContent}
          multiline
        />

        <Button title="Add Message" onPress={this.addMessage} />

        <ScrollView style={styles.messageList}>
          {thestory.map((message: { id: React.Key | null | undefined; sender: any; content: any; }) => ( // Change 'messages' to 'thestory' here
            <View key={message.id} style={styles.messageItem}>
              <Text>{`Sender: ${message.sender}`}</Text>
              <Text>{`Content: ${message.content}`}</Text>
            </View>
          ))}
        </ScrollView>

        <Button title="Upload Story" onPress={this.uploadStory} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor:'green',
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 16,
  },
  contentInput: {
    height: 100,
  },
  messageList: {
    marginTop: 16,
  },
  messageItem: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 8,
  },
});

export default MessageUploader;

import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState, useRef } from 'react';
import {  StyleSheet, ScrollView, Pressable  } from 'react-native';
import { Text, View } from '../components/Themed';
import { doc, getDoc } from "firebase/firestore";
import {db} from '../firebase'
//import { BottomSheetSlideInSpec } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionSpecs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome, Ionicons } from '@expo/vector-icons';


interface Message {  id: number;  sender: string;  content: string; }

// style by sender 
const ChatMessage: React.FC<{ message: Message }> = ({ message }) => {
  const { sender, content, } = message;
  const messageStyle = sender === 'John' ? styles.johnMessage : styles.janeMessage;
  return (
    <View style={[styles.message, messageStyle]}>
      <Text style={styles.Text}>{sender}</Text>
      <Text style={styles.Text}>{content}</Text>
  
    </View>
  );
};

const Chat = () => {
  const views = []
  const [chat, setChat] = useState<Message[]>([]);
  const [messages, setmessages] = useState([
    { id: 1, sender: 'John', content: 'Hello!'  },
    { id: 2, sender: 'Jane', content: 'Hi John!' },
    { id: 3, sender: 'John', content: 'how are you?' },
    // Add more messages here
  ] );

     // id passed from story 
     const route = useRoute();
     const { objectId } = route.params as { objectId: string };
     useEffect(() => {
       console.log('Object id:', objectId);
     }, [objectId]);
  
  const [isDataFetched, setIsDataFetched] = useState(false);

  // firestore getting ino from database
  useEffect(() => {
    const fetchDoc = async () => {
      if (!isDataFetched && objectId) {
        const docRef = doc(db, "stories", objectId);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          const storyData = docSnap.data();
          const messages = storyData?.thestory || [];
          console.log("The Story:", messages);
          setmessages(messages);
        } else {
          console.log("No such document!");
        }
  
        setIsDataFetched( true); // Mark data as fetched
      }
    };
    fetchDoc();
  }, [objectId, isDataFetched]);
  
 
// onclick
  const handleClick = () => {
    console.log(messages);
    const lastMessage = chat.length > 0 ? chat[chat.length - 1].id : 0;
    const newMessage = messages.find((message) => message.id === lastMessage + 1);

    if (newMessage) {
      setChat((prevChat) => [...prevChat, newMessage]);
    }
  };


  //follow last massage
  const scrollViewRef = useRef<ScrollView>(null);
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [chat]);


  function Icon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
  }) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
  }

  
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView
  contentContainerStyle={styles.scrollContainer}
  ref={scrollViewRef}
  onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
>
         <View>
           <Text style={styles.objectIdText}>{objectId}</Text>
         </View>

        <View style={styles.line}></View> 
        <View style={styles.chatContent}>
          {chat.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </View>
      </ScrollView>
      <View style={styles.buttoncontainer}>
        <View style={styles.buttonBox}>
        <Pressable  style={styles.newMessageButton} onPress={handleClick}>
        <Ionicons name="arrow-forward-outline" size={20} color="white" />
        <Text style={styles.newMessageText}>Start a New Message</Text>
      </Pressable >
        </View>
        </View>
      </SafeAreaView>
  );
  
  
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap:'nowrap',
    alignItems: 'stretch',
    justifyContent: 'center', // Center content vertically and horizontally
    backgroundColor: '#ff',
  },
  scrollContainer: {
    justifyContent: 'center', // Center content vertically
  },

  Text:{
    color:'white',
  },
 
  objectIdText: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf:'center',
    
  },
  line: {
    borderBottomWidth: 1,
    borderColor: 'gray', // You can adjust the line color
    marginVertical: 10,  // Add some vertical margin
  },

  chatContent: {
    color:'red',
    paddingTop: 20, // Add padding to create space between Object ID and first chat message
  },
  message: {
    borderWidth:1,
    borderRadius:25,
    backgroundColor:'rgb(36,46,55)',
    padding: 10,
    marginBottom: 10,
  },
  johnMessage: {
    alignSelf: 'flex-start',
    backgroundColor:'rgb(29,155,240)',
  },
  janeMessage: {
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    backgroundColor:'rgb(47,51,54)',
    
  },
  button: {
    marginTop: 2,
    padding: 25,
    borderRadius: 5,
    width: '75%',
    height:'90%',
    alignSelf:'flex-start',
  },

  buttoncontainer: {  
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  buttonBox: {
    padding: 10,
    borderRadius: 10,
    width: '100%',
 
  },
  newMessageButton: {
    flexDirection: 'row',
    backgroundColor:'rgb(47,51,54)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
  },
  newMessageText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },

});

export default function ChatScreen({ objectId }: { objectId: string }) {
  return <Chat />;
} 

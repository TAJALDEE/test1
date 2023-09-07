
import { Text, View } from '../../components/Themed';
// StoryListScreen.js
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Pressable , Image, ScrollView, SafeAreaView, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Define a type for your story items
type StoryItem = {
  id: string; // Added 'id' property to uniquely identify each story
  title?: string;
  categories?: string;
  description?: string;
};

const StoryListScreen = () => {
  const navigation = useNavigation();
  const toTextRead = (id: string) => {
    navigation.navigate('textread', { objectId: id });
  };

  const [storyItems, setStoryItems] = useState<StoryItem[]>([]);

  useEffect(() => {
    // Function to fetch the stored items from AsyncStorage
    const fetchStoryItems = async () => {
      try {
        const storedItemsJSON = await AsyncStorage.getItem('storyitems');
        if (storedItemsJSON) {
          // If items exist in AsyncStorage, parse and set them
          const storedItems = JSON.parse(storedItemsJSON) as StoryItem[];
          setStoryItems(storedItems);
        }
      } catch (error) {
        console.error('Error reading story items from AsyncStorage: ', error);
      }
    };

    fetchStoryItems();
  }, []);

  const renderStoryItems = ({ id, title, description }: StoryItem) => {
    return (
      <Pressable
        style={styles.storyContainer}
        onPress={() => toTextRead(id)} // Fixed the function call and passed 'id'
      >
        <Image
          style={styles.icon}
          source={{
            uri: 'https://cdn2.iconfinder.com/data/icons/leto-most-searched-mix-3/64/__mobile_social_media_marketing-256.png',
          }}
        />
        <View style={styles.contentcontainer}>
          <View style={styles.textContainer}>
            <Text style={styles.name}>
              {title} {!title && <View style={styles.line} />}{' '}
              {!description && <View style={styles.line} />}
            </Text>
            {description !== undefined && (
              <Text style={styles.description}>{description}</Text>
            )}
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={[styles.container, { paddingBottom: 20 }]}>
        <View>
          <Text style={styles.tabTitle}>Reader</Text>
          {storyItems.map((item) => (
            <View key={item.id}>{renderStoryItems(item)}</View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StoryListScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
    padding: 10,
  },
  storyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  contentcontainer:{
    width:'80%',
  },
  textContainer: {
  width:'100%',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#fff',
  },
  description: {
    fontSize: 14,
    color: '#ccc',
  },
  tabTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#fff',
  },
   line: {
    borderBottomWidth: 1,
    borderColor: 'gray', // You can adjust the line color
    marginVertical: 10,  // Add some vertical margin
    width: '100%',  
  },
});
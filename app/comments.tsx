// CommentScreen.js
import React from 'react';
import { View, Text, } from '../components/Themed';
import {StyleSheet, Image} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useColorScheme } from 'react-native';

const CommentScreen = () => {
  // Dummy comment data
  const comments = [
    { id: '1', text: 'This is comment 1', icon: 'https://cdn2.iconfinder.com/data/icons/leto-most-searched-mix-3/64/__mobile_social_media_marketing-256.png' },
    { id: '2', text: 'This is comment 2', icon: 'https://cdn2.iconfinder.com/data/icons/leto-most-searched-mix-3/64/__mobile_social_media_marketing-256.png' },
    { id: '3', text: 'This is comment 3', icon: 'https://cdn2.iconfinder.com/data/icons/leto-most-searched-mix-3/64/__mobile_social_media_marketing-256.png' },
    // Add more comments as needed
  ];
  

  return (
    <View style={styles.container}>
      {/* Icon Container */}
      <View style={styles.iconContainer} >
        <Image
          style={styles.iconImage}
          source={{
            uri: 'https://cdn2.iconfinder.com/data/icons/leto-most-searched-mix-3/64/__mobile_social_media_marketing-256.png',
          }}
        
        />
      </View>

      <Text style={styles.header}>Comments</Text>
      <FlashList
        data={comments}
        renderItem={({ item }) => (
          <View style={styles.commentContainer}>
            <Text>icon:</Text> 
            <Image style={styles.commentIcon} source={{ uri: item.icon }}/>
            <Text style={styles.commentText}>{item.text}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        estimatedItemSize={73}
      />
    </View>
  );
};

export default CommentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#000', // Background color set to black
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#fff', // Header text color set to white
  },
  commentContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)', // Comment background color
    borderRadius: 8,
  },
  commentText: {
    fontSize: 16,
    color: '#fff', // Comment text color set to white
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  iconImage: {
    width: 100,
    height: 100,
  },
  commentIcon: {
    width: 40, // Adjust the width as needed
    height: 40, // Adjust the height as needed
    marginRight: 10, // Add some margin to separate the icon from text
  },
});

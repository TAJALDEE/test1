import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';

interface Story {
  id: string;
  title: string;
  categories: string[];
  description: string;
}
const navigation = useNavigation();

const totextread = (id: string) => {
  navigation.navigate('textread', { objectId: id });
};

const StoryItem = ({ id, title, categories, description }: Story) => {
  return (
    <Pressable style={styles.storyContainer} onPress={() => totextread(id)}>
      <Image
        style={styles.icon}
        source={{
          uri: 'https://cdn2.iconfinder.com/data/icons/leto-most-searched-mix-3/64/__mobile_social_media_marketing-256.png',
        }}
      />
      <View style={styles.contentcontainer}>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{title} {!title && <View style={styles.line} />} {!description && <View style={styles.line} />}</Text>
          {description !== null && (
            <Text style={styles.description}>{description}</Text>
          )}
        </View>
      </View>
    </Pressable>
  );
};

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

export default StoryItem;

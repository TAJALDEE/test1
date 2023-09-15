import React from 'react';
import { Pressable , StyleSheet ,View} from 'react-native';
import { Text } from '../../components/Themed';
import { Link, useNavigation } from 'expo-router';
import { Link as Lin } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

const Profile = () => {
  const navigation = useNavigation();
  //function goToLogin() {navigation.navigate('infocollecter');}
  return (
    <View style={styles.container}>
     
       <Pressable  style={styles.section}>
        <Link href = '/infocollecter'>
       <View >
        <Text style={styles.sectionTitle}>
          <FontAwesome name='user' size={16} color="#FF0000" style={styles.icon} />
          user info </Text>
      </View>
      </Link>
      </Pressable >

       <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <FontAwesome name='heart' size={16} color="#FF0000" style={styles.icon} />
          Favorites
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <FontAwesome name='history' size={16} color="#FF0000" style={styles.icon} />
          History
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <FontAwesome name='archive' size={16} color="#FF0000" style={styles.icon} />
          comments History
        </Text>
      </View>
    
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <FontAwesome name='gear' size={16} color="#FF0000" style={styles.icon} />
          setting
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <FontAwesome name="angellist" size={16} color="#FF0000" style={styles.icon} />
          become a special member 
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
 
  section: {
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    width: '80%',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  icon: {
    marginRight: 5,
  },
});

export default Profile;

import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../fireBaseConfig';
import CustomButton from "../components/CustomButton";
import Icon from 'react-native-vector-icons/FontAwesome';
import { router } from 'expo-router';

const Profile = () => {
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser); 
    }
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('User signed out successfully');
      router.replace('/auth/sign-in'); 
    } catch (error) {
      console.error('Error signing out: ', error);
      Alert.alert('Error', 'Failed to sign out. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Profile</Text>

      <Image
        source={
          require('../assets/images/profile.png') 
        }
        style={styles.profileImage}
      />
<Text style={{marginTop: 20, textAlign: 'center'}}>  <Icon name="exclamation-circle" size={16} color="#BF3100" style={styles.icon} /> If you would like to make any changes to your profile, please contact our support team </Text>
      <View style={styles.separator} />


      <View style={styles.infoContainer}>
        <Text style={styles.label}>Name:</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>{user?.displayName || 'N/A'}</Text>
        </View>

        <Text style={styles.label}>Email:</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>{user?.email || 'N/A'}</Text>
        </View>
      </View>

      <CustomButton title="Sign Out" handlePress={handleSignOut} style={styles.signOutButton} />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 25,
    
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 16,
  },
  infoContainer: {
    width: '100%',
    paddingHorizontal: 16,
    marginVertical: 20
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoBox: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 35,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
  },
  signOutButton: {
    marginTop: 15,
    width: 380,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
});

import { View } from 'react-native'
import React from 'react'
import CustomButton from "../components/CustomButton";
import { signOut } from 'firebase/auth';  
import { router } from 'expo-router';
import {auth} from '../fireBaseConfig'

const Profile = () => {
    
const handleSignOut = async () => {
  try {
    await signOut(auth);  
    console.log('User signed out successfully');
 
    router.push('/auth/sign-in');
  } 
  catch (error) {
    console.error('Error signing out: ', error);
  }
}

  return (
    <View>
      <CustomButton title="Sign out" handlePress={handleSignOut}/>
    </View>
  )
}

export default Profile;
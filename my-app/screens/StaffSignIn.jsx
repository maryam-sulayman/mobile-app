import { Text , StyleSheet, View,   TouchableOpacity, Alert} from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../components/FormField'
import CustomButton from '../components/CustomButton'
import {router} from 'expo-router'
import Icon from 'react-native-vector-icons/FontAwesome';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../fireBaseConfig";

const StaffSignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
 })

 const handleSignIn = async () => {
  try {
    setIsSubmitting(true)
    const userCredential = await signInWithEmailAndPassword(auth, form.email, form.password);
    const user = userCredential.user;
    router.replace('/auth/staff-dashboard');
  } 
  catch (error) {
    Alert.alert('Login Failed', error.message);
  } 
  finally {
    setIsSubmitting(false)
  }
};
const goToSignIn= () => {
  router.navigate("/auth/sign-in");
};

  return (
  
<SafeAreaView style={styles.background}>
      <View style={styles.container}>
      <Text style={styles.title}>
          Staff sign in
        </Text>

         <FormField
         title="Email"
         value= {form.email}
         handleChangeText={(e) => {
          setForm({ ...form, email: e });
        }}
         keyboardType= 'email-address'
         style={styles.form}
         />
        <FormField
         title="Password"
         handleChangeText={(e) => {
          setForm({ ...form, password: e });
        }}
         value= {form.password}
         style={styles.form}
         />

        <CustomButton title="Sign in" 
        style= {styles.button}
        handlePress={handleSignIn} 
        isLoading={isSubmitting}
      />
      <View style={styles.returnContainer}>
        <Text style={styles.returnText}>  <Icon name='exclamation'size={18} color="red"/> Not a member of staff?</Text>
        <TouchableOpacity onPress={goToSignIn}>
          <Text style={styles.returnLink}>Return to sign in page</Text>
        </TouchableOpacity>
      </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
   backgroundColor: 'linear-gradient(109.6deg, rgb(36, 45, 57) 11.2%, rgb(16, 37, 60) 51.2%, rgb(0, 0, 0) 98.6%);',
   height: '100%'
  } , 
container:{
  marginTop: 100,  
  backgroundColor: 'white',
  paddingHorizontal: 20,
  paddingVertical: 30,
  borderRadius: 15,
},
title: {
  fontWeight: 700,
  fontSize: 24,
  textAlign: 'center',
  marginTop: 10,
  marginBottom: 20,
  color: '#06102F'
},
form: {
  marginBottom: 20,
},
signInContainer: {
  flexDirection: 'row',
  gap: 4,
  marginVertical: 13,
  justifyContent: 'center'
},
signInText: {
  fontSize: 15
},
button: {
  marginTop: 40,
  textAlign: "center",
},
signInLink: {
  color: '#06102F',
  fontWeight: 700,
  fontSize: 15
},
returnContainer: {
  flexDirection: 'row',
  gap: 5,
  marginTop: 20,
  justifyContent: 'center',
  alignItems: 'center'
},
returnLink: {
  fontWeight: 600,
  fontSize: 15,
  textDecorationLine: 'underline',
},
returnText: {
  fontSize: 16
}
})


export default StaffSignIn
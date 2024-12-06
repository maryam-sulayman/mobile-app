import React, {useState} from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import FormField from "../components/FormField";
import {router} from 'expo-router'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../fireBaseConfig';

export default function SignIn() {
const [isSubmitting, setIsSubmitting] = useState(false) 
const [form, setForm] = useState({
   email: '',
   password: ''
})
const submit = async () => {
  try {
    await signInWithEmailAndPassword(auth, form.email, form.password);
    router.replace('/auth/dashboard');
    setIsSubmitting(true);
  } 
  catch (error) {
    console.error('Error signing in:', error.message);

    alert(error.message);
  } finally {
    setIsSubmitting(false); 
  }
};

const goToSignUp = () => {
  router.push('/auth/sign-up');
}
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Sign in</Text>
         <FormField
         title="Email"
         value= {form.email}
         handleChangeText= {(e)=> {setForm({...form, email: e})}}
         keyboardType= 'email-address'
         style={styles.form}
         />

        <FormField
         title="Password"
         value= {form.password}
         handleChangeText= {(e)=> {setForm({...form, password: e})}}
         style={styles.form}
         />

        <CustomButton title="Sign in" 
        style= {styles.button}
        handlePress={submit} 
        isLoading={isSubmitting}
        />
        <View style={styles.signUpContainer}>
          <Text>Don't have an account?</Text>
          <TouchableOpacity onPress={goToSignUp}>
          <Text style={styles.signUpLink}>Sign up</Text>
        </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
container:{
marginVertical: 200,
marginHorizontal: 20
},
title: {
fontWeight: 700,
fontSize: 20
},
form: {
 marginTop: 20
},
signUpContainer: {
  flexDirection: 'row',
  gap: 3,
  marginVertical: 10,
},
button: {
  backgroundColor: '#2D1049',
},
signUpLink: {
  color: '2D1049',
  fontWeight: 700
}
})

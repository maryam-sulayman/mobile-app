import React, {useState} from "react";
import { StyleSheet, View, Text } from "react-native";
import {router} from 'expo-router'
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import FormField from "../components/FormField";
import {Link} from 'expo-router'
import {auth, database} from '../fireBaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';

export default function SignUp() {
const [isSubmitting, setIsSubmitting] = useState(false) 
const [error, setError] = useState('')
const [form, setForm] = useState({
   name: '',
   email: '',
   password: ''
})
const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
  };

const submit = async () => {
if (form.name === '' || form.email === '' || form.password === ''){
    setError('error')
    return;
}
if (!validateEmail(form.email)) {
    setError('Invalid email format');
    return;
  }

  if (form.password.length < 6) {
    setError('Password should be at least 6 characters');
    return;
  }
setIsSubmitting(true);
setError(null);

try{
    const userDetails = await createUserWithEmailAndPassword(auth, form.email, form.password)
    const user = userDetails.user
    const userRef = ref(database, 'users/' + user.uid);
    await set(userRef, {
      name: form.name.trim(),
      email: form.email.toLowerCase(),
      createdAt: new Date().toISOString(),
      role: 'user'
    });
    setTimeout(() => {
        router.replace('/auth/dashboard');
      })
}
catch (error) {
    setError(error.message)
    console.error('Error creating user:', error);
}
finally {
    setIsSubmitting(false);
  }
}
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Sign up</Text>
        <FormField
         title="Full name"
         value= {form.name}
         handleChangeText= {(e)=> {setForm({...form, name: e})}}
         style={styles.form}
         />

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
        {error && <Text style={styles.error}>{error}</Text>}

        <CustomButton title="Sign up" 
        style= {styles.button}
        handlePress={submit} 
        isLoading={isSubmitting}
        />
        <View style={styles.signInContainer}>
          <Text>Already have an account?</Text> 
          <Link href="/sign-in" style={styles.signInLink}>Sign in</Link>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
container:{
marginVertical: 50,
marginHorizontal: 20
},
title: {
fontWeight: 700,
fontSize: 20
},
form: {
 marginTop: 20
},
signInContainer: {
  flexDirection: 'row',
  gap: 3,
  marginVertical: 10,
},
button: {
  backgroundColor: '#2D1049',
},
signInLink: {
  color: '2D1049',
  fontWeight: 700
}
})

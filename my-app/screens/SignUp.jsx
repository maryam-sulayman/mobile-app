import React, {useState} from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView, ScrollView, Platform, Image } from "react-native";
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
const [formErrors, setFormErrors] = useState({})
const [form, setForm] = useState({
   name: '',
   email: '',
   password: '',
   confirmPassword: ''
})
const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
  };

const submit = async () => {
  let isValid = true;
  let errors = {};

if (form.name === ''){
    isValid = false;
    errors.name = 'Name is required'
}
if (form.email === '') {
    isValid = false;
    errors.email = 'Email is required';
  } else if (!validateEmail(form.email)) {
    isValid = false;
    errors.email = 'Invalid email format';
  }

    if (form.password === '') {
      isValid = false;
      errors.password = 'Password is required';
    } else if (form.password.length < 6) {
      isValid = false;
     errors.password = 'Password should be at least 6 characters';
  } else if (!/[0-9]/.test(form.password)) {
    isValid = false;
    errors.password = 'Password should include at least one number';
  } else if (!/[A-Z]/.test(form.password)) {
    isValid = false;
    errors.password = 'Password should have at least one uppercase letter';
  } else if (!/[a-z]/.test(form.password)) {
    isValid = false;
    errors.password = 'Password should have at least one lowercase letter';
  }
  
  if  (form.confirmPassword === '') {
    isValid = false;
  errors.confirmPassword = 'Please confirm password'
}
    else if (form.password !== form.confirmPassword){
    isValid = false;
    errors.confirmPassword = 'Passwords do not match'
  }

  if (!isValid) {
    setFormErrors(errors)
    return;
  }
setIsSubmitting(true);
setFormErrors({});

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
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"} 
  >
    <SafeAreaView style={styles.background}>
    <ScrollView>
      <View style={styles.container}>
      <Text style={styles.title}>
          Sign up to
          <Text style={styles.highlightedText}> Hotel</Text><Text style={{color: '#E1AF3A'}}>Hive</Text>
          <Image
            source={require("../assets/images/bee.png")}
            resizeMode="contain"
            style={styles.bee}
          />
        </Text>
        <FormField
         title="Name"
         value= {form.name}
         handleChangeText= {(e)=> {setForm({...form, name: e}); setFormErrors({...formErrors, name: ''})}}
         style={styles.form}
         error={formErrors.name}
         />


         <FormField
         title="Email"
         value= {form.email}
         handleChangeText= {(e)=> {setForm({...form, email: e});setFormErrors({...formErrors, email: ''}) }}
         keyboardType= 'email-address'
         style={styles.form}
         error={formErrors.email}
         />

        <FormField
         title="Password"
         value= {form.password}
         handleChangeText= {(e)=> {setForm({...form, password: e}); setFormErrors({...formErrors, password: ''})}}
         style={styles.form}
         error={formErrors.password}
         />

         <FormField
          title="Confirm Password" 
          value={form.confirmPassword}
          handleChangeText={(e) => { setForm({ ...form, confirmPassword: e }); setFormErrors({...formErrors, confirmPassword: ''}) }}
          style={styles.form}
          error={formErrors.confirmPassword}
        />


        <CustomButton title="Sign up" 
        style= {styles.button}
        handlePress={submit} 
        isLoading={isSubmitting}
        />
        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>Already have an account?</Text> 
          <Link href="/sign-in" style={styles.signInLink}>Sign in</Link>
        </View>
      </View>
    </ScrollView>
    </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
   backgroundColor: 'linear-gradient(114.9deg, rgb(34, 34, 34) 8.3%, rgb(0, 40, 60) 41.6%, rgb(0, 143, 213) 93.4%)',
   height: '100%'
  } , 
container:{
marginVertical: 20,
marginHorizontal: 20,
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
  backgroundColor: 'pink',
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
image: {
  width: 430,
  height: 350
},
bee: {
  width: 45,
  height: 45
},
logo: {
  flexDirection: 'row'
}
})

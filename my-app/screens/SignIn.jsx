import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform, 
  ScrollView,
} from "react-native";
import CustomButton from "../components/CustomButton";
import FormField from "../components/FormField";
import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../fireBaseConfig";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function SignIn() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    try {
      setIsSubmitting(true);
      const userCredential = await signInWithEmailAndPassword(auth, form.email, form.password);
      console.log('Signed in as:', userCredential.user);
      router.replace("/(tabs)/dashboard");
    } catch (error) {
      console.error("Error signing in:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const goToSignUp = () => {
    router.navigate("/auth/sign-up");
  };
  const goToDashboard = () => {
    router.navigate("/(tabs)/dashboard");
  };
  const goToStaffPage = () => {
    router.navigate("/auth/staff-sign-in");
  };


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
    >
      <ScrollView>
          <Image
            source={require("../assets/images/sign-in-hotel-image.jpeg")}
            style={styles.image}
          />
          <View style={styles.container}>
            <TouchableOpacity style={styles.returnContainer} activeOpacity={0.7} onPress={goToDashboard}>
            <Icon name='angle-left' size={27} color="#06102F" style={styles.icon} />
            <Text style={styles.returnText}>Return to dashboard</Text>
            </TouchableOpacity>
            <Text style={styles.title}>
              Sign in to
              <Text> Hotel</Text><Text style={{color: '#E1AF3A'}}>Hive</Text>
              <Image
                source={require("../assets/images/bee.png")}
                resizeMode="contain"
                style={styles.bee}
              />
            </Text>
            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e) => {
                setForm({ ...form, email: e });
              }}
              keyboardType="email-address"
              style={styles.form}
            />

            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e) => {
                setForm({ ...form, password: e });
              }}
              style={styles.form}
            />

            <CustomButton
              title="Sign in"
              style={styles.button}
              handlePress={submit}
              isLoading={isSubmitting}
            />
            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Don't have an account?</Text>
              <TouchableOpacity onPress={goToSignUp}>
                <Text style={styles.signUpLink}>Sign up</Text>
              </TouchableOpacity>
            </View>
              <TouchableOpacity onPress={goToStaffPage}>
              <Text style={styles.staffLogin}>Staff sign in</Text>
              </TouchableOpacity>
          </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container:{
  marginHorizontal: 20
  },
  title: {
  fontWeight: 700,
  fontSize: 24,
  textAlign: 'center',
  marginBottom: 20,
  color: '#06102F',
  },
  form: {
   marginBottom: 20,
  },
  signUpContainer: {
    flexDirection: 'row',
    gap: 4,
    marginVertical: 13,
    justifyContent: 'center'
  },
  signUpText: {
    fontSize: 16
  },
  button: {
    marginTop: 40
  },
  signUpLink: {
    color: '#06102F',
    fontWeight: 700,
    fontSize: 16
  },
  image: {
    width: 430,
    height: 350,
    position: 'relative'
  },
  bee: {
    width: 45,
    height: 45
  },
  returnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30
  },
  returnText:{
    fontSize: 16,
    marginLeft: 7,
    textDecorationLine: 'underline',
    color: '#06102F',
  },
  staffLogin: {
    fontWeight: 500,
    textDecorationLine: 'underline',
    textAlign: 'center',
    fontSize: 15,
    marginTop: 10
  }
  })
  

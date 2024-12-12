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
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import FormField from "../components/FormField";
import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../fireBaseConfig";

export default function SignIn() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      router.replace("/auth/dashboard");
      setIsSubmitting(true);
    } catch (error) {
      console.error("Error signing in:", error.message);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const goToSignUp = () => {
    router.push("/auth/sign-up");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
    >
      <ScrollView>
        <SafeAreaView>
          <Image
            source={require("../assets/images/sign-in-hotel-image.jpeg")}
            style={styles.image}
          />
          <View style={styles.container}>
            <Text style={styles.title}>
              Sign in to
              <Text style={styles.highlightedText}> Hotel</Text><Text style={{color: '#E1AF3A'}}>Hive</Text>
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
          </View>
        </SafeAreaView>
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
  marginTop: 10,
  marginBottom: 20,
  color: '#06102F'
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
    fontSize: 15
  },
  button: {
    marginTop: 40
  },
  signUpLink: {
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
  

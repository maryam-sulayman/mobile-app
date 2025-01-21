import React, { useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ref, get } from 'firebase/database';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';
import { auth, database } from '../fireBaseConfig';
import FormField from '../components/FormField';
import CustomButton from '../components/CustomButton';

const StaffSignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const router = useRouter();

  const handleSignIn = async () => {
    try {
      setIsSubmitting(true);

      const userCredential = await signInWithEmailAndPassword(auth, form.email, form.password);
      const user = userCredential.user;


      const userRef = ref(database, `users/${user.uid}`);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const userData = snapshot.val();

        if (userData.role === 'admin') {
          console.log('Admin login successful!');
          router.replace('/pages/admin-dashboard');
        } else if (userData.role === 'staff') {
          console.log('Staff login successful!');
          router.replace('/pages/staff-dashboard');
        } else {
          console.error('Invalid role detected');
          Alert.alert('Error', 'Unauthorized access.');
        }
      } else {
        console.error('User data not found in the database.');
        Alert.alert('Error', 'User not found.');
      }
    } catch (error) {
      console.error('Error signing in:', error);
      Alert.alert('Error', 'Invalid email or password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const goToSignIn = () => {
    router.replace('/auth/sign-in');
  };

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Staff Sign In</Text>

        <FormField
          title="Email"
          value={form.email}
          handleChangeText={(e) => setForm({ ...form, email: e })}
          keyboardType="email-address"
          style={styles.form}
        />

        {/* Password Field */}
        <FormField
          title="Password"
          value={form.password}
          handleChangeText={(e) => setForm({ ...form, password: e })}
          secureTextEntry
          style={styles.form}
        />

        {/* Sign In Button */}
        <CustomButton
          title="Sign In"
          style={styles.button}
          handlePress={handleSignIn}
          isLoading={isSubmitting}
        />

        {/* Return to General Sign In */}
        <View style={styles.returnContainer}>
          <Text style={styles.returnText}>
            <Icon name="exclamation" size={18} color="red" /> Not a member of staff?
          </Text>
          <TouchableOpacity onPress={goToSignIn}>
            <Text style={styles.returnLink}>Return to sign in page</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default StaffSignIn;

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'linear-gradient(109.6deg, rgb(36, 45, 57) 11.2%, rgb(16, 37, 60) 51.2%, rgb(0, 0, 0) 98.6%)',
    height: '100%',
  },
  container: {
    marginTop: 150,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 20,
    height: 500,
    borderRadius: 15,
    marginHorizontal: 25
  },
  title: {
    fontWeight: '700',
    fontSize: 24,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 40,
    color: '#06102F',
  },
  form: {
    marginBottom: 25,
  },
  button: {
    marginTop: 80,
    textAlign: 'center',
  },
  returnContainer: {
    flexDirection: 'row',
    gap: 5,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  returnLink: {
    fontWeight: '600',
    fontSize: 15,
    textDecorationLine: 'underline',
  },
  returnText: {
    fontSize: 16,
  },
});

import { Stack, useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../fireBaseConfig'; 
import { onAuthStateChanged } from 'firebase/auth';

export default function RootLayout() {
  const [onboarding, setOnboarding] = useState(null);
  const [user, setUser] = useState(null); 
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const hasCompletedOnboarding = await AsyncStorage.getItem('hasCompletedOnboarding');
        setOnboarding(hasCompletedOnboarding !== 'true');
      } catch (error) {
        console.error('Error checking onboarding status', error);
        setOnboarding(true); 
      }
    };

    if (!user) {
      checkOnboarding(); 
    } else {
      setOnboarding(false);
    }
  }, [user]);

  useEffect(() => {
    if (onboarding !== null) {
      if (onboarding) {
        router.replace('/onboarding'); 
      } else if (user) {
        router.replace('/(tabs)/home'); 
      } else {
        router.replace('/auth/dashboard'); 
      }
    }
  }, [onboarding, user]);
  
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {onboarding === null ? null : onboarding ? (
        <Stack.Screen name="onboarding" />
      ) : (
        <Stack.Screen name="(tabs)" />
      )}
    </Stack>
  );
}

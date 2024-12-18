import { Stack, useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import {View, ActivityIndicator} from 'react-native'
import { hasCompletedOnboarding } from '../utils/onboardingStatus';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RootLayout() {
  const [onboarding, setOnboarding] = useState(null); 
  const router = useRouter();

  useEffect(() => {
    const checkOnboarding = async () => {
      const completed = await hasCompletedOnboarding();
      setOnboarding(!completed); 
    };
    checkOnboarding();
  }, []);

  useEffect(() => {
    if (onboarding !== null) {
      if (onboarding) {
        router.replace('/onboarding'); // Navigate to the onboarding flow
      } else {
        router.replace('/(tabs)'); // Navigate to the main app
      }
    }
  }, [onboarding]);

  if (onboarding === null) {
    // Show a loading spinner while checking onboarding status
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="pages/sign-in-page" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

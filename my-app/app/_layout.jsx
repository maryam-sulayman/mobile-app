import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StripeProvider } from '@stripe/stripe-react-native';
import { useRole, RoleProvider } from '../utils/roleContext';

function RootLayoutWithRole() {
  const router = useRouter();
  const { role, loading: roleLoading } = useRole();
  const [onboarding, setOnboarding] = useState(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const hasCompletedOnboarding = await AsyncStorage.getItem('hasCompletedOnboarding');
        setOnboarding(hasCompletedOnboarding === 'true');
      } catch (error) {
        console.error('Error checking onboarding status:', error);
        setOnboarding(false);
      }
    };

    checkOnboardingStatus();
  }, []);

  useEffect(() => {
    if (roleLoading || onboarding === null) return; 

    if (!onboarding) {
      router.replace('/onboarding'); 
    } else if (!role) {
      router.replace('/pages/dashboard');
    } else if (role === 'admin') {
      router.replace('/pages/admin-dashboard'); 
    } else if (role === 'staff') {
      router.replace('/pages/staff-dashboard'); 
    } else {
      router.replace('/(tabs)/home'); 
    }

    setInitialized(true);
  }, [role, roleLoading, onboarding, router]);


  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="pages" />
      <Stack.Screen name="auth" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <RoleProvider>
      <StripeProvider publishableKey="pk_test_51Qhd8DH0pkVY7rTDQvSX6v8xX8J8etgQXJr0flD8NGX9qdkHYDiJSZ8spcPbAqzB6VzZzyLQjvszm40Q2poTtCap00GeXM9NRY">
        <RootLayoutWithRole />
      </StripeProvider>
    </RoleProvider>
  );
}

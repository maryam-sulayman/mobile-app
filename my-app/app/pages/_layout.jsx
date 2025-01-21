import { Stack } from 'expo-router';

export default function PagesLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="dashboard"/>
      <Stack.Screen name="roomlist"/>
      <Stack.Screen name="single-room" />
      <Stack.Screen name="payment"/>
      <Stack.Screen name="staff-dashboard" />
      <Stack.Screen name="admin-dashboard" />
      <Stack.Screen name="manage-complaints" />
      <Stack.Screen name="manage-bookings" />
      <Stack.Screen name="manage-rooms" />
      <Stack.Screen name="create-staff" />
    </Stack>
  );
}
 
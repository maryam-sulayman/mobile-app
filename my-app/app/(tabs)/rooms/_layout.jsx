import { Stack } from 'expo-router';

export default function RoomsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="roomlist" />
      <Stack.Screen name="single-room"/>
    </Stack>
  );
}

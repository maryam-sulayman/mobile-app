import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'white',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#040C25',
          height: 70,
          borderColor: 'black',
        }
      }}>
        <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons size={23} name="home" color={color} />,
          tabBarLabelStyle: {
            fontSize: 11
          },
        }}
      />
         <Tabs.Screen
        name="rooms"
        options={{
          title: 'Rooms',
          tabBarIcon: ({ color }) => <Ionicons size={23} name="bed" color={color} />,
          tabBarLabelStyle: {
            fontSize: 11
          },
        }}
      />
         <Tabs.Screen
        name="bookings"
        options={{
          title: 'Bookings',
          tabBarIcon: ({ color }) => <Ionicons size={23} name="calendar" color={color} />,
          tabBarLabelStyle: {
            fontSize: 11
          },
        }}
      />
        <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons size={23} name="person" color={color} />,
          tabBarLabelStyle: {
            fontSize: 11
          },
        }}
      />
  
    </Tabs>
  );
}

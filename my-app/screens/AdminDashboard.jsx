import React from "react";
import { View, Text, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { auth } from "../fireBaseConfig";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomButton from "../components/CustomButton";


const AdminDashboard = () => {
  const router = useRouter();

  const goToAddUser = () => router.push("/pages/create-staff");
  const goToManageComplaints = () => router.push("/pages/manage-complaints");
  const goToManageBookings = () => router.push("/pages/manage-bookings");
  const goToManageRooms = () => router.push("/pages/manage-rooms");

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.replace("/auth/staff-sign-in"); 
    } catch (error) {
      console.error("Error signing out:", error);
      Alert.alert("Error", "Failed to sign out. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome Admin!</Text>

      <View style={styles.linkContainer}>
      <TouchableOpacity
        style={[styles.link, styles.linkUser]}
        onPress={goToAddUser}
      >
        <FontAwesome name="user-plus" size={28} color="#06102F" style={styles.icon} />
        <Text style={styles.linkText}>Create Staff</Text>
        <FontAwesome name="chevron-right" size={22} color="#06102F" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.link, styles.linkComplaints]}
        onPress={goToManageComplaints}
      >
        <FontAwesome name="exclamation-circle" size={28} color="#06102F" style={styles.icon} />
        <Text style={styles.linkText}>Manage Complaints</Text>
        <FontAwesome name="chevron-right" size={22} color="#06102F" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.link, styles.linkBookings]}
        onPress={goToManageBookings}
      >
        <FontAwesome name="calendar-check-o" size={28} color="#06102F" style={styles.icon} />
        <Text style={styles.linkText}>Past Bookings</Text>
        <FontAwesome name="chevron-right" size={22} color="#06102F" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.link, styles.linkRooms]}
        onPress={goToManageRooms}
      >
        <FontAwesome name="bed" size={28} color="#06102F" style={styles.icon} />
        <Text style={styles.linkText}>Manage Rooms</Text>
        <FontAwesome name="chevron-right" size={22} color="#06102F" style={styles.icon} />
      </TouchableOpacity>
  
    </View>

      <CustomButton style={{marginTop: 30}} handlePress={handleSignOut} title="Sign Out"/>
  
    </View>
  );
};

export default AdminDashboard;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f7f7f7",
  },
  header: {
    fontSize: 23,
    fontWeight: "bold",
    marginVertical: 25,
    color: "#333",
    textAlign: 'center'
  },
  linkContainer: {
    flexDirection: "column",
  },
  link: {
    padding: 40,
    borderRadius: 15,
    marginHorizontal: 5,
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  linkUser: {
    backgroundColor: "#E2D8FF",
  },

  linkRooms: {
    backgroundColor: "#C0D3FF",
  },

  linkComplaints: {
    backgroundColor: "#EABFAE",
  },
  linkBookings: {
    backgroundColor: "#BFF0D2",
  },
  linkText: {
    color: "#06102F",
    fontSize: 18,
    fontWeight: "bold",
  },
  signOutButton: {
    backgroundColor: "#ff4d4d",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  signOutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

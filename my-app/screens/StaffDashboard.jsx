import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { ref, onValue, update } from 'firebase/database';
import { auth, database } from '../fireBaseConfig';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';

const StaffDashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [activeTab, setActiveTab] = useState('Rooms');
  const router = useRouter();

  useEffect(() => {
    const roomsRef = ref(database, 'rooms');
    const unsubscribe = onValue(roomsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const roomsArray = Object.entries(data).map(([id, room]) => ({
          id,
          ...room,
        }));
        setRooms(roomsArray);
      } else {
        setRooms([]);
      }
    });

    return () => unsubscribe();
  }, []);
  useEffect(() => {
    console.log(rooms); 
  }, [rooms]);
  

  useEffect(() => {
    const complaintsRef = ref(database, 'complaints');
    const unsubscribe = onValue(complaintsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const complaintsArray = Object.entries(data).flatMap(([userId, userComplaints]) =>
          Object.entries(userComplaints).map(([id, complaint]) => ({
            id,
            userId,
            ...complaint,
            status: complaint.status || 'Unresolved',
          }))
        );
        setComplaints(complaintsArray);
      } else {
        setComplaints([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // Update Room Status
  const updateRoomStatus = async (roomId, status) => {
    try {
      const currentUser = auth.currentUser;
      const roomRef = ref(database, `rooms/${roomId}`);
      await update(roomRef, { status, updatedBy: currentUser.email });
      Alert.alert('Success', `Room status updated to ${status}!`);
    } catch (error) {
      console.error('Error updating room status:', error);
      Alert.alert('Error', 'Failed to update room status. Please try again.');
    }
  };
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.replace("/auth/staff-sign-in"); 
    } catch (error) {
      console.error('Error signing out:', error);
      Alert.alert('Error', 'Failed to sign out. Please try again.');
    }
  };

  const renderRoom = ({ item }) => (
    <View style={[styles.card, styles.statusCard]}>
      <Image source={{ uri: item.image }} style={styles.roomImage} />
      <View style={styles.roomDetails}>
        <Text style={styles.roomName}>{item.name}</Text>
        <Text style={styles.roomStatusLabel}>Room Status:</Text>
        <View style={styles.statusContainer}>
          {['Cleaning', 'Available', 'Do Not Disturb'].map((status) => (
            <TouchableOpacity
              key={status}
              style={[
                styles.statusButton,
                item.status === status && styles.activeStatusButton,
              ]}
              onPress={() => updateRoomStatus(item.id, status)}
            >
              <Text style={styles.statusText}>{status}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.staffEmail}>
          Last Updated By: {item.updatedBy || 'Not updated yet'}
        </Text>
      </View>
    </View>
  );

  const renderComplaint = ({ item }) => (
    <View style={styles.card}>
    
    <View style={styles.row}>
    <Text style={styles.label}>User ID:</Text>
    <Text style={styles.value}>{item.userId}</Text>
  </View>
  <View style={styles.row}>
    <Text style={styles.label}>Complaint:</Text>
    <Text style={styles.value}>{item.complaint}</Text>
  </View>
  <View style={styles.row}>
    <Text style={styles.label}>Status:</Text>
    <Text style={item.status === 'Resolved' ? styles.resolved : styles.unresolved}>
      {item.status}
    </Text>
  </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.signOutContainer}>
  <TouchableOpacity onPress={handleSignOut}>
    <Text style={styles.signOutText}>Sign Out</Text>
  </TouchableOpacity>
</View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Rooms' && styles.activeTab]}
          onPress={() => setActiveTab('Rooms')}
        >
          <Text style={styles.tabText}>Rooms</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Complaints' && styles.activeTab]}
          onPress={() => setActiveTab('Complaints')}
        >
          <Text style={styles.tabText}>Complaints</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'Rooms' ? (
        <FlatList data={rooms} keyExtractor={(item) => item.id.toString()} renderItem={renderRoom} />
      ) : (
        <FlatList data={complaints} keyExtractor={(item) => item.id} renderItem={renderComplaint} />
      )}

   
    </View>
  );
};

export default StaffDashboard;

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    marginTop: 50
  },
  container: {
    marginBottom: 200
  },
  tabButton: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: '#ccc',
  },
  activeTab: {
    borderColor: '#040C25',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  statusCard: {
flexDirection: 'row'
  },
  roomImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  roomDetails: {
    flex: 1,
  },
  roomName: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  roomStatusLabel: {
    fontSize: 15,
    marginTop: 8,

    fontWeight: 'bold'
  },
  statusContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  statusButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#eee',
    marginRight: 8,
  },
  activeStatusButton: {
    backgroundColor: '#E2FBE2',
    borderColor: '#43A146',
    borderWidth: 1
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  staffEmail: {
    fontSize: 14,
    color: '#555',
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 600
  },
  value: {
    fontSize: 16,
  },
  resolved: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 16
  },
  unresolved: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 16
  },
  signOutContainer: {
    position: 'absolute',
    top: 14,
    right: 16,
  },
  signOutText: {
    color: '#06102F', 
    textDecorationLine: 'underline',
    fontSize: 17,
    fontWeight: 'bold',

  },
  
  complaintText: {
    fontSize: 16,
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
});

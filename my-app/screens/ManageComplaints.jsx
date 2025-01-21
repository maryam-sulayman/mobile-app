import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { ref, onValue, update } from 'firebase/database';
import { database } from '../fireBaseConfig';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ManageComplaints = () => {
  const [complaints, setComplaints] = useState([]);

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
          }))
        );
        setComplaints(complaintsArray);
      } else {
        setComplaints([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const markComplaintResolved = async (userId, complaintId) => {
    try {
      const complaintRef = ref(database, `complaints/${userId}/${complaintId}`);
      await update(complaintRef, { status: 'Resolved' });
      Alert.alert('Success', 'Complaint marked as resolved.');
    } catch (error) {
      console.error('Error resolving complaint:', error);
      Alert.alert('Error', 'Failed to resolve complaint. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Manage Complaints</Text>
      <FlatList
        data={complaints}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              item.status === 'Resolved' ? styles.resolvedCard : styles.unresolvedCard,
            ]}
          >
            <View style={styles.row}>
              <Text style={styles.boldText}>User ID:</Text>
              <Text style={styles.cardValue}>{item.userId}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.boldText}>Complaint:</Text>
              <TextInput
                style={styles.noteInput}
                value={item.complaint}
                editable={false}
                multiline
              />
            </View>
            <View style={styles.row}>
  <Text style={styles.boldText}>Status:</Text>
  <Text
    style={[
      styles.cardValue,
      { color: item.status === 'Resolved' ? '#28a745' : '#dc3545', fontWeight: 'bold' }, 
    ]}
  >
    {item.status === 'Resolved' ? 'Resolved' : 'Unresolved'}
  </Text>
</View>

            {item.status !== 'Resolved' && (
              <TouchableOpacity
                style={styles.resolveButton}
                onPress={() => markComplaintResolved(item.userId, item.id)}
              >
                <Text style={styles.resolveButtonText}>Mark as Resolved</Text>
                <FontAwesome name="check" size={20} color="white" />
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default ManageComplaints;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f7f7f7',
    paddingBottom: 150
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 25,
    textAlign: 'center'
  },
  card: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resolvedCard: {
    backgroundColor: '#E3E3E3',
    borderColor: '#E3E3E3',
    borderWidth: 1,
  },
  unresolvedCard: {
    backgroundColor: '#fff',
    borderColor: 'green',
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  boldText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cardValue: {
    fontSize: 16,
    color: '#555',
    
  },
  noteInput: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#238A27',
    width: 250,
    color: '#333',
    fontSize: 16,
    textAlignVertical: 'top',
    maxHeight: 200,
    fontWeight: 600,
    fontStyle: 'italic'
  },
  resolveButton: {
    backgroundColor: '#238A27',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    gap: 10,
  },
  resolveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { ref, onValue } from 'firebase/database';
import { database } from '../fireBaseConfig';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const bookingsRef = ref(database, 'bookings');
    const unsubscribe = onValue(bookingsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const bookingsArray = Object.entries(data).flatMap(([userId, userBookings]) =>
          Object.entries(userBookings).map(([id, booking]) => ({
            id,
            userId,
            ...booking,
            checkInDate: new Date(booking.checkInDate).toLocaleDateString(),
            checkOutDate: new Date(booking.checkOutDate).toLocaleDateString(),
          }))
        );
        setBookings(bookingsArray);
      } else {
        setBookings([]);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>History of Past Bookings</Text>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.row}>
              <FontAwesome name="user" size={20} color="#333" style={styles.icon} />
              <Text style={styles.label}>User ID:</Text>
              <Text style={styles.value}>{item.userId}</Text>
            </View>
            <View style={styles.row}>
              <FontAwesome name="bed" size={20} color="#333" style={styles.icon} />
              <Text style={styles.label}>Room:</Text>
              <Text style={styles.value}>{item.roomName}</Text>
            </View>
            <View style={styles.row}>
              <FontAwesome name="money" size={20} color="#333" style={styles.icon} />
              <Text style={styles.label}>Price Paid:</Text>
              <Text style={styles.value}>£{item.price}</Text>
            </View>
            <View style={styles.row}>
              <FontAwesome name="calendar" size={20} color="#333" style={styles.icon} />
              <Text style={styles.label}>Check-In:</Text>
              <Text style={styles.value}>{item.checkInDate}</Text>
            </View>
            <View style={styles.row}>
              <FontAwesome name="calendar" size={20} color="#333" style={styles.icon} />
              <Text style={styles.label}>Check-Out:</Text>
              <Text style={styles.value}>{item.checkOutDate}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default ManageBookings;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f7f7f7',
    marginBottom: 150
  },
  header: {
    fontSize: 21,
    fontWeight: 'bold',
    marginVertical: 25,
    textAlign: 'center'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  icon: {
    marginRight: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#555',
    textAlign: 'right',
    flex: 2,
  },
});

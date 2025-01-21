import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Modal, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { ref, onValue, push } from 'firebase/database';
import { auth, database } from '../fireBaseConfig';
import { format } from 'date-fns';
import Icon from 'react-native-vector-icons/FontAwesome';


const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [complaintText, setComplaintText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const user = auth.currentUser;
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0, 
    }).format(price);
  };
  


  useEffect(() => {
    if (!user) {
      Alert.alert('Error', 'You must be logged in to view your bookings.');
      return;
    }

    const bookingsRef = ref(database, `bookings/${user.uid}`);

    const unsubscribe = onValue(
      bookingsRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const formattedData = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setBookings(formattedData);
        } else {
          setBookings([]);
        }
      },
      (error) => {
        console.error('Error fetching bookings:', error);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const saveComplaintToFirebase = async (complaint) => {
    try {
      const complaintsRef = ref(database, `complaints/${user.uid}`);
      await push(complaintsRef, complaint);
      Alert.alert('Complaint Submitted', 'Your complaint has been recorded successfully.');
      setIsModalVisible(false);
      setComplaintText('');
    } catch (error) {
      console.error('Error saving complaint:', error);
      Alert.alert('Error', 'Failed to submit your complaint. Please try again.');
    }
  };

  const handleComplaintSubmit = () => {
    if (!complaintText.trim()) {
      Alert.alert('Error', 'Please enter a complaint.');
      return;
    }

    const complaint = {
      bookingId: selectedBooking.id,
      roomName: selectedBooking.roomName,
      complaint: complaintText,
      date: new Date().toISOString(),
    };

    saveComplaintToFirebase(complaint);
  };

  const renderBookingCard = ({ item }) => {
    const formattedCheckInDate = format(new Date(item.checkInDate), 'dd MMMM, yyyy');
    const formattedCheckOutDate = format(new Date(item.checkOutDate), 'dd MMMM, yyyy');
    const formattedPrice = formatPrice(item.price); 
  
    return (
        <View style={styles.bookingWrapper}>
      <View style={styles.bookingCard}>
        <Image
          source={{ uri: item.image }}
          style={styles.bookingImage}
        />
        <View style={styles.bookingDetails}>
        <View style={styles.textContainer}>
  <Text style={styles.bold}>Room:</Text>
  <Text style={styles.text}>{item.roomName}</Text>
</View>
<View style={styles.textContainer}>
  <Text style={styles.bold}>Price paid:</Text>
  <Text style={styles.text}>{formattedPrice}</Text>
</View>
<View style={styles.textContainer}>
  <Text style={styles.bold}>Check-in date:</Text>
  <Text style={styles.text}>{formattedCheckInDate}</Text>
</View>
<View style={styles.textContainer}>
  <Text style={styles.bold}>Check-out date:</Text>
  <Text style={styles.text}>{formattedCheckOutDate}</Text>
</View>
<View style={styles.textContainer}>
  <Text style={[styles.bold, styles.statusText]}>Status:</Text>
  <Text style={styles.text}>{item.status}</Text>
</View>


        </View>
      </View>
      <TouchableOpacity
  style={styles.complaintButton}
  onPress={() => {
    setSelectedBooking(item);
    setIsModalVisible(true);
  }}
>
  <View style={styles.complaintButtonContent}>
    <Text style={styles.complaintButtonText}>Raise Complaint</Text>
    <Icon name="exclamation-circle" size={16} color="#BF3100" style={styles.icon} />
  </View>
</TouchableOpacity>
      </View>
    );
  };
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Booking History</Text>
      {bookings.length === 0 ? (
        <Text style={styles.noBookings}>You have no bookings yet.</Text>
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id}
          renderItem={renderBookingCard}
        />
      )}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => {
          setIsModalVisible(false);
          setComplaintText('');
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Enter your Complaint</Text>
            <Text style={styles.modalSubHeader}>Our team will get back to you within 2 working days!</Text>
            <TextInput
              style={styles.complaintInput}
              value={complaintText}
              onChangeText={setComplaintText}
              multiline
            />
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                setIsModalVisible(false);
                setComplaintText('');
              }}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitButton} onPress={handleComplaintSubmit}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
       
            </View>
            
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BookingHistory;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 50
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
    
  },
  bookingCard: {
    flexDirection: 'row',
    borderRadius: 8,
  },
  bookingWrapper: {
    backgroundColor: '#fff',
    marginBottom: 25,
    padding: 16,
    
  },
  bookingImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginRight: 16,
  },
  bookingDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 15,
    color: '#555',
    marginBottom: 8,
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  complaintButton: {
    marginTop: 10,
    backgroundColor: '#061031',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  complaintButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 10,
    padding: 16,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center'
  },
  modalSubHeader: {
   fontSize: 14,
   marginBottom: 20,
   color: '#A09E9E',
   fontStyle: 'italic',
   fontWeight: 600,
       textAlign: 'center'
  }, 
  complaintInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 30,
    marginBottom: 30,
  },
  submitButton: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
    width: 120
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center'
  },
  cancelButton: {
    backgroundColor: '#BF3100',
    padding: 10,
    borderRadius: 5,
    width: 120
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center'
  },
  noBookings: {
    fontSize: 18,
    textAlign: 'center',
    color: '#6c757d',
  },
  complaintButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusText: {
    color: 'green'
  }
});

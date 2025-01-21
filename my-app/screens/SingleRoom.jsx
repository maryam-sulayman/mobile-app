import React, { useState } from 'react';
import {
  Image,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { auth } from '../fireBaseConfig';
import { format } from 'date-fns';

const SingleRoom = () => {
  const { room } = useLocalSearchParams();
  const parsedRoom = JSON.parse(room);
  const router = useRouter();
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const formattedCheckInDate = format(checkInDate, 'dd MMMM, yyyy'); 
  const formattedCheckOutDate = format(checkOutDate, 'dd MMMM, yyyy');
  const [isCheckInPickerVisible, setCheckInPickerVisible] = useState(false);
  const [isCheckOutPickerVisible, setCheckOutPickerVisible] = useState(false);

  const handleCheckInConfirm = (date) => {
    setCheckInDate(date);
    setCheckInPickerVisible(false);
  };

  const handleCheckOutConfirm = (date) => {
    setCheckOutDate(date);
    setCheckOutPickerVisible(false);
  };

  const handleBookRoom = () => {
    const user = auth.currentUser;

    if (!user) {
      Alert.alert('Login Required', 'You need to be logged in to book a room.', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign In', onPress: () => router.replace('/auth/sign-in') },
      ]);
      return;
    }

    if (!checkInDate || !checkOutDate) {
      Alert.alert('Error', 'Please select both check-in and check-out dates.');
      return;
    }

    router.push({
      pathname: '/pages/payment',
      params: {
        room: JSON.stringify(parsedRoom),
        checkInDate: checkInDate.toISOString(),
        checkOutDate: checkOutDate.toISOString(),
        image: parsedRoom.image
      },
    });
  };

  return (
    <ScrollView style={styles.scroll}>
      <Image source={{ uri: parsedRoom.image }} style={styles.roomImage} />
      <View style={styles.content}>
        <Text style={styles.roomName}>{parsedRoom.name}</Text>
        <View style={styles.roomDetails}>
          <TouchableOpacity>
            <Text style={styles.rating}>
              <Icon name="star" size={22} color="#EBC351" /> {parsedRoom.rating}{' '}
              <Text style={styles.review}>(300)</Text>
            </Text>
          </TouchableOpacity>
          <View style={styles.locationContainer}>
            <Icon name="map-marker" size={22} color="#06102F" />
            <Text style={styles.roomLocation}>{parsedRoom.location}</Text>
          </View>
        </View>
        <Text style={styles.description}>{parsedRoom.description}</Text>
      </View>
      <View style={styles.amenities}>
       {parsedRoom.amenities.map((item, index)=> {
         const iconName = 
          item === 'TV'? 'television' :
          item === 'Shower' ? 'shower':
          item === 'Coffee' ? 'coffee':
          item === 'Wi-Fi' ? 'wifi': 
          item === 'Heating' ? 'thermometer' :
          item === 'Bathtub' ? 'bath' :''

      return ( ( 
        <Text key={index} style={styles.amenity}>
          <Icon 
           name = {iconName}
            size={18} color="#06102F" /> {' '}
        {item}</Text>
      ))
       } )}
        </View>

      <View style={styles.datePickerContainer}>
        <View style={styles.datePickerButton}>
          <Text style={styles.datePickerLabel}>Check In</Text>
          <TouchableOpacity
            onPress={() => setCheckInPickerVisible(true)}
            style={styles.datePickerTouchable}
          >
            <Icon name="calendar" size={18} color="#333" style={styles.dateIcon} />
            <Text style={styles.datePickerText}>
            {formattedCheckInDate}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.datePickerButton}>
          <Text style={styles.datePickerLabel}>Check Out</Text>
          <TouchableOpacity
            onPress={() => setCheckOutPickerVisible(true)}
            style={styles.datePickerTouchable}
          >
            <Icon name="calendar" size={18} color="#333" style={styles.dateIcon} />
            <Text style={styles.datePickerText}>
            {formattedCheckOutDate}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <DateTimePickerModal
        isVisible={isCheckInPickerVisible}
        mode="date"
        onConfirm={handleCheckInConfirm}
        onCancel={() => setCheckInPickerVisible(false)}
      />
      <DateTimePickerModal
        isVisible={isCheckOutPickerVisible}
        mode="date"
        onConfirm={handleCheckOutConfirm}
        onCancel={() => setCheckOutPickerVisible(false)}
      />
   
      <TouchableOpacity style={styles.button}
        onPress={handleBookRoom} activeOpacity={0.9}>
        <Text style={styles.buttonText}>Book Now • £{parsedRoom.price} </Text> 
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SingleRoom;

const styles = StyleSheet.create({
  roomImage: {
    height: 400,
    marginHorizontal: 20,
    borderRadius: 15,
    marginTop: 5,
  },
  content: {
    padding: 15,
    paddingTop: 25
  },
  roomName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#06102F',
    marginBottom: 15,
  },
  roomDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  rating: {
    fontSize: 18,
    color: '#06102F',
    fontWeight: '600',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  roomLocation: {
    fontSize: 16.5,
    color: '#8D8D8D',
  },
  description: {
    fontSize: 17,
    lineHeight: 24,
    color: '#545353',
    marginVertical: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,

  },
  amenities: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  amenity: {
    backgroundColor: '#E1E0E6',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 30,
    fontSize: 15,
    fontWeight: '600',
  },
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    paddingHorizontal: 16,
    marginTop: 30
  },
  datePickerButton: {
    width: '48%',
    justifyContent: 'center',
  },
  button: {
backgroundColor: '#061031',
padding: 15,
marginHorizontal: 10,
borderRadius: 8,
marginTop: 30
  },
  buttonText: {
color: 'white',
fontWeight: 'bold',
fontSize: 17,
textAlign: 'center'
  },
  datePickerLabel: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 700
  },
  datePickerTouchable: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateIcon: {
    marginRight: 8,
  },
  datePickerText: {
    fontSize: 16,
    color: '#333',
  },
  end: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    marginVertical: 15,
    marginBottom: 25
  },
  scroll: {
marginBottom: -30,
  }
});

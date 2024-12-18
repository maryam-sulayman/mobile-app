import { Image, TouchableOpacity, Text, View, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import CustomButton from '../components/CustomButton'
import { useLocalSearchParams } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';

const SingleRoom = () => {
  const { room } = useLocalSearchParams();
  const parsedRoom = JSON.parse(room); 

  return (
    <ScrollView >
      <Image source={{ uri: parsedRoom.image }} style={styles.roomImage}/>
      <View style={styles.content}>
        <Text style={styles.roomName}>{parsedRoom.name}</Text>
        <View style={styles.roomDetails}>
          <TouchableOpacity>
            <Text style={styles.rating}>
              <Icon name="star" size={22} color="#EBC351" /> {parsedRoom.rating} <Text style={styles.review}>(300)</Text>
            </Text>
          </TouchableOpacity>
          <View style={styles.locationContainer}>
            <Icon name="map-marker" size={22} color="#06102F" />
            <Text style={styles.roomLocation}>{parsedRoom.location}</Text>
          </View>
        </View>
        <Text style={styles.description}>
        {parsedRoom.description}
        </Text>
      </View>
      <View style={styles.amenities}>
       {parsedRoom.amenities.map((item, index)=> {
         const iconName = 
          item === 'Television'? 'television' :
          item === 'Shower' ? 'shower':
          item === 'Coffee' ? 'coffee':
          item === 'Wi-Fi' ? 'wifi': 'circle'

      return ( ( 
        <Text key={index} style={styles.amenity}>
          <Icon 
           name = {iconName}
            size={18} color="#06102F" /> {' '}
        {item}</Text>
      ))
       } )}
        </View>
         <Text style={styles.price}>
         <Text style={styles.priceLabel}>Price:</Text>{'  '}
          £{parsedRoom.price} <Text style={styles.night}>/night</Text>
        </Text>
        <CustomButton title='Book now' style={styles.button}/>
    </ScrollView>
  );
};

export default SingleRoom;

const styles = StyleSheet.create({
  roomImage: {
    height: 400,
    marginHorizontal: 20,
    borderRadius: 15,
    marginTop: 5
  },
  content: {
    padding: 15,
  },
  roomName: {
    fontSize: 22,
    fontWeight: 'bold',
    color:'#06102F',
    marginBottom: 15
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
    fontWeight: 600
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  roomLocation: {
    fontSize: 17,
    color: '#A09E9E',
  },
  description: {
    fontSize: 17,
    lineHeight: 24,
    color: '#545353',
    marginVertical: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#06102F',
    marginTop: 25,
    paddingLeft: 15
  },
  night: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#606060',
  },
  review: {
    color: '#A09E9E',
    fontWeight: 400
  },
  amenities: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 10
  },
  amenity: {
    backgroundColor: '#E1E0E6',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 30,
    fontSize:15,
    fontWeight: 600
  },
  priceLabel: {
    fontWeight: 'normal',
    fontSize: 18,
  },
  button: {
    marginHorizontal: 15,
    marginVertical: 30
  }
});

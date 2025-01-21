import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import FormField from '../components/FormField'
import { auth } from '../fireBaseConfig'; 
import fetchRooms from '../utils/fetchRooms'
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../components/CustomButton';
import { useRouter } from 'expo-router';

const RoomList = () => {
  const router = useRouter();
  const [rooms, setRooms] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = fetchRooms(setRooms);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const renderRoom = ({ item }) => (
    <View style={styles.roomCard}>
      <Image source={{ uri: item.image }} style={styles.roomImage}/>
      <View style={styles.roomCardHeader}>
        <Text style={styles.roomName}>{item.name}</Text>
        <TouchableOpacity>
          <Text style={styles.rating}>
            <Icon name='star' size={21} color="#EBC351" />
            {' '}{item.rating}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.roomLocationContainer}>
        <Icon name='map-marker' size={22} color="#A8A6A6" />
        <Text style={styles.roomLocation}>{item.location}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Text style={styles.roomPrice}>£{item.price} <Text style={styles.night}>/night</Text></Text>
        <CustomButton
    title="See Details"
    style={styles.button}
    handlePress={() =>
      router.navigate({
        pathname: user ? '/rooms/single-room' : '/pages/single-room',
        params: { room: JSON.stringify(item) },
      })
    }
/>    
      </View>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>All rooms</Text>
      <View style={styles.searchContainer}>
        <FormField placeholder='Search' style={styles.searchField} />
        <View style={styles.filter}>
          <TouchableOpacity activeOpacity={0.7}>
            <Image source={require('../assets/images/filter-icon.png')} style={styles.filterImage} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      data={rooms}
      keyExtractor={(item) => item.name}
      renderItem={renderRoom}
      ListHeaderComponent={renderHeader}
      contentContainerStyle={styles.container}
      
    />
  );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal:15,
        backgroundColor: 'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)'
    }, 
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    title: {
        fontWeight: 700,
        fontSize: 20,
        marginTop: 20
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchField: {
        marginRight: 20,
        marginLeft: 20,
        backgroundColor: 'white',
        width: 230,
        paddingVertical: 13, 
      },
      filter: {
        width: 48,
        height: 45,
        backgroundColor: '#06102F',
        borderRadius: 8,
        marginTop: 15
      },
      filterImage: {
        width: 33,
        height: 33,
        marginTop: 6,
        marginLeft: 7
      },
      roomImage: {
        width: 350,
        height: 250,
        borderRadius: 10
      },
      roomCard: {
        backgroundColor: 'white',
        paddingHorizontal: 25,
        paddingTop: 10,
        paddingBottom: 20,
        marginVertical: 15,
        borderRadius: 10,
        shadowColor: '#06102F',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
      },
      roomName: {
        fontSize: 19,
        fontWeight: 700,
        marginTop: 20
      },
      roomCardHeader:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8
      },
      rating: {
        marginTop: 15,
        fontSize: 17,
        color: '#808080',
      },
      roomPrice: {
        fontSize: 19,
        fontWeight: 700,
      },
      night: {
        fontSize: 16,
        fontWeight: 'normal'
      },
      roomLocationContainer: {
        flexDirection: 'row',
        marginVertical: 7,
        gap: 5
      }, 
      roomLocation: {
        fontSize: 16
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
      button: {
        marginTop: -20,
        width: 137,
        paddingVertical: 11,
      },
   
    })
    export default RoomList;
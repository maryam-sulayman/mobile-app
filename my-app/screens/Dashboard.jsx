import { View, Text, Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, FlatList, Touchable } from 'react-native'
import React, {useState, useEffect}  from 'react'
import { useRouter } from 'expo-router';
import FormField from '../components/FormField'
import fetchRooms from '../utils/fetchRooms.js'
import Icon from 'react-native-vector-icons/FontAwesome';

const Homepage = () => {
const router = useRouter();
const [rooms, setRooms] = useState([])

useEffect(() => {
  const unsubscribe = fetchRooms(setRooms);
  return () => unsubscribe();
}, []);

const goToRooms = () => {
  router.push('/pages/roomlist');
}

const goToSignIn = () => {
  router.push('/pages/sign-in-page');
}
const recommendedRooms = rooms.filter(room => room.recommended === true)

const renderRoom = ({ item }) => (
  <View style={styles.roomCard}>
    <Image source={{ uri: item.image }} style={styles.roomImage}/>
    <View style={styles.roomCardHeader}>
    <Text style={styles.roomName}>{item.name}</Text>
    <TouchableOpacity>
    <Text style={styles.rating}> 
    <Icon name='star'  size={17} color="#EBC351"/> 
    {' '}{item.rating}</Text>
    </TouchableOpacity>
    </View>
    <View style={styles.roomLocationContainer}>
    <Icon name='map-marker'size={18} color="#A8A6A6"/> 
    <Text style={styles.roomLocation}>{item.location}</Text>
    </View>
    <Text style={styles.roomPrice}>£{item.price} <Text style={styles.night}>/night</Text></Text>
  </View>
);

  return (
    <SafeAreaView>
      <ScrollView>
      <Image source= {require('../assets/images/dashboard-image.jpeg')} style={styles.image}/>
      <View>
        <Text style={styles.heading}>Welcome, user</Text>
        <Text style={styles.subheading}>Find your desired room</Text>
      
        <View style={styles.searchContainer}>
        <FormField placeholder='Search' style={styles.searchField}/>
        <View style={styles.filter}>
        <TouchableOpacity activeOpacity={0.7}>
          <Image source={require('../assets/images/filter-icon.png')} style={styles.filterImage}/>
        </TouchableOpacity>
        </View>
        </View>

        <TouchableOpacity onPress={goToSignIn}>
          <Text style={styles.seeAll}>Sign in</Text>
          </TouchableOpacity>

        <View style={styles.recommendedTitleContainer}>
          <Text style={styles.recommendedTitle}>Recommended rooms</Text>
          <TouchableOpacity onPress={goToRooms}>
          <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
       <FlatList 
       horizontal
       data={recommendedRooms}
       keyExtractor={(item) => item.name}
       renderItem={renderRoom}/>
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Homepage

const styles = StyleSheet.create({
  image: {
    width: 450,
    height: 250
  },
  heading: {
    fontSize: 22,
    fontWeight: 600,
    marginTop: 20,
    marginLeft: 10
  },
  subheading: {
    fontSize: 17,
    marginTop: 10,
    marginLeft: 20
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchField: {
    marginLeft: 30,
    marginRight: 20,
    backgroundColor: '#F3F4F7',
    width: 300,
    paddingVertical: 13
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
  recommendedTitleContainer: {
    flexDirection:'row', 
    justifyContent:'space-between',
    marginHorizontal: 15,
    marginTop: 35,
    marginBottom: 15
  },
  recommendedTitle: {
    fontWeight: 700,
    fontSize: 18
  },
  seeAll: {
    fontSize: 18,
    color: '#4A5FA4',
  },
  roomImage: {
    width: 200,
    height: 200,
    borderRadius: 10
  },
  roomCard: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 20,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  roomName: {
    fontSize: 17,
    fontWeight: 600,
    marginTop: 10
  },
  roomCardHeader:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  rating: {
    marginTop: 10,
    fontSize: 15,
    color: '#808080'
  },
  roomPrice: {
    fontSize: 17,
    fontWeight: 600,
  },
  night: {
    fontSize: 14,
    fontWeight: 'normal'
  },
  roomLocationContainer: {
    flexDirection: 'row',
    marginVertical: 7,
    gap: 5
  }, 
  roomLocation: {
    fontSize: 15
  }
})
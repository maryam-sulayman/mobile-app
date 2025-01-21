import { View, Text, Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, FlatList, ImageBackground } from 'react-native'
import React, {useState, useEffect}  from 'react'
import { useRouter } from 'expo-router';
import FormField from '../components/FormField'
import fetchRooms from '../utils/fetchRooms.js'
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../components/CustomButton'
import {auth} from '../fireBaseConfig'
import {onAuthStateChanged} from 'firebase/auth'

const Homepage = () => {
const router = useRouter();
const [rooms, setRooms] = useState([]);
const [name, setName] = useState("");

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setName(currentUser.displayName|| currentUser.email.split('@')[0]);
    } 
  });

  return () => unsubscribe();
}, []);


useEffect(() => {
  const unsubscribe = fetchRooms(setRooms);
  return () => unsubscribe();
}, []);

const goToRooms = () => {
  const user = auth.currentUser;
  if (!user){
  router.navigate('/pages/roomlist');
  } else {
    router.navigate('/(tabs)/rooms/roomlist');
  }
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
      <View style={styles.imageContainer}>
      <Image source= {require('../assets/images/dashboard-image.jpeg')} style={styles.image}/>
        <View style={styles.overlay}></View>
        <View style={styles.iconContainer}>
        <Icon name='star'size={15} color="#EBC351"/> 
        <Icon name='star'size={15} color="#EBC351"/> 
        <Icon name='star'size={15} color="#EBC351"/> 
        <Icon name='star'size={15} color="#EBC351"/> 
        <Icon name='star'size={15} color="#EBC351"/> 
        </View>
        <Text style={styles.logo}>
        <Text> Hotel</Text><Text style={{color: '#E1AF3A'}}>Hive</Text>
        <Image
          source={require("../assets/images/bee.png")}
          resizeMode="contain"
          style={styles.bee}
      />
        </Text>
        <Text style={styles.slogan} >Indulge in Luxury – Find Your Dream Room Today</Text>
        </View>
      <View>
        <Text style={styles.heading}>Welcome{name ? `, ${name}` : ''} </Text>
        <Text style={styles.subheading}>Browse through our rooms and find what works for you!</Text>
     
        
          <ImageBackground source={require('../assets/images/background.png')}
          style={styles.imageBackground}>
          <View style={styles.recommendedTitleContainer}>
          <Text style={styles.recommendedTitle}>Recommended rooms</Text>
          <TouchableOpacity onPress={goToRooms} accessibilityLabel="See all rooms" accessibilityRole="button">
          <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
          </View>
          <FlatList 
        horizontal
        data={recommendedRooms}
        keyExtractor={(item) => item.name}
        renderItem={renderRoom}
         />
         </ImageBackground>   
        </View>
       <View style={styles.bookContainer}>
        <Text style={styles.bookContainerText}>Ready to book?</Text>
        <View style={styles.bookContainerInfo}>
        <Icon name='info-circle'size={18} color="#BF3100"/> 
        <Text style={styles.bookContainerInfoText} >You need to have an account to secure your booking</Text> 
        </View>
        <CustomButton title="Book now" style={styles.bookButton} handlePress={goToRooms}/>
       </View>
       
       <View style={styles.whatWeOfferContainer}>
       <Text style={styles.bookContainerText}>What we offer</Text>
       <View style={styles.whatWeOfferIconContainer}>
       <View style={styles.card}>
        <Image source={require('../assets/images/dumbbell.png')} style={styles.cardImage}/>
        <Text style={styles.cardTitle}> Fitness Center </Text>
        <Text style={styles.cardDescription}> Stay fit with our state-of-the-art gym facilities. </Text>
       </View>
       <View style={[styles.card, styles.cardBackground]}>
        <Image source={require('../assets/images/swimmer.png')} style={styles.cardImage}/>
        <Text style={styles.cardTitle}> Swimming Pool </Text>
        <Text style={styles.cardDescription}> Relax by the poolside or take a refreshing swim.</Text>
       </View>
       <View style={styles.card} >
        <Image source={require('../assets/images/spa.png')} style={styles.cardImage}/>
        <Text style={styles.cardTitle}>Spa & Wellness</Text>
        <Text style={styles.cardDescription}> Pamper yourself with a range of spa treatments. </Text>
       </View>
       <View style={[styles.card, styles.cardBackground]}>
        <Image source={require('../assets/images/wifi.png')} style={styles.cardImage}/>
        <Text style={styles.cardTitle}> Free Wi-fi </Text>
        <Text style={styles.cardDescription}> Stay connected with high-speed internet. </Text>
       </View>
       <View style={styles.card}>
        <Image source={require('../assets/images/dinner.png')} style={styles.cardImage}/>
        <Text style={styles.cardTitle}> Restaurant & Bar </Text>
        <Text style={styles.cardDescription}> Enjoy exquisite dining with a variety of dishes. </Text>
       </View>
       <View style={[styles.card, styles.cardBackground]}>
        <Image source={require('../assets/images/concierge.png')} style={styles.cardImage}/>
        <Text style={styles.cardTitle}>Concierge Service </Text>
        <Text style={styles.cardDescription}>Our concierge is available around the clock. </Text>
       </View>
       <View style={styles.card}>
        <Image source={require('../assets/images/heat.png')} style={styles.cardImage}/>
        <Text style={styles.cardTitle}> Heating </Text>
        <Text style={styles.cardDescription}>Enjoy our centralised heating, keeping you warm on chilly nights.</Text>
       </View>
       <View style={[styles.card, styles.cardBackground]}>
        <Image source={require('../assets/images/television.png')} style={styles.cardImage}/>
        <Text style={styles.cardTitle}> Television </Text>
        <Text style={styles.cardDescription}> Catch the latest shows with state-of-the-art televisions.</Text>
       </View>
       <View style={styles.card}>
        <Image source={require('../assets/images/parked-car.png')} style={styles.cardImage}/>
        <Text style={styles.cardTitle}> Free Parking </Text>
        <Text style={styles.cardDescription}> Enjoy complimentary parking, available for all our guests. </Text>
       </View>
       </View>
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
    fontSize: 23,
    fontWeight: 600,
    marginTop: 40,
    marginLeft: 10,
    marginBottom: 20,
  },
  subheading: {
    fontSize: 16,
    marginLeft:12,
    marginTop: -5,
    marginBottom: -15,
    fontStyle: 'italic'
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchField: {
    marginLeft: 10,
    marginRight: 20,
    backgroundColor: 'white',
    borderColor: '#C5C1C1',
    width: 340,
    paddingVertical: 13,
  },
  filter: {
    width: 48,
    height: 45,
    backgroundColor: '#06102F',
    marginTop: 15,
    marginRight: 10,
    shadowColor: '#06102F',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    borderRadius: 8
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
    marginTop: 20,
    marginBottom: 25,
    marginHorizontal: 10
  },
  recommendedTitle: {
    fontWeight: 700,
    fontSize: 19,
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,

  },
  seeAll: {
    fontSize: 18,
    color: '#06102F',
    textDecorationLine: 'underline',
    fontWeight: 500,
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
    marginLeft: 15,
    borderRadius: 10,
    height: 320
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
  },
  imageContainer: {
    position: 'relative',
    position: 'relative',
    width: '100%',
    height: 250,
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.55);',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

  },
  bee:{
    width: 40,
    height: 40
  },
  logo: {
    fontSize: 30,
    position:'absolute',
    fontWeight: 700,
    top: 110,
    color: 'white',
    left: 130,
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  iconContainer:{
    flexDirection: 'row',
    position: 'absolute',
    top: 80,
    gap: 8,
  },
  slogan: {
    position: 'absolute',
    color: "white",
    top: 170,
    fontSize: 15,
    textAlign:'center',
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
   imageBackground: {
   marginTop: 50,
   height: 395
   },
   bookButton: {
    marginRight: 10,
    marginBottom: 50
   },
   bookContainer: {
    marginLeft: 10,
    marginTop: 60
   },
   bookContainerInfo: {
    flexDirection: 'row',
    gap: 5
   },
   bookContainerText: {
    fontSize: 19,
    fontWeight: 700,
    marginBottom: 10
   },
   bookContainerInfoText: {
    fontSize: 16,
    marginBottom: 10
   }, 
   whatWeOfferContainer: {
    paddingHorizontal: 10,
    marginTop: 20
   },
   cardImage: {
    width: 65,
    height: 65
   },
   whatWeOfferIconContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20
   },
   card: {
    width: 135,
    height: 170,
    alignItems: 'center',
    justifyContent: 'center'
   },
   cardTitle: {
    fontWeight: 600,
    marginTop: 10,
    marginBottom: 7
   },
   cardBackground:{
    backgroundColor: '#E0E0E0'
   },
   cardDescription: {
    fontSize: 12,
    paddingHorizontal: 5,
    textAlign: 'center'
   },
})
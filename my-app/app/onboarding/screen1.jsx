import { View, Text, SafeAreaView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import {router} from 'expo-router'

const Screen1 = () => {

const goToDashboard = () => {
    router.navigate('/')
}
const goToScreenTwo = () => {
    router.navigate('/onboarding/screen2')
}

  return (
    <SafeAreaView>
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/images/dining.jpeg')} style={styles.image} resizeMode="contain" />
      </View>
        <Text style={styles.heading}>Indulge in Exquisite Dining</Text>
        <Text  style={styles.subheading}>Savor a culinary journey with gourmet dishes, crafted by world-class chefs, in our luxurious dining spaces.</Text>
        <View style={styles.iconContainer}>
        <Icon name='circle'size={12} color="#06102F"/> 
        <Icon name='circle'size={12} color="#D9D9D9"/> 
        <Icon name='circle'size={12} color="#D9D9D9"/> 
        <Icon name='circle'size={12} color="#D9D9D9"/> 
        </View>
        <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.skipButton} onPress={goToDashboard} activeOpacity={0.8}>
        <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={goToScreenTwo}>
        <Text style={styles.nextText} >Next</Text>
        </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};

export default Screen1;

const styles = StyleSheet.create({

  imageContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: 380,
    height: 600,
    borderRadius: 20
  },
  heading:{
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 700
  },
  subheading: {
    fontSize: 16,
    marginTop: 15,
    textAlign: 'center',
    paddingHorizontal: 30
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 5,
    justifyContent:'center',
    marginTop: 30
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30
  },
  skipButton: {
    borderWidth: 1,
    borderColor: '#06102F',
    marginLeft: 15,
    backgroundColor: 'white',
    padding: 10,
    width: 100,
    borderRadius: 5,
    paddingVertical: 15
  },
  skipText: {
    fontWeight: 600,
    textAlign: 'center',
    fontSize: 15
  },
  nextButton: {
    borderWidth: 1,
    borderColor: '#06102F',
    marginRight: 15,
    backgroundColor: '#06102F',
    padding: 10,
    width: 100,
    borderRadius: 5,
    paddingVertical: 15
  },
  nextText: {
    fontWeight: 600,
    textAlign: 'center',
    fontSize: 15,
    color: 'white'
  }
});

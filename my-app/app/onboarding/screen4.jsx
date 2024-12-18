import { View, Text, SafeAreaView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import {router} from 'expo-router'

const Screen4 = () => {

const goToDashboard = () => {
    router.navigate('/')
}


  return (
    <SafeAreaView>
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/images/pool.jpeg')} style={styles.image} resizeMode="cover" />
      </View>
        <Text style={styles.heading}>Relax and Rejuvenate</Text>
        <Text  style={styles.subheading}>Take a dip in our serene swimming pool or lounge by the water, the perfect escape for ultimate relaxation.</Text>
        <View style={styles.iconContainer}>
        <Icon name='circle'size={11} color="#D9D9D9"/> 
        <Icon name='circle'size={11} color="#D9D9D9"/> 
        <Icon name='circle'size={11} color="#D9D9D9"/> 
        <Icon name='circle'size={11} color="#06102F"/> 
        </View>
        <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.getStartedButton} onPress={goToDashboard} activeOpacity={0.8}>
        <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};

export default Screen4;

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
    gap: 8,
    justifyContent:'center',
    marginTop: 30
  },
  buttonContainer:{
    alignItems: 'center'
  },
  getStartedButton: {
    borderWidth: 1,
    borderColor: '#06102F',
    backgroundColor: '#06102F',
    padding: 10,
    width: 400,
    borderRadius: 5,
    paddingVertical: 15,
    marginTop: 30,
  },
 getStartedText: {
    fontWeight: 600,
    textAlign: 'center',
    fontSize: 15,
    color: 'white'
  }
});

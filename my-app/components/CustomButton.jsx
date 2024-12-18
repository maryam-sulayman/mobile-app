import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';

const customButton = ({title, handlePress, style, isLoading}) => {
  return (
    <View>
    <TouchableOpacity style={[styles.button, style]}
    activeOpacity={0.9}
    onPress={handlePress}
    disabled= {isLoading}
    >
   {isLoading ? <ActivityIndicator color="#fff" /> : 
   <Text 
   style={[styles.title, title === 'See Details' && {textAlign: 'left'}, title==='Subscribe'&& {color: '#061031'}]}>{title}</Text>}
  </TouchableOpacity>
  {title === 'See Details' && (
  <Icon name='angle-right'  size={28} color="white" style={styles.icon}/> 
  )}
    </View>
  )
}

export default customButton

const styles = StyleSheet.create({
title: {
textAlign: "center",
 color: 'white',
 fontWeight: 600,
 letterSpacing: 0.7,
 fontSize: 17,
},
button: {
padding: 15,
borderRadius: 8,
backgroundColor: '#06102F',
},
icon: {
  position: 'absolute',
  bottom: 9,
  left: 115
}
})
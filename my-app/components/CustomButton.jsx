import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'

const customButton = ({title, handlePress, style, isLoading}) => {
  return (
    <View>
    <TouchableOpacity style={[styles.button, style]}
    activeOpacity={0.9}
    onPress={handlePress}
    disabled= {isLoading}
    >
   {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.title}>{title}</Text>}
  </TouchableOpacity>
    </View>
  )
}

export default customButton

const styles = StyleSheet.create({
title: {
textAlign: "center",
 color: 'white',
 fontWeight: 600,
 letterSpacing: 0.7
},
button: {
padding: 15,
borderRadius: 8
}
})
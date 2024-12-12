import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';

const FormField = ({title, value, placeholder, handleChangeText, style, error, ...props}) => {
const [showPassword, setshowPassword] = useState(false)

  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <View style={[styles.formField, style]}>
        <TextInput 
        value={value}
        placeholder={placeholder}
        placeholderTextColor='#7b7b8b'
        onChangeText={handleChangeText}
        secureTextEntry = {(title === 'Password' || title === 'Confirm Password') && !showPassword}
        style={styles.textInput}
        {...props}/>
         {(title === 'Password'  || title ===  'Confirm Password') && (
        <TouchableOpacity onPress={()=> setshowPassword(!showPassword)}>
         <Icon name={showPassword? 'eye' : 'eye-slash'}  size={20} color="#06102F" />
        </TouchableOpacity>
      )}
      {placeholder==='Search' && (
         <Icon name='search'  size={20} color="#06102F" />
      )}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  )
}

export default FormField

const styles = StyleSheet.create({
    formField: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginVertical: 6,
    flexDirection: 'row',
    shadowColor: '#06102F',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    },
    textInput: {
     flex: 1,
     fontSize: 17
    },
    title: {
    fontSize: 15
    },
    error: {
      position: 'absolute',
      top: 75,
      color: 'red'
    }
})
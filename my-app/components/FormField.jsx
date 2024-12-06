import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';

const FormField = ({title, value, placeholder, handleChangeText, style, ...props}) => {
const [showPassword, setshowPassword] = useState(false)

  return (
    <View style={style}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.formField}>
        <TextInput 
        value={value}
        placeholder={placeholder}
        placeholderTextColor='#7b7b8b'
        onChangeText={handleChangeText}
        secureTextEntry = {title === 'Password' && !showPassword}
        style={styles.textInput}
        props={props}/>
         {title === 'Password' && (
        <TouchableOpacity onPress={()=> setshowPassword(!showPassword)}>
         <Icon name={showPassword? 'eye' : 'eye-slash'}  size={20} color="black" />
        </TouchableOpacity>
      )}
      </View>
    </View>
  )
}

export default FormField

const styles = StyleSheet.create({
    formField: {
    borderWidth: 1,
    borderColor: 'grey',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginVertical: 6,
    flexDirection: 'row'
    },
    textInput: {
     flex: 1
    },
    title: {
  
    }
})
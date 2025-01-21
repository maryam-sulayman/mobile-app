import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { auth, database } from '../fireBaseConfig';
import { Picker } from '@react-native-picker/picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const CreateStaff = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('staff'); 
  const [isLoading, setIsLoading] = useState(false);

  const handleAddUser = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { uid } = userCredential.user;

      const userRef = ref(database, `users/${uid}`);
      await set(userRef, {
        name,
        email,
        role,
        createdAt: new Date().toISOString(),
      });

      Alert.alert('Success', `${role === 'staff' ? 'Staff' : 'Admin'} account created successfully!`);
      setName('');
      setEmail('');
      setPassword('');
      setRole('staff'); 
    } catch (error) {
      console.error('Error adding user:', error);
      Alert.alert('Error', 'Failed to add user. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add New Staff</Text>

      <Text style={styles.label}>Staff Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Staff Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Staff Password:</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Text style={styles.label}>Staff Role:</Text>
      <Picker
        selectedValue={role}
        onValueChange={(itemValue) => setRole(itemValue)}
        style={styles.picker}
        itemStyle={{ color: 'green', fontWeight: 'bold' }} 
      >
        <Picker.Item label="Staff" value="staff" />
        <Picker.Item label="Admin" value="admin" />
      </Picker>

      <TouchableOpacity style={styles.button} onPress={handleAddUser} disabled={isLoading}>
        <Text style={styles.buttonText}>{isLoading ? 'Creating User...' : 'Create User'}</Text>
        <FontAwesome name="plus" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default CreateStaff;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#E1E0E6", 
    height: '100%'
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 25,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 13,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 10,
  },
  picker: {
    marginBottom: 56,
    fontSize: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#06102F',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent:'center',
    gap: 15
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});

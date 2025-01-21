import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform, 
  ScrollView
} from "react-native";
import { ref, push, remove, onValue } from "firebase/database";
import { database } from "../fireBaseConfig";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function ManageRooms() {
  const [activeTab, setActiveTab] = useState("List Room");
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState({
    name: "",
    image: "",
    location: "",
    price: "",
    rating: "",
    description: "",
    amenities: "",
  });

  // Fetch rooms from Firebase
  useEffect(() => {
    const roomsRef = ref(database, "rooms");
    const unsubscribe = onValue(roomsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const roomsArray = Object.entries(data).map(([id, room]) => ({
          id,
          ...room,
        }));
        setRooms(roomsArray);
      } else {
        setRooms([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const addRoom = async () => {
    const { name, image, location, price, rating, description, amenities } =
      newRoom;

    if (
      !name ||
      !image ||
      !location ||
      !price ||
      !rating ||
      !description ||
      !amenities
    ) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    const roomsRef = ref(database, "rooms");
    try {
      await push(roomsRef, {
        ...newRoom,
        price: parseFloat(price),
        rating: parseFloat(rating),
        amenities: amenities.split(",").map((amenity) => amenity.trim()),
      });
      setNewRoom({
        name: "",
        image: "",
        location: "",
        price: "",
        rating: "",
        description: "",
        amenities: "",
      });
      Alert.alert("Success", "Room added successfully.");
    } catch (error) {
      console.error("Error adding room:", error);
      Alert.alert("Error", "Failed to add room.");
    }
  };

  const deleteRoom = async (roomId) => {
    const roomRef = ref(database, `rooms/${roomId}`);
    try {
      await remove(roomRef);
      Alert.alert("Success", "Room deleted successfully.");
    } catch (error) {
      console.error("Error deleting room:", error);
      Alert.alert("Error", "Failed to delete room.");
    }
  };

  const renderListRoom = () => (

    <View style={styles.form}>
      <Text style={styles.label}>Room Name:</Text>
      <TextInput
        style={styles.input}
        value={newRoom.name}
        onChangeText={(text) => setNewRoom({ ...newRoom, name: text })}
      />
      <Text style={styles.label}>Image URL:</Text>
      <TextInput
        style={styles.input}
        value={newRoom.image}
        onChangeText={(text) => setNewRoom({ ...newRoom, image: text })}
      />
      <Text style={styles.label}>Location:</Text>
      <TextInput
        style={styles.input}
        value={newRoom.location}
        onChangeText={(text) => setNewRoom({ ...newRoom, location: text })}
      />
      <Text style={styles.label}>Price:</Text>
      <TextInput
        style={styles.input}
        value={newRoom.price}
        onChangeText={(text) => setNewRoom({ ...newRoom, price: text })}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Rating:</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., 4.5"
        value={newRoom.rating}
        onChangeText={(text) => setNewRoom({ ...newRoom, rating: text })}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        value={newRoom.description}
        onChangeText={(text) => setNewRoom({ ...newRoom, description: text })}
        multiline
      />
      <Text style={styles.label}>Amenities:</Text>
      <TextInput
        style={styles.input}
        placeholder="maximum of 3, seperate with a comma"
        value={newRoom.amenities}
        onChangeText={(text) => setNewRoom({ ...newRoom, amenities: text })}
      />
      <TouchableOpacity style={styles.addButton} onPress={addRoom}>
        <Text style={styles.addButtonText}>Add Room</Text>
        <FontAwesome name="plus" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );

  const renderManageRooms = () => (
    <FlatList
      data={rooms}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <View style={{flexDirection: 'row', alignItems:'center', gap: 15}}>
          <Image source={{ uri: item.image }} style={styles.cardImage} />
          
          <View>
          <Text style={styles.cardText}>
             {item.name}
          </Text>
          <Text style={styles.cardText}>
      
            {item.location}
          </Text>
          <Text style={styles.cardText}>
            Price:{" "}£{item.price}
          </Text>
          <Text style={styles.cardText}>
       Rating:{" "}{item.rating}
          </Text>
          <Text style={styles.cardText}>
           Amenities:{" "}
            {item.amenities.join(", ")}
          </Text>
          </View>
          </View>
         <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
         <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteRoom(item.id)}
          >
           
            <Text style={styles.deleteButtonText}>  <FontAwesome name="trash" size={18} color="white"/> {" "}Delete Room</Text>
          </TouchableOpacity>
          <Text style={styles.cardDescription}>Description:{" "}{item.description}</Text>
    
          </View>
        </View>
      )}
    />
  );

  return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
          <View style={styles.tabHeader}>
            <TouchableOpacity
              style={[styles.tab, activeTab === "List Room" && styles.activeTab]}
              onPress={() => setActiveTab("List Room")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "List Room" && styles.activeTabText,
                ]}
              >
                List A Room
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === "Manage Rooms" && styles.activeTab]}
              onPress={() => setActiveTab("Manage Rooms")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "Manage Rooms" && styles.activeTabText,
                ]}
              >
                All Listed Rooms
              </Text>
            </TouchableOpacity>
          </View>
    
          {activeTab === "List Room" ? (
            <ScrollView
              contentContainerStyle={{ paddingBottom: 16 }}
              keyboardShouldPersistTaps="handled"
            >
              {renderListRoom()}
            </ScrollView>
          ) : (
            renderManageRooms()
          )}
        </View>
      </KeyboardAvoidingView>
    );
    

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f7f7f7",
  },
  tabHeader: {
    flexDirection: "row",
    marginBottom: 10,
    marginTop: 25,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  tab: {
    flex: 1,
    padding: 12,
    alignItems: "center",
  },
  activeTab: { 
    borderBottomWidth: 3, 
    borderColor: "#06102F" },

  tabText: 
  { 
    fontSize: 16,
     color: "#555" },

  activeTabText:
   {
     color: "#06102F",
     fontWeight: "bold" },

  header: { 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 16 },

  form: { 
    padding: 20,
    paddingTop: 40,
     backgroundColor: "#E1E0E6", 
     borderRadius: 10 },

  label: { 
    fontSize: 15,
     marginBottom: 10, 
     fontWeight: "bold",
      color: "#333" },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  addButton: {
    backgroundColor: "#06102F",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    marginVertical: 15

  },
  addButtonText: {
     color: "#fff",
     fontWeight: "bold",
      fontSize: 16 },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 16,
    borderRadius: 10,
    elevation: 3,

  },
  cardImage: { 
    width: 150,
     height: 150, borderRadius: 8,
      marginBottom: 8 },

  cardText: { fontSize: 16,
     marginBottom: 10 },

  cardDescription: {
    fontSize: 16,
    marginBottom: 8, 
    color: "#666",
   borderWidth: 1,
   padding: 5,
   borderRadius: 5,
   borderColor: "#D4D4D4",
width: '60%'
   
  },

  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 8,
  },
  deleteButtonText: { 
    color: "#fff",
     fontWeight: "bold",
      fontSize: 16,
      backgroundColor: "#D63802",
      padding: 10,
      borderRadius: 4,
    },
});

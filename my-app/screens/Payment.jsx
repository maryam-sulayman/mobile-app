import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useStripe } from "@stripe/stripe-react-native";
import { auth, database } from "../fireBaseConfig";
import { ref, push } from "firebase/database";
import { useRouter, useLocalSearchParams } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { format } from "date-fns";
import Icon from "react-native-vector-icons/FontAwesome";

const Payment = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [isPaymentSheetInitialized, setIsPaymentSheetInitialized] =
    useState(false);
  const router = useRouter();
  const { room, checkInDate, checkOutDate, image } = useLocalSearchParams();
  const parsedRoom = room ? JSON.parse(room) : null;
  const formattedCheckInDate = format(new Date(checkInDate), "dd MMMM, yyyy");
  const formattedCheckOutDate = format(new Date(checkOutDate), "dd MMMM, yyyy");

  if (!parsedRoom) {
    Alert.alert("Error", "Room details are missing. Redirecting to Home.");
    router.push("/(tabs)/home");
    return null;
  }

  const pricePerNight = parsedRoom.price;

  // Calculate number of nights
  const numberOfNights = Math.max(
    1,
    Math.ceil(
      (new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) /
        (1000 * 60 * 60 * 24)
    )
  );

  const totalPrice = numberOfNights * pricePerNight;

  const fetchPaymentSheetParams = async () => {
    try {
      const response = await fetch(
        "https://vaulted-periwinkle-parenthesis.glitch.me/create-payment-sheet",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: totalPrice * 100,
            currency: "usd",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch payment sheet params");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching payment sheet params:", error);
      Alert.alert(
        "Error",
        "Failed to fetch payment details. Please try again."
      );
      return null;
    }
  };

  const initializePaymentSheet = async () => {
    const paymentSheetParams = await fetchPaymentSheetParams();

    if (!paymentSheetParams) {
      Alert.alert(
        "Error",
        "Unable to initialize payment sheet. Please try again."
      );
      return;
    }

    const { paymentIntent, ephemeralKey, customer } = paymentSheetParams;

    const { error } = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
    });

    if (error) {
      console.error("Error initializing payment sheet:", error);
      Alert.alert("Error", "Unable to initialize payment sheet.");
    } else {
      setIsPaymentSheetInitialized(true);
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  const saveBookingToFirebase = async (userId, bookingData) => {
    try {
      const bookingsRef = ref(database, `bookings/${userId}`);
      console.log("Firebase Ref Path:", bookingsRef.toString());
      console.log("Booking Data to Save:", bookingData);

      await push(bookingsRef, bookingData);
      console.log("Booking saved successfully");
    } catch (error) {
      console.error("Error saving booking:", error);
      Alert.alert("Error", "Failed to save booking. Please try again.");
    }
  };

  const handlePay = async () => {
    if (!isPaymentSheetInitialized) {
      Alert.alert("Error", "Payment sheet is not ready. Please try again.");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      Alert.alert("Error", "You must be logged in to make a booking.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await presentPaymentSheet();

      if (error) {
        console.error("Payment failed:", error.message);
        Alert.alert("Payment Failed", error.message);
      } else {
        const bookingData = {
          roomName: parsedRoom.name,
          price: totalPrice,
          checkInDate,
          checkOutDate,
          image,
          status: "Completed",
        };

        await saveBookingToFirebase(user.uid, bookingData);
        Alert.alert("Payment Successful", "Your booking has been confirmed!");
        router.push("/(tabs)/bookings");
      }
    } catch (error) {
      console.error("Payment error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Icon name="chevron-left" size={18} color="#06102F" />
        <Text style={styles.backButtonText}>Go Back</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Confirm Payment Details</Text>

      <View style={styles.summaryContainer}>
        {image && <Image source={{ uri: image }} style={styles.roomImage} />}
        <View style={styles.textContainer}>
          <Text style={styles.text}>Room type:</Text>
          <Text style={styles.text}>{parsedRoom.name}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Check-in Date:</Text>
          <Text style={styles.text}>{formattedCheckInDate}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Check-out Date:</Text>
          <Text style={styles.text}>{formattedCheckOutDate}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Number of Nights:</Text>
          <Text style={styles.text}>{numberOfNights}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Total Price:</Text>
          <Text style={styles.text}>£{totalPrice}</Text>
        </View>
      </View>

      <CustomButton
        title={loading ? "Processing..." : "Pay Now"}
        handlePress={handlePay}
        disabled={loading || !isPaymentSheetInitialized}
      />
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
    color: "#06102F",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    marginVertical: 20,
  },
  summaryContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
  },
  roomImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  text: {
    fontSize: 17,
    fontWeight: 600,
    paddingBottom: 8,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    borderBottomWidth: 1,
  },
});

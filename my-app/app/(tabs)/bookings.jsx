import React from 'react'
import BookingHistory from '../../screens/BookingHistory'
import { SafeAreaView } from 'react-native-safe-area-context'

const bookings = () => {
  return (
    <SafeAreaView>
      <BookingHistory/>
    </SafeAreaView>
  )
}

export default bookings
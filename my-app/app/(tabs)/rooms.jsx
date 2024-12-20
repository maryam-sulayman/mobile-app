import RoomList from '../../screens/RoomList'
import { SafeAreaView } from 'react-native-safe-area-context'

const rooms = () => {
  return (
    <SafeAreaView>
      <RoomList/>
    </SafeAreaView>
  )
}

export default rooms
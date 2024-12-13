import { Image} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const SingleRoom = () => {
  return (
    <SafeAreaView>
      <Image source={require('../assets/images/react-logo.png')}/>
      <View>
        <Text>Name</Text>
      </View>
    </SafeAreaView>
  )
}

export default SingleRoom
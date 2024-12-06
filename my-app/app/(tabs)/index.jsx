import { View, StyleSheet } from 'react-native';
import {Redirect, router} from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton'

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <View>
  <CustomButton
  title='this is index'
  handlePress = {()=> router.push('/sign-in')}/>
</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});

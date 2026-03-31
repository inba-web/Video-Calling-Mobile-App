import { View, Text } from 'react-native'
import React from 'react'
import { useAppContext } from '../contexts/AppProvider'

const ExploreScreen = () => {
  const {channel, } = useAppContext();

  return (
    <View>
      <Text>ExploreScreen</Text>
    </View>
  )
}

export default ExploreScreen
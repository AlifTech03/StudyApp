import { View, Text } from 'react-native'
import React from 'react'
import { useAppContext } from '@/contexts/AppProvider';

const ExploreMain = () => {
    const {channel, thread} = useAppContext();
  return (
    <View>
      <Text>ExploreMain</Text>
    </View>
  )
}

export default ExploreMain
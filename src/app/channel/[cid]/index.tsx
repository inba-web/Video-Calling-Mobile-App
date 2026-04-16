import { View, Text } from 'react-native'
import React, { use } from 'react'
import { useAppContext } from '@/app/contexts/AppProvider'
import { Channel, useChatContext } from 'stream-chat-expo';
import { useNavigation, useRouter } from 'expo-router';
import { useHeaderHeight } from '@react-navigation/elements';
import { FullScreenLoading } from '@/app/components/FullScreenLoading';

const ChannelScreen = () => {

  const {channel, setThread} = useAppContext();
  const {client} = useChatContext();

  const router = useRouter();
  const navigation = useNavigation();

  const headerHeight  = useHeaderHeight();
  
  let displayName = "";
  let avatarUl = "";

  if(channel){
    const memebers = Object.values(channel.state.members);
    const otherMembers = memebers.find((member) => member.user_id !== client.userID);
    displayName = otherMembers?.user?.name!,
    avatarUl = otherMembers?.user?.image || "";
  }

  if(!channel) return <FullScreenLoading message='Loading study room...' />


  return (
    <View className='flex-1 bg-border'>
      <Channel
        channel={channel}
      />
    </View>
  )
}

export default ChannelScreen
import { View, Text } from 'react-native'
import React, { use } from 'react'
import { useAppContext } from '@/app/contexts/AppProvider'
import { Channel, MessageInput, MessageList, useChatContext } from 'stream-chat-expo';
import { useNavigation, useRouter } from 'expo-router';
import { useHeaderHeight } from '@react-navigation/elements';
import { FullScreenLoading } from '@/app/components/FullScreenLoading';
import EmptyState from '@/app/components/EmptyState';

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
        keyboardVerticalOffset={headerHeight}
        EmptyStateIndicator={() => { <EmptyState icon='book-outline' title='No Message Yet..' subtitle='Start a study conversation!' />}}
      />

      <MessageList
        onThreadSelect={(thread) => {
          setThread(thread);
          router.push(`/channel/${channel.cid}/thread/${thread?.cid}`) 
        }}
       />

       <View className='pb-5 bg-surface'>
        <MessageInput />
       </View>
    </View>
  )
}

export default ChannelScreen
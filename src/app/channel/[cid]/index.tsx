import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { use, useLayoutEffect } from 'react'
import { useAppContext } from '@/app/contexts/AppProvider'
import { Channel, MessageInput, MessageList, useChatContext } from 'stream-chat-expo';
import { useNavigation, useRouter } from 'expo-router';
import { headerTitle, useHeaderHeight } from '@react-navigation/elements';
import { FullScreenLoading } from '@/app/components/FullScreenLoading';
import EmptyState from '@/app/components/EmptyState';
import { COLORS } from '@/app/lib/theme';
import { Ionicons } from "@expo/vector-icons";


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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShow: true,
      headerStyle: {
        backgroundColor: COLORS.surface
      },
      headerTintColor: COLORS.text,
      headerLeft: () => {
        <TouchableOpacity onPress={() => router.back()} className='ml-2 flex-row items-center'>
          <Ionicons name='arrow-back' size={24} color={COLORS.text} />
        </TouchableOpacity>
      },
      headerTitle: () => {
        <View className='items-center flex-row'>
          {avatarUl ? (
            <Image source={avatarUl}  style={{height:32 , width: 32, borderRadius: 16, marginRight: 10}}/>
          ) : (
            <View className='mr-2.5 h-8 w-8 items-center justify-center rounded-full' style={{backgroundColor: COLORS.primary}}>
              <Text className='text-base font-semibold text-foreground'>
                {displayName.charAt(0).toUpperCase()}
              </Text>
            </View>
          )
          }
          <Text className='font-semibold text-foreground'>{displayName}</Text>
        </View>
      },
      headerRight: () => {
        <TouchableOpacity onPress={() => {}}>
          
          <Ionicons name='videocam-outline' size={24} color={COLORS.primary} />
        </TouchableOpacity>
      }
    })
  },[])

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
          // router.push(`/channel/${channel.cid}/thread/${thread?.cid}`) 
        }}
       />

       <View className='pb-5 bg-surface'>
        <MessageInput />
       </View>
    </View>
  )
}

export default ChannelScreen
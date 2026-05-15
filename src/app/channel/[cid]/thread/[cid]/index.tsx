import { View, Text } from 'react-native'
import React from 'react'
import { useAppContext } from '@/app/contexts/AppProvider'
import { useHeaderHeight } from '@react-navigation/elements';
import { FullScreenLoading } from '@/app/components/FullScreenLoading';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Channel, Thread } from 'stream-chat-expo';
import EmptyState from '@/app/components/EmptyState';

const ThreadScreen = () => {

  const{thread, channel, setThread} = useAppContext();
  const headerHight = useHeaderHeight();

  if(channel === null) return <FullScreenLoading message='Loading Thread' />

  return (
    <SafeAreaView className='flex-1 bg-surface'>
      <Channel 
        channel={channel}
        thread={thread}
        threadList
        keyboardVerticalOffset={headerHight}
        EmptyStateIndicator={() => (
          <EmptyState icon='book-outline' title='No message yet' subtitle='Start a study conversation!' />
        )}
      >

        <View className='flex-1 justify-start'>
          <Thread onThreadDismount={() => setThread(null)} />
        </View>

      </Channel>
    </SafeAreaView>
  )
}

export default ThreadScreen
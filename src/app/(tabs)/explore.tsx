import { View, Text, Pressable, ActivityIndicator, FlatList, TextInput } from "react-native";
import React, { useState } from "react";
import { useAppContext } from "../contexts/AppProvider";
import { useUser } from "@clerk/clerk-expo";
import { useChatContext } from "stream-chat-expo";
import useStreamUsers from "../hooks/useStreamUsers";
import useStartChat from "../hooks/useStartChat";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "../lib/theme";
import ListEmptyComponent from "../components/ListEmptyComponents";
import type { UserResponse } from "stream-chat";
import ExploreCartUser from "../components/ExploreCartUser";


const ExploreScreen = () => {
  const { setChannel } = useAppContext();
  const { user } = useUser();
  const { client } = useChatContext();
  const userId = user?.id ?? "";

  const [creating, setCreating] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const { users, loading } = useStreamUsers(client, userId);

  const { handleStartChat } = useStartChat({client,userId,setChannel,setCreating});

  const filteredUsers = !search.trim() ? users : users.filter((u) => 
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.id.toLowerCase().includes(search.toLowerCase())
  )

  const renderUserItem = ({item}:{item: UserResponse}) => {
    return(
      <ExploreCartUser item={item} creating={creating} onStartChat={handleStartChat} />
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* header */}
      <View className="px-5 pt-3 pb-1">
        <Text className="text-[28px] font-bold text-foreground">Explore</Text>
        <Text className="text-sm text-foreground-muted mt-1">Find people and start chatting</Text>
      </View>

      {/* search bar */}
      <View className="flex-row items-center bg-surface mx-5 my-4 px-3.5 py-3.5 rounded-[14px] gap-2.5 border border-border">
        <Ionicons name="search" size={18} color={COLORS.textMuted} />
        <TextInput 
          className="flex-1 text-[15px] text-foreground"
          placeholder="Search people..."
          placeholderTextColor={COLORS.textMuted}
          value={search}
          onChangeText={setSearch}
          autoCapitalize="none"
          autoCorrect={false}
        />

        {search.length > 0 && (
          <Pressable onPress={() => setSearch("")}>
            <Ionicons name="close-circle" size={18} color={COLORS.textMuted}  />
          </Pressable>
        )}
      </View>

      {/* users lists */}
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator  size="large" color={COLORS.primary} />
        </View>
      ): (
        <FlatList
          data={filteredUsers}
          keyExtractor={(item) => item.id}
          renderItem={renderUserItem}
          contentContainerStyle={{paddingHorizontal: 20, paddingBottom: 20}}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<ListEmptyComponent />}
         />
      )
    }

    </SafeAreaView>
  );
};

export default ExploreScreen;

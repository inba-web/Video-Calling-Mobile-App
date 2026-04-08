import { useUser } from "@clerk/clerk-expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Sentry from "@sentry/react-native";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppContext } from "../contexts/AppProvider";
import { COLORS } from "../lib/theme";
import { getGreetingHour } from "../lib/utils";
import { TextInput } from "react-native-gesture-handler";
import { ChannelList } from "stream-chat-expo";

const ChatsScreen = () => {
  const router = useRouter();
  const { setChannel } = useAppContext();
  const { user } = useUser();
  const [search, setSearch] = useState("");

  const filters = {
    members: {$in:[user?.id!]}, type:"messaging"
  };

  if (!user) {
    Sentry.captureMessage("User not found in ChatsScreen", {
      level: "warning",
    });
    return null;
  }

  const firstUserName = user.firstName || "there";

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* header */}
      <View className="px-5 pt-3 pb-2">
        <Text className="text-sm text-foreground-muted mb-0.5">
          {getGreetingHour()}, {firstUserName}!
        </Text>
      </View>

      {/* search bar */}
      <View className="flex-row items-center bg-surface mx-5 mb-3 px-3.5 py-3 rounded-[14px] gap-2.5 border border-border">
        <Ionicons name="search" size={18} color={COLORS.textMuted} />
        <TextInput
          className="flex-1 text-[15px] text-foreground"
          placeholder="Search study rooms.."
          placeholderTextColor={COLORS.textMuted}
          value={search} 
          onChangeText={setSearch}
         />
      </View>

      {/* section label */}
      <View className="flex-row items-center px-5 my-1.5 gap-2">
        <Ionicons name="chatbubbles" size={16} color={COLORS.primaryLight} />
        <Text className="text-primary-light text-[15px] font-semibold">Your Study Sessions</Text>
      </View>

      {/* channel list */}

      <ChannelList
        filters={filters} 
        options={{state:true, watch:true}}
      />
    </SafeAreaView>
  );
};

export default ChatsScreen;

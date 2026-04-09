import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import type { UserResponse } from "stream-chat";

type ExploreUserCardProps = {
  item: UserResponse;
  creating: string | null;
  onStartChat: (targetId: string) => void;
};

const ExploreCartUser = ({
  item,
  creating,
  onStartChat,
}: ExploreUserCardProps) => {
  return (
    <Pressable className="flex-row items-center bg-surface rounded-2xl p-3.5 mb-2.5 border border-border gap-3.5"
        onPress={() => onStartChat(item.id)}
        disabled={creating !== null}
    >
        <Image source={item.image} 
            style={{width: 40, height: 40, borderRadius: 24}}
            contentFit="cover"
         />

        {item.online && (
            <View className="w-3 h-3 rounded-full bg-accent-secondary absolute left-[50px] top-[46px] border-surface" />
        )}

        {/* user info */}
        <View className="flex-1">
            <Text className="text-base font-semibold text-foreground" numberOfLines={1}>{item.name || item.id}</Text>
            <Text className="text-xs text-foreground mt-0.5">{item.online ? "Online" : "Offline"}</Text>
        </View>

    </Pressable>
  );
};

export default ExploreCartUser;

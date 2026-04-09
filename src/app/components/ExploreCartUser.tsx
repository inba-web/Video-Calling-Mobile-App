import { View, Text, Pressable } from "react-native";
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
    >

    </Pressable>
  );
};

export default ExploreCartUser;

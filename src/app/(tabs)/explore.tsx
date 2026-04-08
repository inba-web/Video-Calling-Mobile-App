import { View, Text } from "react-native";
import React, { useState } from "react";
import { useAppContext } from "../contexts/AppProvider";
import { useUser } from "@clerk/clerk-expo";
import { useChatContext } from "stream-chat-expo";
import useStreamUsers from "../hooks/useStreamUsers";

const ExploreScreen = () => {
  const { setChannel } = useAppContext();
  const { user } = useUser();
  const { client } = useChatContext();
  const userId = user?.id ?? "";

  const [creating, setCreating] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const { users, loading } = useStreamUsers(client, userId);

  return (
    <View>
      <Text>ExploreScreen</Text>
    </View>
  );
};

export default ExploreScreen;

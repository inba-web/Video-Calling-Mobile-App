import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { StreamChat, Channel } from "stream-chat";

type UseStartChatParams = {
  client: StreamChat;
  userId: string;
  setChannel: (channel: Channel | null) => void;
  setCreating: (creating: string | null) => void;
};

const useStartChat = ({
  client,
  userId,
  setChannel,
  setCreating,
}: UseStartChatParams) => {
  const router = useRouter();

  const handleStartChat = async (targetId: string) => {
    setCreating(targetId);

    try {
      const channel = client.channel("messaging", {
        members: [userId, targetId],
      });
      await channel.watch();

      setChannel(channel);
      router.push(`/channel/${channel.id}`);
    } catch (error) {
      console.log("Error creating channel: ", error);
      Alert.alert("Error", "Failed to start chat. Please try again.");
    } finally {
      setCreating(null);
    }
  };

  return { handleStartChat };
};

export default useStartChat;

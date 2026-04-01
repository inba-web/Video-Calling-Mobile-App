import { ActivityIndicator, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../lib/theme";

type Props = {
  message: string;
};

export const FullScreenLoading = ({ message }: Props) => {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator
          size="large"
          color={COLORS.primary}
          className="mb-2"
        />
        <Text className="text-foreground-muted">{message}</Text>
      </View>
    </SafeAreaView>
  );
};

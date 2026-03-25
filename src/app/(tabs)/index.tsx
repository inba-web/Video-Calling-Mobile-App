import { View, Text, Button } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Sentry from "@sentry/react-native";

const ChatsScreen = () => {
  return (
    <SafeAreaView>
      <View>
        <Text>ChatsScreen</Text>
        <Button
        title="Try!"
        onPress={() => {
          Sentry.captureException(new Error("First error"))
        }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChatsScreen;

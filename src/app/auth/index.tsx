import { View, Text } from "react-native";
import React from "react";
import { useAuth } from "@clerk/expo";
import { Redirect } from "expo-router";

const index = () => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href={"/"} />;
  } 

  return (
    <View>
      <Text>AuthScreen</Text>
    </View>
  );
};

export default index;

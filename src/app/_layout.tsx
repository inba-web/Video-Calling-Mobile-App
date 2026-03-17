import { ClerkProvider } from "@clerk/expo";
import { Stack } from "expo-router";
import { tokenCache } from "@clerk/expo/token-cache";
import "../../global.css";

export default function RootLayout() {
  return ( 
    <ClerkProvider tokenCache={tokenCache} publishableKey="">
      <Stack>
        <Stack.Screen name="index" options={{ title: "Home" }} />
      </Stack>
    </ClerkProvider>
  );
}

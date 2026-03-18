import { ClerkProvider } from "@clerk/expo";
import { Stack } from "expo-router";
import { tokenCache } from "@clerk/expo/token-cache";
import "../../global.css";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || "pk_test_bWludC1zYXdmbHktNDIuY2xlcmsuYWNjb3VudHMuZGV2JA";

export default function RootLayout() {
  
  return ( 
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Home" }} />
      </Stack>
    </ClerkProvider>
  );
}

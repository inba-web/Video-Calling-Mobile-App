import { useSSO } from "@clerk/clerk-expo";
import { useState } from "react";
import { Alert } from "react-native";
import * as Linking from "expo-linking";

const useSocialAuth = () => {
  const [loadingStrategy, setLoadingStrategy] = useState<string | null>(null);
  const { startSSOFlow } = useSSO();

  const handleSocialAuth = async (
    strategy: "oauth_google" | "oauth_apple" | "oauth_github",
  ) => {
    if (loadingStrategy) return;

    setLoadingStrategy(strategy);

    try {
      const redirectUrl = Linking.createURL("/oauth-native-callback");

      const { createdSessionId, setActive } = await startSSOFlow({
        strategy,
        redirectUrl,
      });

      if (!createdSessionId || !setActive) {
        throw new Error("OAuth incomplete");
      }

      await setActive({ session: createdSessionId });
    } catch (error) {
      console.log("Error in social auth:", error);

      const provider =
        strategy === "oauth_google"
          ? "Google"
          : strategy === "oauth_apple"
            ? "Apple"
            : "Github";

      Alert.alert(
        "Sign-in failed",
        `${provider} sign-in failed. Please try again.`,
      );
    } finally {
      setLoadingStrategy(null);
    }
  };

  return { handleSocialAuth, loadingStrategy };
};

export default useSocialAuth;

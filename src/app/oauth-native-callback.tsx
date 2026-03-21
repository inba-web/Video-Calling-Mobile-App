import { useEffect } from "react";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";

export default function OAuthCallback() {

  const router = useRouter();

  useEffect(() => {
    WebBrowser.maybeCompleteAuthSession();
    router.replace("/");
  }, []);

  return null;
}
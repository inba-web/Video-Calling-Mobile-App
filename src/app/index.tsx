import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { Text, View, StyleSheet, Pressable } from "react-native";

export default function Index() {

  const { isSignedIn, isLoaded, signOut } = useAuth();
  
  if (!isLoaded) return null;

  if (!isSignedIn) {
    return <Redirect href={"/auth"} />;
  }

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>
        Edit src/app/index.tsx to edit this screen.
      </Text>

      <Pressable style={styles.button} onPress={() => signOut()}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    color: "red",
    fontSize: 16,
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#208AEF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },

  buttonText: {
    color: "white",
    fontWeight: "600",
  }

});
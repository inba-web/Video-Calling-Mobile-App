import { useAuth } from "@clerk/expo";
import { Redirect } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

export default function Index() {

  const {isSignedIn} = useAuth();
  
  if(!isSignedIn){
    return <Redirect href={"/auth"} />;
  } 

  return (
    <View style={styles.container}>
      <Text style={styles.container} className="text-red-500">
        Edit src/app/index.tsx to edit this screen.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

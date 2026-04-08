import {Text,View} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "../lib/theme";


export default function ListEmptyComponent() {
    return(
        <View className="items-center pt-20 gap-2">
            <Ionicons name="people-outline" size={48} color={COLORS.textSubtle} />
            <Text className="text-[17px] font-semibold text-foreground">No User Found</Text>
        </View>
    )
}


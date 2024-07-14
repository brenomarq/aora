import { Image, Text, View } from "react-native";

interface TabIcon {
  icon: ImageData;
  color: string;
  name: string;
  focused: boolean;
}

export default function TabIcon({ icon, color, name, focused }: TabIcon) {
  return (
    <View className="items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? "font-semibold" : "font-pregular"} text-xs`}
        style={{ color }}
      >
        {name}
      </Text>
    </View>
  );
}

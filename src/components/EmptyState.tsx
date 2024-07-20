import { images } from "@/constants";
import { router } from "expo-router";
import { Image, Text, View } from "react-native";
import CustomButton from "./CustomButton";

interface EmptyStateProps {
  title: string;
  subtitle: string;
}

export default function EmptyState({ title, subtitle }: EmptyStateProps) {
  return (
    <View className="justify-center items-center px-12">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />

      <Text className="text-xl font-psemibold text-white mt-2">{title}</Text>
      <Text className="font-pmedium text-sm text-gray-100">{subtitle}</Text>

      <CustomButton
        title="Create video"
        handlePress={() => router.replace("/create")}
        containerStyles="w-full my-5"
      ></CustomButton>
    </View>
  );
}

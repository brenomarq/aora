import { icons } from "@/constants";
import { Image, TextInput, TouchableOpacity, View } from "react-native";

interface SearchInput {
  placeholder: string;
}

export default function SearchInput({ placeholder }: SearchInput) {
  return (
    <View
      className="border-2 rounded-2xl border-black-200 w-full h-16 px-4
      bg-black-100 focus:border-secondary-100 items-center flex-row space-x-4"
    >
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        placeholder={placeholder}
        placeholderTextColor="#7B7B8B"
      />

      <TouchableOpacity>
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
}

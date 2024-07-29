import { icons } from "@/constants";
import { router, usePathname } from "expo-router";
import { useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";

interface SearchInput {
  initialQuery: string;
  placeholder?: string;
}

export default function SearchInput({
  initialQuery,
  placeholder,
}: SearchInput) {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  return (
    <View
      className="border-2 rounded-2xl border-black-200 w-full h-16 px-4
      bg-black-100 focus:border-secondary-100 items-center flex-row space-x-4"
    >
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        placeholder={placeholder}
        value={query}
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          if (pathname.startsWith("/search")) {
            router.setParams({ query });
          } else {
            router.push(`/search/${query}`);
          }
        }}
      >
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
}

import EmptyState from "@/components/EmptyState";
import SearchInput from "@/components/SearchInput";
import VideoCard from "@/components/VideoCard";
import { searchPosts } from "@/lib/appwrite";
import useAppWrite from "@/lib/useAppwrite";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import { Models } from "react-native-appwrite";

export default function Search() {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppWrite<Models.Document>(() =>
    searchPosts(query as string)
  );

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <FlatList
        data={posts}
        keyExtractor={(item: any) => item.$id}
        renderItem={({ item }) => {
          return (
            <VideoCard
              title={item.title}
              thumbnail={item.thumbnail}
              video={item.video}
              users={item.users}
            />
          );
        }}
        ListHeaderComponent={() => {
          return (
            <View className="my-6 px-4">
              <Text className="font-pmedium text-sm text-gray-100">
                Search Results
              </Text>
              <Text className="text-2xl font-psemibold text-white">
                {query}
              </Text>

              <View className="mt-6 mb-8">
                <SearchInput
                  initialQuery={query as string}
                  placeholder="Search for a video topic"
                />
              </View>
            </View>
          );
        }}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subtitle="No videos found for this search query"
          />
        )}
      ></FlatList>
    </SafeAreaView>
  );
}

import { FlatList, Text } from "react-native";

interface TrendingProps {
  posts: any;
}

export default function Trending({ posts }: TrendingProps) {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => {
        return (
          <Text key={item.id} className="text-3xl text-white">
            {item.id}
          </Text>
        );
      }}
      horizontal
    />
  );
}

import { useState } from "react";
import { FlatList, ViewToken } from "react-native";
import { Models } from "react-native-appwrite";
import TrendingItem from "./TrendingItem";

interface TrendingProps {
  posts: Models.Document[];
}

export default function Trending({ posts }: TrendingProps) {
  const [activeItem, setActiveItem] = useState(posts[0]);

  const viewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].item);
    }
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => {
        return (
          <TrendingItem key={item.id} item={item} activeItem={activeItem} />
        );
      }}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170, y: 0 }}
      horizontal
    />
  );
}

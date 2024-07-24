import { useEffect, useState } from "react";
import { Alert } from "react-native";

export default function useAppWrite<T>(fn: () => Promise<any>) {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await fn();

      if (!response) {
        throw new Error("Couldn't fetch data");
      }

      setData(response);
    } catch (err: any) {
      Alert.alert("Error", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, isLoading, refetch };
}

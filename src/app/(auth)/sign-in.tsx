import FormField from "@/components/FormField";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomButton from "@/components/CustomButton";
import { images } from "@/constants";
import { useGlobalContext } from "@/context/GlobalProvider";
import { signIn } from "@/lib/appwrite";
import { Link, router } from "expo-router";
import { useState } from "react";

export default function SignIn() {
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    const { email, password } = form;

    if (!email || !password) {
      return Alert.alert("Warning", "Please fill all the fields");
    }

    setIsSubmitting(true);

    try {
      const result = await signIn(email, password);
      setUser(result);
      setIsLoggedIn(true);

      router.replace("/home");
    } catch (err: any) {
      Alert.alert("Error", err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#161622",
        height: "100%",
      }}
    >
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />

          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold ">
            Log in to Aora
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) =>
              setForm({
                ...form,
                email: e.nativeEvent.text,
              })
            }
            otherStyles="mt-7"
            keyboardType="email-adress"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) =>
              setForm({
                ...form,
                password: e.nativeEvent.text,
              })
            }
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-semibold text-secondary-100"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

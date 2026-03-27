import useSSOSign from "@/hooks/auth/useSSO";
import {
  Ionicons,
  FontAwesome,
  FontAwesome6,
  AntDesign,
} from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  StyleSheet,
  useWindowDimensions,
  View,
  Text,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ListOfService: {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
}[] = [
  {
    id: "1",
    title: "Video Calls",
    icon: <FontAwesome name="video-camera" size={13} color="#A29BFE" />,
    color: "#A29BFE",
  },
  {
    id: "2",
    title: "Study Rooms",
    icon: <Ionicons name="chatbubbles" size={13} color="#FF7675" />,
    color: "#FF7675",
  },
  {
    id: "3",
    title: "Find Partners",
    icon: <Ionicons name="people-sharp" size={13} color="#00B894" />,
    color: "#00B894",
  },
];

const WelcomeMain = () => {
  const { width, height } = useWindowDimensions();
  const { handleSSOSign, loadingStrategy } = useSSOSign();
  console.log("Loading Strategy:", loadingStrategy);
  return (
    <View className="flex-1 bg-background">
      <View className="absolute inset-0">
        <LinearGradient
          style={styles.background}
          colors={["#0F0E17", "#1A1A2E", "#2D1B69", "#1A1A2E", "#0F0E17"]}
          start={{
            x: 0.5,
            y: 0.0,
          }}
          end={{
            x: 0.5,
            y: 1.0,
          }}
          locations={[0.0, 0.25, 0.5, 0.75, 1.0]}
        />
      </View>
      <SafeAreaView className="flex-1 items-center pt-20 px-5">
        <View className="mb-7 bg-primary-light/30 p-4 items-center justify-center border border-primary-dark rounded-3xl">
          <Ionicons name="school" size={32} color="#A29BFE" />
        </View>
        <View className="gap-y-2 mb-7">
          <Text className="text-4xl font-bold text-white">
            Welcome to StudyApp
          </Text>
          <Text className="text-xl text-center text-gray-50 font-semibold">
            Learn Together, Grow together
          </Text>
        </View>

        <Image
          source={require("@/assets/images/auth.png")}
          style={{ width: width * 0.8, height: height * 0.4 }}
        />
        <View className="flex-row items-center justify-center gap-x-3">
          {ListOfService.map((service) => (
            <View
              key={service.id}
              className={`flex-row items-center gap-x-2 bg-transparent px-4 py-2 rounded-full mb-3`}
              style={{
                borderWidth: 2,
                borderColor: `${service.color}45`,
              }}
            >
              <View>{service.icon}</View>
              <Text className="text-gray-100 text-xs font-bold">
                {service.title}
              </Text>
            </View>
          ))}
        </View>
        <View className="flex-1 w-full items-center justify-end mb-5">
          <View className=" flex-row gap-x-4 items-center">
            <View className=" flex-1 h-[.5px] bg-gray-300" />
            <Text className="text-gray-300 font-bold text-lg">
              CONTINUE WITH
            </Text>
            <View className="flex-1 h-[.5px] bg-gray-300" />
          </View>
          <View className="flex-row mt-5 items-center gap-x-4">
            <Pressable
              className="bg-white rounded-xl p-3 w-16 h-16 items-center justify-center"
              onPress={() => handleSSOSign("oauth_google")}
            >
              {loadingStrategy === "oauth_google" ? (
                <ActivityIndicator size="small" color="#000" />
              ) : (
                <Image
                  source={require("@/assets/images/google.png")}
                  style={{ width: 30, height: 30 }}
                />
              )}
            </Pressable>
            <Pressable
              className="bg-surface border border-gray-600 rounded-xl w-16 h-16 items-center justify-center"
              onPress={() => handleSSOSign("oauth_apple")}
            >
              {loadingStrategy === "oauth_apple" ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <FontAwesome6 name="apple" size={32} color="white" />
              )}
            </Pressable>
            <Pressable
              className="bg-surface border border-gray-600 rounded-xl w-16 h-16 items-center justify-center"
              onPress={() => handleSSOSign("oauth_github")}
            >
              {loadingStrategy === "oauth_github" ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <AntDesign name="github" size={32} color="white" />
              )}
            </Pressable>
          </View>
          <Text className="text-gray-300 text-center font-semibold mt-4">
            By continuing, you agree to our{" "}
            <Text className="text-primary-light underline font-bold">
              Terms of Service
            </Text>{" "}
            and{" "}
            <Text className="text-primary-light underline font-bold">
              Privacy Policy
            </Text>
            .
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default WelcomeMain;

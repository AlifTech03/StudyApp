import { COLORS } from "@/lib/theme";
import { useAuth, useUser } from "@clerk/expo";
import {
  Entypo,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { EaseView } from "react-native-ease";
import { SafeAreaView } from "react-native-safe-area-context";
import CheckBox from "./stateBox";

const MenuItems = [
  {
    label: "Notifications",
    icon: "notifications-outline",
    color: COLORS.primary,
  },
  {
    label: "Saved Resources",
    icon: "bookmark-outline",
    color: COLORS.accent,
  },
  {
    label: "Study History",
    icon: "time-outline",
    color: COLORS.accentSecondary,
  },
  {
    icon: "settings-outline",
    label: "Settings",
    color: COLORS.textMuted,
  },
];

const ProfileMain = () => {
  const [pressedIndex, setPressedIndex] = useState<number | null>(null);
  const [signOutPressed, setSignOutPressed] = useState(false);
  const { user, isLoaded, isSignedIn } = useUser();
  const { signOut } = useAuth();

  const handleSignOut = () => {
    setSignOutPressed(false);
    signOut();
  };
  if (!isLoaded) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#6C5CE7" />
        <Text className="text-gray-500 mt-4">Loading profile...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <SafeAreaView className="px-4">
        <Text className="text-gray-50 font-bold text-3xl">Profile</Text>
        <View className="items-center mt-10">
          <View className="border-2 border-primary rounded-full w-28 h-28 p-4 items-center justify-center">
            <Image
              source={user?.imageUrl}
              style={{
                height: 90,
                width: 90,
                borderRadius: 50,
              }}
            />
            <View
              className={`
                absolute z-10 bottom-3 right-0 border-2 border-surface ${isSignedIn ? "bg-success" : "bg-danger"} h-4 w-4 rounded-full
                `}
            />
          </View>
          <View className="items-center">
            <Text className="text-gray-100 font-bold text-2xl mt-2">
              {user?.fullName}
            </Text>
            <Text className="text-gray-400 text-sm">
              {user?.emailAddresses[0]?.emailAddress}
            </Text>
            <View className="flex-row gap-2 px-4 py-2 rounded-full items-center bg-warning/5 mt-2">
              <FontAwesome5 name="fire" size={15} color="#FDCB6E" />
              <Text className="text-warning font-semibold">{`${7} days study streak`}</Text>
            </View>
          </View>
        </View>
        <View className="flex-row items-center justify-around my-5">
          <CheckBox label="Sessions" ammount={"24"} />
          <CheckBox label="Partners" ammount={"12"} />
          <CheckBox label="Study Time" ammount={"24h"} />
        </View>

        {MenuItems.map((item, index) => (
          <EaseView
            key={index}
            animate={{
              scale: pressedIndex === index ? 0.95 : 1,
            }}
            transition={{
              type: "spring",
              damping: 15,
              stiffness: 200,
            }}
          >
            <Pressable
              onPressIn={() => setPressedIndex(index)}
              onPressOut={() => setPressedIndex(null)}
              className="flex-row items-center gap-4 border border-border bg-surface mb-2 rounded-xl px-4 py-3"
            >
              <View className="flex-1 items-center flex-row gap-4">
                <View
                  style={{ backgroundColor: `${item.color}15` }}
                  className="p-3 rounded-xl"
                >
                  <Ionicons
                    name={item.icon as any}
                    size={20}
                    color={item.color}
                  />
                </View>
                <Text className="text-gray-200 font-semibold text-base">
                  {item.label}
                </Text>
              </View>
              <Entypo name="chevron-right" size={24} color={COLORS.textMuted} />
            </Pressable>
          </EaseView>
        ))}
        <EaseView
          animate={{
            scale: signOutPressed ? 0.95 : 1,
          }}
          transition={{
            type: "spring",
            damping: 15,
            stiffness: 200,
          }}
        >
          <Pressable
            className="flex-row border bg-surface border-danger/50 rounded-xl items-center justify-center py-3 mt-4"
            onPressIn={() => setSignOutPressed(true)}
            onPressOut={handleSignOut}
          >
            <MaterialIcons name="exit-to-app" size={24} color={COLORS.danger} />
            <Text className="text-danger ml-2 text-lg font-bold">Sign Out</Text>
          </Pressable>
        </EaseView>
      </SafeAreaView>
    </View>
  );
};

export default ProfileMain;

import React from "react";
import { NativeTabs } from "expo-router/unstable-native-tabs";

const TabLayout = () => {
  return (
    <NativeTabs
      labelStyle={{
        selected: {
          color: "#6C5CE7",
          fontWeight: "700",
        },
      }}
      backgroundColor={"#0F0E17"}
      
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Chats</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="message" md="chat" selectedColor={"#6C5CE7"} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="explore">
        <NativeTabs.Trigger.Label>Explore</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf="safari"
          md="explore"
          selectedColor={"#6C5CE7"}
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf="person.fill"
          md="person"
          selectedColor={"#6C5CE7"}
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
};

export default TabLayout;


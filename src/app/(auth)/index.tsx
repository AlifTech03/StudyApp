import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Welcome = () => {
  const { width, height } = useWindowDimensions();
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
      <SafeAreaView>
        <Image
          source={require("@/assets/images/auth.png")}
          style={{ width: width * 0.8, height: height * 0.6 }}
        />
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
export default Welcome;

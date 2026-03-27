import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Sentry from "@sentry/react-native"; 

const Home = () => {
  return (
    <View className="flex-1">
      <SafeAreaView>
        <Text className="text-red-400">Home</Text>
        <Button
          title="Try!"
          onPress={() => {
            Sentry.captureException(new Error("First error"));
          }}
        />
      </SafeAreaView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});

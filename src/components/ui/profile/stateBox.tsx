import React from "react";
import { Text, View } from "react-native";

interface StateBoxProps {
  label: string;
  ammount: string;
}
const StateBox = ({ label, ammount }: StateBoxProps) => {
  return (
    <View className="bg-surface border border-border w-[30%] py-4 rounded-2xl items-center justify-center">
      <Text className="text-primary text-2xl font-bold">{ammount}</Text>
      <Text className="text-gray-400 font-semibold text-sm">{label}</Text>
    </View>
  );
};

export default StateBox;

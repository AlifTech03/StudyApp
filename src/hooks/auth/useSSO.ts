import { useSSO } from "@clerk/expo";
import { useState } from "react";
import { Alert } from "react-native";
const useSSOSign = () => {
  const { startSSOFlow } = useSSO();
  const [loadingStrategy, setLoadingStrategy] = useState<string | null>(null);
  const handleSSOSign = async (
    strategy: "oauth_google" | "oauth_apple" | "oauth_github",
  ) => {
    if (loadingStrategy) return;
    setLoadingStrategy(strategy);
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy,
      });
      if (!createdSessionId || !setActive) {
        const provider =
          strategy === "oauth_google"
            ? "Google"
            : strategy === "oauth_apple"
              ? "Apple"
              : "Github";
        Alert.alert(
          "Sign In Failed",
          `Failed to sign in with ${provider}. Please try again.`,
        );
        return;
      }
      await setActive({ session: createdSessionId });
    } catch (error) {
      console.error("SSO Sign-In Error:", error);
      Alert.alert(
        "Sign In Error",
        "An error occurred during sign-in. Please try again.",
      );
    } finally {
      setLoadingStrategy(null);
    }
  };
  return { handleSSOSign, loadingStrategy };
};

export default useSSOSign;

import { API_KEY } from "@/config/stream-config";
import { useToken } from "@/hooks/useStream";
import { COLORS, studyBuddyTheme } from "@/lib/theme";
import { syncUserToStream } from "@/utils/syncUser";
import { useUser } from "@clerk/expo";
import React, { useEffect } from "react";
import { ActivityIndicator, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Chat, OverlayProvider, useCreateChatClient } from "stream-chat-expo";

const ChatWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoaded } = useUser();
  const { token, error } = useToken(user?.id || "");
  const syncedRef = React.useRef(false);
  useEffect(() => {
    if (!syncedRef.current) {
      syncedRef.current = true;
      syncUserToStream(user as any);
    }
  }, [user]);

  if (!isLoaded) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: COLORS.background,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text className="text-primary-light font-bold text-xl">
          Loading user ...
        </Text>
      </SafeAreaView>
    );
  }
  if (!user) {
    return <>{children}</>;
  }
  const chatClient = useCreateChatClient({
    apiKey: API_KEY,
    userData: {
      id: user.id,
      name:
        user.username ||
        user.firstName ||
        user.emailAddresses[0]?.emailAddress.split("@")[0] ||
        "Guest",
      image: user.imageUrl || undefined,
    },
    tokenOrProvider: token,
  });

  if (!chatClient) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: COLORS.background,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text className="text-primary-light font-bold text-xl">
          Loading chat ...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <OverlayProvider
      value={{
        style: studyBuddyTheme,
      }}
    >
      <Chat client={chatClient} style={studyBuddyTheme}>
        {children}
      </Chat>
    </OverlayProvider>
  );
};

export default ChatWrapper;

import React, { useState } from "react";
import { Channel, LocalMessage } from "stream-chat";
interface AppContextType {
  channel: Channel | null;
  setChannel: (channel: Channel | null) => void;
  thread: LocalMessage | null;
  setThread: (thread: LocalMessage | null) => void;
}

export const AppContext = React.createContext<AppContextType | undefined>(
  undefined,
);

const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [channel, setChannel] = useState<Channel | null>(null);
  const [thread, setThread] = useState<LocalMessage | null>(null);

  return (
    <AppContext.Provider value={{ channel, setChannel, thread, setThread }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
    const context = React.useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
}
export default AppProvider;
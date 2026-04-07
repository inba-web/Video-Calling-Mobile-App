import React, { useState } from "react";
import type {Channel, LocalMessage} from "stream-chat";
import ChatWrapper from "../components/ChatWrapper";

type AppContextType = {
  channel: null | Channel;
  setChannel: (channel: Channel | null) => void;
  thread: LocalMessage | null;
  setThread: (thread: LocalMessage | null) => void;
}

export const AppContext = React.createContext<AppContextType>({
  channel: null,
  setChannel: (channel) => {},
  thread: null,
  setThread: (thread) => {},
});

export const AppProvider = ({ children }: {children: React.ReactNode}) => {
  const [channel, setChannel] = useState<Channel | null>(null);
  const [thread, setThread] = useState<LocalMessage | null>(null);
ChatWrapper
  return (
    <AppContext.Provider value={{ channel, setChannel, thread, setThread }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
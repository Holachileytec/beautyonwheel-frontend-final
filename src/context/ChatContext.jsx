import { createContext, useContext } from "react";

const ChatContext = createContext(null);

// Provider
export const ChatProvider = ({ children, config }) => {
  return <ChatContext.Provider value={config}>{children}</ChatContext.Provider>;
};

// Custom hook (optional but recommended)
export const useChat = () => {
  return useContext(ChatContext);
};
export default ChatContext;

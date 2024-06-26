import React, { useState, useEffect, createContext, useContext } from "react";
import { retrieveLaunchParams } from "@tma.js/sdk-react";

// Create a context
const TmaContext = createContext();

// Create a provider component
export const TmaProvider = ({ children }) => {
  const [telegramUser, setTelegramUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchTelegramUserData = () => {
      try {
        const launchParams = retrieveLaunchParams();
        const user = launchParams?.initData?.user;
        if (!user) {
          throw new Error("User not found");
        }
        setTelegramUser(user);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTelegramUserData();
  }, []);

  return (
    <TmaContext.Provider value={{ user: telegramUser, isLoading, isError }}>
      {children}
    </TmaContext.Provider>
  );
};

// Custom hook to use the TmaContext
export const useTma = () => useContext(TmaContext);

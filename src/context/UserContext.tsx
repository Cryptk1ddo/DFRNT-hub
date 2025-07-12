import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export type UserProfile = {
  username: string;
  email?: string;
  preferences?: Record<string, any>;
};

const defaultUserProfile: UserProfile = {
  username: "Guest",
  email: undefined,
  preferences: {},
};

interface UserContextType {
  userProfile: UserProfile;
  setUserProfile: (profile: UserProfile) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userProfile, setUserProfile] = useState<UserProfile>(defaultUserProfile);
  return (
    <UserContext.Provider value={{ userProfile, setUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}; 
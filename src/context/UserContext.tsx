import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import axios from "axios";

export type UserProfile = {
  username: string;
  telegramId?: string;
  firstName?: string;
  lastName?: string;
  photoUrl?: string;
  jwt?: string;
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
  setUserProfile: (profile: UserProfile | ((prev: UserProfile) => UserProfile)) => void;
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

export const useTelegramAuth = () => {
  const { setUserProfile } = useUser();
  
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const tg = (window as any).Telegram?.WebApp;
    if (tg && tg.initDataUnsafe && tg.initDataUnsafe.user) {
      const user = tg.initDataUnsafe.user;
      
      setUserProfile({
        username: user.username || user.first_name || "TelegramUser",
        telegramId: user.id?.toString(),
        firstName: user.first_name,
        lastName: user.last_name,
        photoUrl: user.photo_url,
      });
      
      const backendUrl = "https://your-backend-url.onrender.com";
      
      if (backendUrl && backendUrl !== "https://your-backend-url.onrender.com") {
        const payload = {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          username: user.username,
          photo_url: user.photo_url,
          hash: tg.initDataUnsafe.hash,
          auth_date: tg.initDataUnsafe.auth_date,
        };
        
        axios.post(`${backendUrl}/auth/telegram`, payload)
          .then((res: { data: { user: any; token: string } }) => {
            const { token } = res.data;
            setUserProfile((prev: UserProfile) => ({
              ...prev,
              jwt: token,
            }));
          })
          .catch((error) => {
            console.log("Backend verification failed, using local auth:", error.message);
          });
      }
    }
  }, [setUserProfile]);
};

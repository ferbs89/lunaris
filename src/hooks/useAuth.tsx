import React, { createContext, useContext, useEffect, useState } from "react";
import { User as UserType } from "@supabase/supabase-js";

import { queryClient } from "@/config/queryClient";
import { supabase } from "@/config/supabase";

type AuthContextType = {
  user: UserType;
  loadingSession: boolean;
  loadingLogin: boolean;
  handleLogin: (email: string, password: string) => Promise<boolean>;
  handleLogout: () => Promise<void>;
};

const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingSession, setLoadingSession] = useState(true);
  const [loadingLogin, setLoadingLogin] = useState(false);

  useEffect(() => {
    async function loadSession() {
      const {
        data: { user: userData },
      } = await supabase.auth.getUser();

      if (userData) {
        setUser(userData);
      } else {
        setUser(null);
      }

      setLoadingSession(false);
    }

    loadSession();
  }, []);

  async function handleLogin(email: string, password: string) {
    if (!email || !password) {
      return false;
    }

    setLoadingLogin(true);

    const { data: sessionData, error: sessionError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    setLoadingLogin(false);

    if (sessionError) {
      return false;
    } else if (sessionData.user) {
      setUser(sessionData.user);
      return true;
    }
  }

  async function handleLogout() {
    setLoadingSession(true);

    const { error: logoutError } = await supabase.auth.signOut();

    if (!logoutError) {
      setUser(null);
      queryClient.clear();
    }

    setLoadingSession(false);
  }

  return (
    <AuthContext.Provider
      value={{ user, loadingSession, loadingLogin, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

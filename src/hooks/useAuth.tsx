import React, { createContext, useContext, useEffect, useState } from "react";

import { queryClient } from "../config/queryClient";
import { supabase } from "../config/supabase";

const AuthContext = createContext({} as any);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSession();
  }, []);

  async function loadSession() {
    const {
      data: { user: userData },
    } = await supabase.auth.getUser();

    if (userData) {
      setUser(userData);
    } else {
      setUser(null);
    }

    setLoading(false);
  }

  async function handleLogin(email: string, password: string) {
    if (!email || !password) {
      return;
    }

    const { data: sessionData, error: sessionError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (sessionError) {
      return false;
    } else if (sessionData.user) {
      setUser(sessionData.user);
      return true;
    }
  }

  async function handleLogout() {
    const { error: logoutError } = await supabase.auth.signOut();

    if (!logoutError) {
      setUser(null);
      queryClient.clear();
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

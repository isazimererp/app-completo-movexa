import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login as apiLogin, logout as apiLogout, register as apiRegister } from '../services/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem('movexa.token');
      if (saved) setToken(saved);
      setLoading(false);
    })();
  }, []);

  const signIn = async (email, senha) => {
    const data = await apiLogin(email, senha);
    if (data?.token) setToken(data.token);
    return data;
  };

  const signOut = async () => {
    await apiLogout();
    setToken(null);
  };

  const signUp = async (payload) => apiRegister(payload);

  return (
    <AuthContext.Provider value={{ token, loading, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// Anexa JWT quando existir
api.interceptors.request.use(async (config) => {
  try {
    const token = await AsyncStorage.getItem('movexa.token');
    if (token) config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
  } catch {}
  return config;
});

export default api;

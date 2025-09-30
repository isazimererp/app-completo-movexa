import api from './api.js/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function login(email, senha) {
	// Fallback de desenvolvimento: permite login offline para testes de UI
	if (__DEV__ && email === 'dev@movexa.local' && senha === 'dev123') {
		const fake = { token: 'dev-token', user: { email, papel: 'ADMIN' } };
		await AsyncStorage.setItem('movexa.token', fake.token);
		return fake;
	}

	const { data } = await api.post('/auth/login', { email, senha });
	// backend deve retornar token; se retornar outro formato, ajustamos depois
	if (data?.token) {
		await AsyncStorage.setItem('movexa.token', data.token);
	}
	return data;
}

export async function register({ email, senha, papel = 'USER' }) {
	const { data } = await api.post('/auth/register', { email, senha, papel });
	return data;
}

export async function logout() {
	await AsyncStorage.removeItem('movexa.token');
}

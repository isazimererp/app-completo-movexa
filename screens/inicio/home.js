import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();

  return (
    <View style={styles.root}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>MOVEXA</Text>
        <Text style={styles.logoSubtext}>Sistema de Gestão de Robôs</Text>
      </View>

      {/* Botão Login */}
      <TouchableOpacity
        style={styles.botaoLogin}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.textoLogin}>Login</Text>
      </TouchableOpacity>

      {/* Botão Registre-se */}
      <TouchableOpacity
        style={styles.botaoRegistreSe}
        onPress={() => navigation.navigate('RegistreSe')}
      >
        <Text style={styles.textoRegistreSe}>Registre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#D3D3D3',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 80,
  },
  logoText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  logoSubtext: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  botaoLogin: {
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 25,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  textoLogin: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  botaoRegistreSe: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#000',
    width: '80%',
    alignItems: 'center',
  },
  textoRegistreSe: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

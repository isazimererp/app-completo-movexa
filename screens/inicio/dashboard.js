import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Dashboard() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Dashboard - MOVEXA</Text>

      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate('Entregas')}
        >
          <Text style={styles.textoBotao}>📦 Entregas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate('Pedidos')}
        >
          <Text style={styles.textoBotao}>📋 Pedidos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate('Robos')}
        >
          <Text style={styles.textoBotao}>🤖 Robôs</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate('GerenciarUsuarios')}
        >
          <Text style={styles.textoBotao}>👥 Usuários</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate('MeuPerfil')}
        >
          <Text style={styles.textoBotao}>⚙️ Meu Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoSair}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.textoBotaoSair}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#000',
  },
  menuContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 15,
  },
  botao: {
    width: '80%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#000',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  textoBotao: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
  },
  botaoSair: {
    width: '60%',
    height: 45,
    backgroundColor: '#ff4444',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  textoBotaoSair: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

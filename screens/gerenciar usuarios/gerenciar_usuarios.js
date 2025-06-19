import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';

export default function GerenciarUsuarios() {
  const navigation = useNavigation();
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioLogado, setUsuarioLogado] = useState('');

  useEffect(() => {
    carregarUsuarios();
    carregarUsuarioLogado();
  }, []);

  const carregarUsuarios = async () => {
    try {
      const response = await api.get('/usuarios');
      setUsuarios(response.data);
    } catch (error) {
      console.log('Erro ao carregar usuários:', error);
    }
  };

  const carregarUsuarioLogado = async () => {
    try {
      const usuarioString = await AsyncStorage.getItem('usuarioLogado');
      if (usuarioString) {
        const usuario = JSON.parse(usuarioString);
        const nomeCompleto = `${usuario.nome} ${usuario.sobrenome}`;
        setUsuarioLogado(nomeCompleto);
      }
    } catch (error) {
      console.log('Erro ao carregar usuário logado:', error);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.usuarioItem}>
        <Text style={styles.nomeUsuario}>{item.email}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('AlterarUsuario', { usuario: item })}
        >
          <Text style={styles.seta}>➝</Text>
        </TouchableOpacity>
      </View>
    );
  };
  

    return (
      <View style={styles.usuarioItem}>
        <Text style={styles.nomeUsuario}>{nomeCompleto}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('AlterarUsuario', { usuario: item })}
        >
          <Text style={styles.seta}>➝</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.voltar}>←</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>Gerenciar Usuários</Text>
      </View>

      {/* Lista de Usuários */}
      <View style={styles.card}>
        <FlatList
          data={usuarios}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Botões */}
      <TouchableOpacity
        style={styles.botaoAdicionar}
        onPress={() => navigation.navigate('AdicionarUsuario')}
      >
        <Text style={styles.textoAdicionar}>Adicionar Usuário</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoExcluir}
        onPress={() => navigation.navigate('ExcluirUsuario')}
      >
        <Text style={styles.textoExcluir}>Excluir um Usuário</Text>
      </TouchableOpacity>
    </View>
  );


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3D3D3',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  voltar: {
    fontSize: 24,
    marginRight: 10,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#F5F5F5',
    borderRadius: 30,
    padding: 20,
    flex: 1,
  },
  usuarioAtual: {
    backgroundColor: '#57AFA5',
    padding: 12,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  nomeUsuarioAtual: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  tagUsuarioAtual: {
    color: 'white',
    fontWeight: '600',
  },
  usuarioItem: {
    backgroundColor: 'black',
    padding: 12,
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  nomeUsuario: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  seta: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  botaoAdicionar: {
    backgroundColor: '#8B5CF6',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  textoAdicionar: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  botaoExcluir: {
    backgroundColor: '#D11A2A',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  textoExcluir: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

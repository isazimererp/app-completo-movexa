import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ExcluirUsuario() {
  const navigation = useNavigation();
  const [usuarios, setUsuarios] = useState([]);
  const [popupConfirmar, setPopupConfirmar] = useState(false);
  const [popupSucesso, setPopupSucesso] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
  const [usuarioLogado, setUsuarioLogado] = useState('');

  useEffect(() => {
    carregarUsuarioLogado();
    carregarUsuarios();
  }, []);

  const carregarUsuarioLogado = async () => {
    try {
      const usuarioString = await AsyncStorage.getItem('usuarioLogado');
      if (usuarioString) {
        const usuario = JSON.parse(usuarioString);
        setUsuarioLogado(usuario.email); // 🔥 Usar email como referência
      }
    } catch (error) {
      console.log('Erro ao carregar usuário logado:', error);
    }
  };

  const carregarUsuarios = async () => {
    try {
      const response = await api.get('/usuarios');
      setUsuarios(response.data);
    } catch (error) {
      console.log('Erro ao carregar usuários:', error);
    }
  };

  const abrirPopupConfirmar = (usuario) => {
    setUsuarioSelecionado(usuario);
    setPopupConfirmar(true);
  };

  const cancelarExclusao = () => {
    setPopupConfirmar(false);
    setUsuarioSelecionado(null);
  };

  const excluirUsuario = async () => {
    try {
      await api.delete(`/usuarios/${usuarioSelecionado.id}`);

      const novaLista = usuarios.filter(
        (item) => item.id !== usuarioSelecionado.id
      );
      setUsuarios(novaLista);

      setPopupConfirmar(false);
      setPopupSucesso(true);
    } catch (error) {
      console.log('Erro ao excluir usuário:', error);
    }
  };

  const fecharPopupSucesso = () => {
    setPopupSucesso(false);
  };

  const renderItem = ({ item }) => {
    const isUserAtual = item.email === usuarioLogado;

    return (
      <View
        style={[
          styles.usuarioItem,
          isUserAtual && styles.usuarioAtualContainer,
        ]}
      >
        <Text style={[styles.nomeUsuario, isUserAtual && { color: 'white' }]}>
          {item.email}
        </Text>

        {isUserAtual ? (
          <Text style={styles.userAtualLabel}>(User atual)</Text>
        ) : (
          <TouchableOpacity onPress={() => abrirPopupConfirmar(item)}>
            <Text style={styles.lixeira}>🗑️</Text>
          </TouchableOpacity>
        )}
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
        <Text style={styles.titulo}>Excluir um Usuário</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />

      {/* Popup Confirmar */}
      <Modal visible={popupConfirmar} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.popup}>
            <Text style={styles.popupTexto}>
              Tem certeza que deseja excluir este usuário?
            </Text>
            <View style={styles.botoesPopup}>
              <TouchableOpacity
                style={styles.botaoCancelar}
                onPress={cancelarExclusao}
              >
                <Text style={styles.textoCancelar}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.botaoExcluir}
                onPress={excluirUsuario}
              >
                <Text style={styles.textoExcluir}>Excluir Usuário</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Popup Sucesso */}
      <Modal visible={popupSucesso} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.popupSucesso}>
            <Text style={styles.sucessoTexto}>
              Usuário excluído com sucesso!
            </Text>
            <Text style={styles.check}>✔️</Text>
            <TouchableOpacity onPress={fecharPopupSucesso}>
              <Text style={styles.ok}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3D3D3',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  voltar: {
    fontSize: 32,
    color: 'red',
    fontWeight: 'bold',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
  },
  usuarioItem: {
    backgroundColor: 'black',
    borderRadius: 25,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  usuarioAtualContainer: {
    backgroundColor: 'teal',
  },
  nomeUsuario: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  userAtualLabel: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  lixeira: {
    fontSize: 22,
    color: 'red',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 30,
    alignItems: 'center',
    width: 320,
  },
  popupTexto: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  botoesPopup: {
    width: '100%',
  },
  botaoCancelar: {
    backgroundColor: '#A9A9A9',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 10,
  },
  textoCancelar: {
    color: 'white',
    fontWeight: 'bold',
  },
  botaoExcluir: {
    backgroundColor: 'red',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  textoExcluir: {
    color: 'white',
    fontWeight: 'bold',
  },
  popupSucesso: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 30,
    alignItems: 'center',
    width: 320,
  },
  sucessoTexto: {
    color: 'green',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  check: {
    fontSize: 60,
    color: 'green',
    marginBottom: 10,
  },
  ok: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

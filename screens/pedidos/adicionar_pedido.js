import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, Alert } from 'react-native';
import { criarPedido } from '../../services/pedidos';
import { useNavigation } from '@react-navigation/native';

export default function AdicionarPedido() {
  const navigation = useNavigation();

  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [usuarioId, setUsuarioId] = useState(''); // 🔥 Importante, obrigatório no backend

  const [showPopup, setShowPopup] = useState(false);

  const handleAdicionarPedido = async () => {
    if (!origem || !destino || !usuarioId) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    try {
      await criarPedido({
        origem,
        destino,
        usuarioId: parseInt(usuarioId) // 🔥 o backend espera número
      });

      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
        navigation.navigate('Pedidos');
      }, 2000);

    } catch (error) {
      console.error('Erro ao adicionar pedido:', error);
      Alert.alert('Erro', 'Falha ao adicionar pedido');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Adicionar Pedido</Text>

      <TextInput
        style={styles.input}
        placeholder="Origem"
        value={origem}
        onChangeText={setOrigem}
      />
      <TextInput
        style={styles.input}
        placeholder="Destino"
        value={destino}
        onChangeText={setDestino}
      />
      <TextInput
        style={styles.input}
        placeholder="ID do Usuário Criador"
        value={usuarioId}
        onChangeText={setUsuarioId}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.botao} onPress={handleAdicionarPedido}>
        <Text style={styles.textoBotao}>Adicionar Pedido</Text>
      </TouchableOpacity>

      <Modal transparent animationType="fade" visible={showPopup}>
        <View style={styles.popupContainer}>
          <View style={styles.popup}>
            <Text style={styles.popupTexto}>✅ Pedido adicionado com sucesso!</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9D9D9',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  input: {
    width: '90%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#000'
  },
  botao: {
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold'
  },
  popupContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  popup: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center'
  },
  popupTexto: {
    color: 'green',
    fontSize: 18,
    fontWeight: 'bold'
  }
});

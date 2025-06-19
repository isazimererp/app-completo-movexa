import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api'; 

export default function Pedidos() {
  const navigation = useNavigation();
  function abrirPedido(item) {
    navigation.navigate('VisualizarPedido', { pedido: item });
  }
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    carregarPedidos();
  }, []);

  const carregarPedidos = async () => {
    try {
      const response = await api.get('/coletas');
      setPedidos(response.data);
    } catch (error) {
      console.log('Erro ao carregar pedidos', error);
    }
  };


  const renderItem = ({ item }) => (
    <View style={styles.pedidoItem}>
      <Text style={styles.pedidoTitulo}>Pedido {item.id}</Text>
      <Text style={styles.pedidoStatus}>🔴 {item.status}</Text>
      <TouchableOpacity
        style={styles.infoButton}
        onPress={() => navigation.navigate('VisualizarPedido', { pedidoId: item })}
      >
        <Text style={styles.infoText}>i</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <Text style={styles.voltar}>←</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>Pedidos</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <Text style={styles.home}>🏠</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Pedidos */}
      <FlatList
        data={pedidos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />

      {/* Botão Adicionar */}
      <TouchableOpacity
        style={styles.botaoAdicionar}
        onPress={() => navigation.navigate('VisualizarPedido', { pedido: item.id })}

      >
        <Text style={styles.textoAdicionar}>Adicionar Pedido</Text>
      </TouchableOpacity>
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
    fontSize: 24,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  home: {
    fontSize: 24,
  },
  pedidoItem: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pedidoTitulo: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  pedidoStatus: {
    color: 'red',
    fontWeight: '600',
  },
  infoButton: {
    width: 25,
    height: 25,
    borderRadius: 15,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    fontWeight: 'bold',
  },
  botaoAdicionar: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  textoAdicionar: {
    color: 'white',
    fontWeight: 'bold',
  },
});

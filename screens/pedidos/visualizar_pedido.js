import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function VisualizarPedido() {
  const navigation = useNavigation();
  const route = useRoute();

  const { pedido } = route.params;

  // 🔥 Função pra mudar a cor do status
  const getStatusColor = (status) => {
    if (!status) return 'gray';
    const s = status.toLowerCase();
    if (s === 'concluido' || s === 'entregue') return 'green';
    if (s === 'pendente') return 'red';
    return 'gray';
  };

  return (
    <View style={styles.container}>
      {/* 🔺 Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>

        <Text style={styles.titulo}>Visualizar Pedido</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <Ionicons name="home" size={28} color="black" />
        </TouchableOpacity>
      </View>

      {/* 🔻 Card */}
      <View style={styles.card}>
        <View style={styles.topCard}>
          <Text style={styles.pedidoTitulo}>Pedido {pedido.id}</Text>
          <View style={[styles.statusDot, { backgroundColor: getStatusColor(pedido.status) }]} />
        </View>

        <Text style={styles.texto}>
          <Text style={styles.label}>ID do pedido:</Text> {pedido.id}
        </Text>
        <Text style={styles.texto}>
          <Text style={styles.label}>Origem:</Text> {pedido.origem}
        </Text>
        <Text style={styles.texto}>
          <Text style={styles.label}>Destino:</Text> {pedido.destino}
        </Text>
        <Text style={styles.texto}>
          <Text style={styles.label}>Data:</Text> {pedido.data}
        </Text>
        <Text style={styles.texto}>
          <Text style={styles.label}>Status:</Text> {pedido.status}
        </Text>

        {/* 🔥 Observações, se tiver */}
        <Text style={styles.texto}>
          <Text style={styles.label}>Observações:</Text> {pedido.observacoes || 'Nenhuma'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9D9D9',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 20,
  },
  topCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  pedidoTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  texto: {
    fontSize: 16,
    marginVertical: 5,
  },
  label: {
    fontWeight: 'bold',
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});

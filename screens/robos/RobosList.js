import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { listarRobos } from '../../services/robosService';

export default function RobosList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const items = await listarRobos();
        setData(items);
      } catch (e) {
        setError('Erro ao carregar robôs');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <View style={styles.center}><Text>Carregando...</Text></View>;
  if (error) return <View style={styles.center}><Text>{error}</Text></View>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Robôs AGV</Text>
      <FlatList
        data={data}
        keyExtractor={(item, idx) => String(item.id ?? idx)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.item}>{item.identificador} • bateria: {item.nivelBateria}%</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F5F5F5' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  card: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 8, borderWidth: 1, borderColor: '#eee' },
  item: { color: '#333' },
});
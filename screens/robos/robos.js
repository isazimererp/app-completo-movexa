import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { listarRobos } from '../../services/robosService';

export default function Robos() {
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
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { listarRobos } from '../../services/robosService';

export default function Robos() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
    useEffect(() => {
      (async () => {
        try {
          const response = await api.get('/robos-agv');
          setRobos(response.data);
        } catch (error) {
          console.log('Erro ao carregar robôs', error);
        }
      })();
    }, []);
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
});import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';

export default function Robos() {
  const navigation = useNavigation();
  const [robos, setRobos] = useState([]);

  useEffect(() => {
    carregarRobos();
  }, []);

  const carregarRobos = async () => {
    try {
      const response = await api.get('/robos-agv');
      setRobos(response.data);
    } catch (error) {
      console.log('Erro ao carregar robôs', error);
    }
  };

  const renderItem = ({ item }) => {
    const nivelBateria = Math.max(0, Math.min(item.nivelBateria, 100));


    return (
      <TouchableOpacity
        style={styles.roboItem}
        onPress={() => navigation.navigate('VisualizarRobo', { robo: item })}
      >
        {/* Círculo de bateria com imagem */}
        <View style={styles.bateriaContainer}>
          <View
            style={[
              styles.barraCircular,
              { height: `${nivelBateria}%` },
            ]}
          />
          <Image
            source={require('../../assets/robo-icon.png')}
            style={styles.roboIcon}
          />
        </View>

        {/* Informações do robô */}
        <View style={styles.infoContainer}>
          <Text style={styles.nome}>{item.identificador}</Text>
          <Text style={styles.info}>
            Consumo de bateria: {item.consumoBateria} mAh
          </Text>
          <Text style={styles.info}>
            Tempo entre manutenções: {item.tempoEntreManutencoes} meses
          </Text>
          <Text style={styles.bateria}>{nivelBateria}%</Text>
        </View>

        {/* Botão editar */}
        <TouchableOpacity
          onPress={() => navigation.navigate('AtualizarRobo', { robo: item })}
        >
          <Text style={styles.editar}>✏️</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <Text style={styles.voltar}>←</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>Robôs</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <Text style={styles.home}>🏠</Text>
        </TouchableOpacity>
      </View>

      {/* Lista */}
      <FlatList
        data={robos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />

      {/* Botão Adicionar */}
      <TouchableOpacity
        style={styles.botaoAdicionar}
        onPress={() => navigation.navigate('AdicionarRobo')}
      >
        <Text style={styles.textoAdicionar}>Adicionar Robô</Text>
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
    roboItem: {
      backgroundColor: '#fff',
      borderRadius: 20,
      padding: 15,
      marginBottom: 15,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    bateriaContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
      borderRadius: 25,
      borderWidth: 3,
      borderColor: '#4CAF50',
      overflow: 'hidden',
      marginRight: 10,
    },
    barraCircular: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      backgroundColor: '#4CAF50',
    },
    roboIcon: {
      width: 25,
      height: 25,
      tintColor: 'black',
    },
    infoContainer: {
      flex: 1,
    },
    nome: {
      fontWeight: 'bold',
      fontSize: 16,
    },
    info: {
      color: '#333',
      fontSize: 13,
    },
    bateria: {
      fontSize: 14,
      fontWeight: 'bold',
      marginTop: 3,
    },
    editar: {
      fontSize: 18,
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
  
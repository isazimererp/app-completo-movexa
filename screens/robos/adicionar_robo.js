import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { criarRobo } from '../../services/robosService';

export default function AdicionarRobo() {
  const navigation = useNavigation();

  const [id, setId] = useState('');
  const [consumo, setConsumo] = useState('');
  const [nivel, setNivel] = useState('');
  const [manutencao, setManutencao] = useState('');

  const [popupVisivel, setPopupVisivel] = useState(false);

  const adicionarRobo = async () => {
    if (!id || !consumo || !nivel || !manutencao) {
      alert('Preencha todos os campos!');
      return;
    }
  
    if (parseFloat(nivel) > 100) {
      alert('Nível de bateria não pode ser maior que 100%');
      return;
    }
  
    try {
      await criarRobo({
        identificador: id,
        consumoBateria: parseFloat(consumo),
        nivelBateria: parseFloat(nivel),
        tempoEntreManutencoes: parseInt(manutencao),
      });
      setPopupVisivel(true);
    } catch (error) {
      console.log('Erro ao adicionar robô:', error);
      alert('Erro ao adicionar robô. Tente novamente.');
    }
  };
  

  const fecharPopup = () => {
    setPopupVisivel(false);
    navigation.navigate('Robos');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.voltar}>←</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>Adicionar Robô</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <Text style={styles.home}>🏠</Text>
        </TouchableOpacity>
      </View>

      {/* Card */}
      <View style={styles.card}>
        <View style={styles.circulo}>
          <Text style={{ fontSize: 40 }}>🤖</Text>
        </View>

        <Text style={styles.label}>ID do Robô</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: AGV 006"
          value={id}
          onChangeText={setId}
        />

        <Text style={styles.label}>Consumo de Bateria (mAh)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 25000"
          value={consumo}
          onChangeText={setConsumo}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Nível de Bateria (%)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 80"
          value={nivel}
          onChangeText={setNivel}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Tempo entre manutenções (meses)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 5"
          value={manutencao}
          onChangeText={setManutencao}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.botao} onPress={adicionarRobo}>
          <Text style={styles.textoBotao}>Adicionar Robô</Text>
        </TouchableOpacity>
      </View>

      {/* Popup */}
      <Modal visible={popupVisivel} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.popup}>
            <Text style={styles.sucessoTexto}>
              Robô adicionado com sucesso!
            </Text>
            <Text style={styles.check}>✔️</Text>
            <TouchableOpacity onPress={fecharPopup}>
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
    fontSize: 24,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  home: {
    fontSize: 24,
  },
  card: {
    backgroundColor: '#F5F5F5',
    borderRadius: 30,
    padding: 20,
    alignItems: 'center',
  },
  circulo: {
    borderWidth: 4,
    borderColor: 'green',
    borderRadius: 100,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    alignSelf: 'flex-start',
    marginTop: 10,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'gray',
    padding: 10,
    backgroundColor: 'white',
  },
  botao: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  textoBotao: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 30,
    alignItems: 'center',
    width: 300,
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

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../services/api';

export default function AtualizarRobo() {
  const navigation = useNavigation();
  const route = useRoute();
  const { robo } = route.params;

  const [id, setId] = useState(robo.identificador);
  const [consumo, setConsumo] = useState(robo.consumoBateria.toString());
  const [nivel, setNivel] = useState(robo.nivelBateria.toString());
  const [manutencao, setManutencao] = useState(
    robo.tempoEntreManutencoes.toString()
  );

  const [popupVisivel, setPopupVisivel] = useState(false);

  const atualizarRobo = async () => {
    if (!id || !consumo || !nivel || !manutencao) {
      alert('Preencha todos os campos corretamente!');
      return;
    }
  
    if (nivel > 100) {
      alert('Nível de bateria não pode ser maior que 100%');
      return;
    }

    try {
      await api.put(`/robos-agv/${robo.id}`, {
        identificador: id,
        consumoBateria: parseFloat(consumo),
        nivelBateria: parseFloat(nivel),
        tempoEntreManutencoes: parseInt(manutencao),
      });
      setPopupVisivel(true);
    } catch (error) {
      console.log('Erro ao atualizar robô:', error);
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
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <Text style={styles.voltar}>←</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>Atualizar Robô</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <Text style={styles.home}>🏠</Text>
        </TouchableOpacity>
      </View>

      {/* Card */}
      <View style={styles.card}>
        {/* Círculo com robo */}
        <View style={styles.circulo}>
          <Text style={{ fontSize: 40 }}>🤖</Text>
        </View>

        {/* Inputs */}
        <Text style={styles.label}>Id do Robô</Text>
        <TextInput
          style={styles.input}
          value={id}
          onChangeText={setId}
        />

        <Text style={styles.label}>Consumo de Bateria</Text>
        <TextInput
          style={styles.input}
          value={consumo}
          onChangeText={setConsumo}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Nível de Bateria</Text>
        <TextInput
          style={styles.input}
          value={nivel}
          onChangeText={setNivel}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Tempo entre manutenções</Text>
        <TextInput
          style={styles.input}
          value={manutencao}
          onChangeText={setManutencao}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.botao} onPress={atualizarRobo}>
          <Text style={styles.textoBotao}>Atualizar Robô</Text>
        </TouchableOpacity>
      </View>

      {/* POPUP ✅ */}
      <Modal visible={popupVisivel} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.popup}>
            <Text style={styles.sucessoTexto}>Robô atualizado com sucesso!</Text>
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

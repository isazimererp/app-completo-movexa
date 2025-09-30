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
import { criarUsuario } from '../../services/usuariosService';

export default function AdicionarUsuario() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [papel, setPapel] = useState('USER');

  const [popupVisivel, setPopupVisivel] = useState(false);

  const adicionarUsuario = async () => {
    if (!email || !senha || !papel) {
      alert('Preencha todos os campos!');
      return;
    }

    try {
      await criarUsuario({ email, senha, papel: papel.toUpperCase() });

      setPopupVisivel(true);
    } catch (error) {
      console.log('Erro ao adicionar usuário:', error);
      alert('Erro ao adicionar usuário');
    }
  };

  const fecharPopup = () => {
    setPopupVisivel(false);
    navigation.navigate('GerenciarUsuarios');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.voltar}>←</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>Adicionar Usuário</Text>
      </View>

      {/* Card */}
      <View style={styles.card}>
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Digite o e-mail"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
          placeholder="Digite a senha"
          secureTextEntry
        />

        <Text style={styles.label}>Papel (USER ou ADMIN)</Text>
        <TextInput
          style={styles.input}
          value={papel}
          onChangeText={setPapel}
          placeholder="USER ou ADMIN"
        />

        <TouchableOpacity style={styles.botao} onPress={adicionarUsuario}>
          <Text style={styles.textoBotao}>Adicionar Usuário</Text>
        </TouchableOpacity>
      </View>

      {/* POPUP */}
      <Modal visible={popupVisivel} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.popup}>
            <Text style={styles.sucessoTexto}>
              Usuário adicionado com sucesso!
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
    marginBottom: 20,
  },
  voltar: {
    fontSize: 24,
    marginRight: 10,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#F5F5F5',
    borderRadius: 30,
    padding: 20,
    width: '100%',
  },
  label: {
    alignSelf: 'flex-start',
    marginTop: 10,
    marginBottom: 4,
    fontWeight: 'bold',
    fontSize: 15,
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
    backgroundColor: '#7D5DF6',
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
    textAlign: 'center',
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

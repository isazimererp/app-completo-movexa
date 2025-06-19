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

export default function EsqueciSenha() {
  const navigation = useNavigation();
  const route = useRoute();
  const { origem } = route.params;

  const [email, setEmail] = useState('');
  const [popupVisivel, setPopupVisivel] = useState(false);

  const enviarEmail = async () => {
    try {
      await api.post('/usuarios/esqueci-senha', { email });
      setPopupVisivel(true);
    } catch (error) {
      console.log('Erro ao enviar e-mail de recuperação:', error);
    }
  };

  const fecharPopup = () => {
    setPopupVisivel(false);
    navigation.navigate('Login');
  };

  const voltar = () => {
    if (origem === 'perfil') {
      navigation.navigate('MeuPerfil');
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      {/*Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={voltar}>
          <Text style={styles.voltar}>←</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>Digite o seu e-mail</Text>
      </View>

      {/*Label + Input */}
      <Text style={styles.label}>E-mail</Text>
      <TextInput
        style={styles.input}
        placeholder=""
        placeholderTextColor="#a9a9a9"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/*Botão */}
      <TouchableOpacity style={styles.botao} onPress={enviarEmail}>
        <Text style={styles.textoBotao}>Enviar e-mail</Text>
      </TouchableOpacity>

      {/*Popup de Sucesso */}
      <Modal visible={popupVisivel} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.popup}>
            <Text style={styles.popupTexto}>
              Um e-mail de redefinição de senha foi enviado para você!
            </Text>
            <Text style={styles.check}>✔️</Text>
            <TouchableOpacity style={styles.botaoPopup} onPress={fecharPopup}>
              <Text style={styles.textoPopup}>Voltar à tela de login</Text>
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
    marginBottom: 50,
  },
  voltar: {
    fontSize: 30,
    marginRight: 10,
    fontWeight: 'bold',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 30,
  },
  botao: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
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
    width: 320,
  },
  popupTexto: {
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
  botaoPopup: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
    width: '100%',
  },
  textoPopup: {
    color: 'white',
    fontWeight: 'bold',
  },
});

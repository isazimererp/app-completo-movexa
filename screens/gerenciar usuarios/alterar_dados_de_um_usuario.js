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
import { atualizarUsuario } from '../../services/usuariosService';

export default function AlterarUsuario() {
  const navigation = useNavigation();
  const route = useRoute();
  const { usuario } = route.params || { usuario: {} };

  const [email, setEmail] = useState(usuario.email);
  const [senha, setSenha] = useState('');
  const [papel, setPapel] = useState(usuario.papel);

  const [popupConfirmar, setPopupConfirmar] = useState(false);
  const [popupSucesso, setPopupSucesso] = useState(false);

  const atualizar = async () => {
    try {
      const payload = { email, papel: papel.toUpperCase() };
      if (senha && senha.trim()) payload.senha = senha;
      await atualizarUsuario(usuario.id, payload);
      setPopupConfirmar(false);
      setPopupSucesso(true);
    } catch (error) {
      console.log('Erro ao atualizar usuário:', error);
    }
  };

  const fecharPopupSucesso = () => {
    setPopupSucesso(false);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.voltar}>←</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>{email}</Text>
      </View>

      {/* Card */}
      <View style={styles.card}>
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Digite o e-mail"
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

        <TouchableOpacity
          style={styles.botao}
          onPress={() => setPopupConfirmar(true)}
        >
          <Text style={styles.textoBotao}>Atualizar e salvar dados</Text>
        </TouchableOpacity>
      </View>

      {/* Pop-up de confirmação */}
      <Modal visible={popupConfirmar} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.popup}>
            <Text style={styles.popupTexto}>
              Tem certeza que deseja atualizar os dados deste usuário?
            </Text>
            <View style={styles.botoesLinha}>
              <TouchableOpacity
                style={styles.botaoCancelar}
                onPress={() => setPopupConfirmar(false)}
              >
                <Text style={styles.textoCancelar}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.botaoConfirmar}
                onPress={atualizar}
              >
                <Text style={styles.textoConfirmar}>Confirmar e salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Pop-up de sucesso */}
      <Modal visible={popupSucesso} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.popupSucesso}>
            <Text style={styles.sucessoTexto}>Dados alterados com sucesso!</Text>
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
    marginBottom: 20,
  },
  voltar: {
    fontSize: 24,
    marginRight: 10,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  card: {
    backgroundColor: '#F5F5F5',
    borderRadius: 30,
    padding: 20,
  },
  label: {
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
    padding: 25,
    borderRadius: 30,
    alignItems: 'center',
    width: 300,
  },
  popupTexto: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  botoesLinha: {
    flexDirection: 'row',
    gap: 10,
  },
  botaoCancelar: {
    backgroundColor: '#A9A9A9',
    padding: 10,
    borderRadius: 20,
    flex: 1,
    alignItems: 'center',
  },
  botaoConfirmar: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 20,
    flex: 1,
    alignItems: 'center',
  },
  textoCancelar: {
    color: 'white',
    fontWeight: 'bold',
  },
  textoConfirmar: {
    color: 'white',
    fontWeight: 'bold',
  },

  popupSucesso: {
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

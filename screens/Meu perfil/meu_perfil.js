import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';

export default function MeuPerfil() {
  const navigation = useNavigation();

  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [cargo, setCargo] = useState('');

  const [popupVisivel, setPopupVisivel] = useState(false);

  useEffect(() => {
    carregarPerfil();
  }, []);
  
  const carregarPerfil = async () => {
    try {
      const response = await api.get('/usuarios/1'); // ou o ID dinâmico depois
      const dados = response.data;
      setEmail(dados.email);
      setCargo(dados.papel); // papel é o que você chama de cargo na UI
    } catch (error) {
      console.log('Erro ao carregar perfil:', error);
    }
  };
  
  const atualizarPerfil = async () => {
    try {
      await api.put('/usuarios/1', {
        email,
        senha: dados.senha, // backend espera a senha
        papel: cargo,
      });
      setPopupVisivel(true);
    } catch (error) {
      console.log('Erro ao atualizar perfil:', error);
    }
  };
  
  

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.voltar}>←</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>Meu Perfil</Text>
      </View>

      {/* Card */}
      <View style={styles.card}>
        {/* Campos */}
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>Sobrenome</Text>
        <TextInput
          style={styles.input}
          value={sobrenome}
          onChangeText={setSobrenome}
        />

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={[styles.input, { color: 'gray' }]}
          value={email}
          editable={false} // E-mail desabilitado
        />

        <Text style={styles.label}>Cargo</Text>
        <TextInput
          style={styles.input}
          value={cargo}
          onChangeText={setCargo}
        />

        {/* Botão Esqueci a Senha */}
        <TouchableOpacity
          onPress={() => navigation.navigate('EsqueciSenha', { origem: 'perfil' })}
        >
          <Text style={styles.botaoEsqueciSenha}>Esqueci a senha</Text>
        </TouchableOpacity>


        {/* Botão Atualizar */}
        <TouchableOpacity style={styles.botao} onPress={atualizarPerfil}>
          <Text style={styles.textoBotao}>Atualizar e salvar dados</Text>
        </TouchableOpacity>
      </View>

      {/* POPUP */}
      <Modal visible={popupVisivel} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.popup}>
            <Text style={styles.sucessoTexto}>Dados alterados com sucesso!</Text>
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
      marginRight: 20,
    },
    titulo: {
      fontSize: 26,
      fontWeight: 'bold',
    },
    card: {
      backgroundColor: '#F5F5F5',
      borderRadius: 30,
      padding: 20,
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
    botaoSenha: {
      backgroundColor: 'black',
      padding: 8,
      borderRadius: 30,
      alignItems: 'center',
      marginTop: 20,
      width: '60%',
      alignSelf: 'center',
    },
    textoSenha: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 12,
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
  
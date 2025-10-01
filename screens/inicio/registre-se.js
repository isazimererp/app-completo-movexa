import React, { useState } from 'react';
import { useStyles, createStyleSheet } from 'styles';
import { View, TextInput, Text, Alert, TouchableOpacity } from 'react-native';
import { Vector } from 'components/page-1/base/vector';
import { LogoMovexa } from 'components/page-1/base/logo-movexa';
import api from '../../services/api.js/api';

export function RegistreSe(props) {
  const { styles } = useStyles(stylesheet);

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleRegistrar = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    try {
      const response = await api.post('/auth/register', {
        email,
        senha,
        papel: 'USER', 
      });

      if (response.status === 200 || response.status === 201) {
        Alert.alert('Sucesso', 'Conta criada com sucesso!');
        props.navigation.navigate('Login');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Falha ao criar conta');
    }
  };

  return (
    <View style={styles.root}>

      <TouchableOpacity onPress={() => props.navigation.goBack()}>
        <Vector />
      </TouchableOpacity>

      <LogoMovexa />

      <Text style={styles.label}>E-mail</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Digite seu e-mail"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
        placeholder="Digite sua senha"
        secureTextEntry
      />

      <TouchableOpacity style={styles.botao} onPress={handleRegistrar}>
        <Text style={styles.textoBotao}>Criar conta</Text>
      </TouchableOpacity>

    </View>
  );
}

const stylesheet = createStyleSheet(() => ({
  root: {
    width: 393,
    height: 852,
    backgroundColor: 'rgba(234, 234, 234, 0.658)',
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 45,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  botao: {
    width: 232,
    height: 45,
    backgroundColor: '#000',
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 30,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}));

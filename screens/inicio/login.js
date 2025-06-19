import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { useStyles, createStyleSheet } from 'styles';

export function Login() {
  const { styles } = useStyles(stylesheet);
  const navigation = useNavigation();
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Por favor, preencha email e senha.');
      return;
    }

    const result = await signIn(email, senha);
    if (result.success) {
      Alert.alert('Sucesso', 'Login realizado com sucesso!');
      navigation.navigate('Dashboard');
    } else {
      Alert.alert('Erro', result.message);
    }
  };

  return (
    <View style={styles.root}>
      <TextInput
        placeholder="Email"
        placeholderTextColor="#aaa"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Senha"
        placeholderTextColor="#aaa"
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity style={styles.botao} onPress={handleLogin}>
        <Text style={styles.textoBotao}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoSecundario}
        onPress={() => navigation.navigate('EsqueciSenha')}
      >
        <Text style={styles.textoBotaoSecundario}>Esqueci a senha</Text>
      </TouchableOpacity>
    </View>
  );
}

const stylesheet = createStyleSheet(() => ({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(234, 234, 234, 0.658)',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '90%',
    height: 50,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    color: '#000',
  },
  botao: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 10,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botaoSecundario: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#000',
    marginTop: 10,
  },
  textoBotaoSecundario: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
}));

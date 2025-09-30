import React, { useState } from 'react';
import { View, TextInput, Text, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api.js/api';

export default function RegistreSe() {
  const navigation = useNavigation();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleRegistrar = async () => {
    if (!nome || !email || !senha || !confirmarSenha) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem!');
      return;
    }

    try {
      const response = await api.post('/usuarios', {
        nome,
        email,
        senha,
        papel: 'USER',
      });

      if (response.status === 200 || response.status === 201) {
        Alert.alert('Sucesso', 'Conta criada com sucesso!');
        navigation.navigate('Login');
      }
    } catch (error) {
      console.log('Erro ao registrar:', error);
      Alert.alert('Erro', 'Erro ao criar conta. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.voltar}>←</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>Criar Conta</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        placeholderTextColor="#aaa"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#aaa"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Confirmar senha"
        placeholderTextColor="#aaa"
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        secureTextEntry
      />

      <TouchableOpacity style={styles.botao} onPress={handleRegistrar}>
        <Text style={styles.textoBotao}>Criar Conta</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoSecundario}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.textoBotaoSecundario}>Já tenho uma conta</Text>
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
    marginBottom: 30,
    marginTop: 40,
  },
  voltar: {
    fontSize: 30,
    marginRight: 10,
    fontWeight: 'bold',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 15,
    fontSize: 16,
  },
  botao: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  botaoSecundario: {
    backgroundColor: 'transparent',
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBotaoSecundario: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});import React, { useState } from 'react';
import { View, TextInput, Text, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api.js/api';

export default function RegistreSe() {
  const navigation = useNavigation();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleRegistrar = async () => {
    if (!nome || !email || !senha || !confirmarSenha) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem!');
      return;
    }

    try {
      const response = await api.post('/usuarios', {
        nome,
        email,
        senha,
        papel: 'USER', 
      });

      if (response.status === 200 || response.status === 201) {
        Alert.alert('Sucesso', 'Conta criada com sucesso!');
        navigation.navigate('Login');
      }
    } catch (error) {
      console.log('Erro ao registrar:', error);
      Alert.alert('Erro', 'Erro ao criar conta. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Criar Conta</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        placeholderTextColor="#aaa"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#aaa"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Confirmar senha"
        placeholderTextColor="#aaa"
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        secureTextEntry
      />

      <TouchableOpacity style={styles.botao} onPress={handleRegistrar}>
        <Text style={styles.textoBotao}>Criar Conta</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoSecundario}
        onPress={() => navigation.navigate('Login')}
      >
        import React, { useState } from 'react';
        import { View, TextInput, Text, Alert, TouchableOpacity, StyleSheet } from 'react-native';
        import { useNavigation } from '@react-navigation/native';
        import api from '../../services/api.js/api';

        export default function RegistreSe() {
          const navigation = useNavigation();

          const [nome, setNome] = useState('');
          const [email, setEmail] = useState('');
          const [senha, setSenha] = useState('');
          const [confirmarSenha, setConfirmarSenha] = useState('');

          const handleRegistrar = async () => {
            if (!nome || !email || !senha || !confirmarSenha) {
              Alert.alert('Erro', 'Preencha todos os campos!');
              return;
            }

            if (senha !== confirmarSenha) {
              Alert.alert('Erro', 'As senhas não coincidem!');
              return;
            }

            try {
              const response = await api.post('/usuarios', {
                nome,
                email,
                senha,
                papel: 'USER',
              });

              if (response.status === 200 || response.status === 201) {
                Alert.alert('Sucesso', 'Conta criada com sucesso!');
                navigation.navigate('Login');
              }
            } catch (error) {
              console.log('Erro ao registrar:', error);
              Alert.alert('Erro', 'Erro ao criar conta. Tente novamente.');
            }
          };

          return (
            <View style={styles.container}>
              <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Text style={styles.voltar}>←</Text>
                </TouchableOpacity>
                <Text style={styles.titulo}>Criar Conta</Text>
              </View>

              <TextInput
                style={styles.input}
                placeholder="Nome completo"
                placeholderTextColor="#aaa"
                value={nome}
                onChangeText={setNome}
              />

              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#aaa"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor="#aaa"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
              />

              <TextInput
                style={styles.input}
                placeholder="Confirmar senha"
                placeholderTextColor="#aaa"
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
                secureTextEntry
              />

              <TouchableOpacity style={styles.botao} onPress={handleRegistrar}>
                <Text style={styles.textoBotao}>Criar Conta</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.botaoSecundario}
                onPress={() => navigation.navigate('Login')}
              >
                <Text style={styles.textoBotaoSecundario}>Já tenho uma conta</Text>
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
            marginBottom: 30,
            marginTop: 40,
          },
          voltar: {
            fontSize: 30,
            marginRight: 10,
            fontWeight: 'bold',
          },
          titulo: {
            fontSize: 24,
            fontWeight: 'bold',
            color: '#000',
          },
          input: {
            backgroundColor: '#fff',
            borderRadius: 25,
            paddingHorizontal: 20,
            paddingVertical: 15,
            borderWidth: 1,
            borderColor: 'gray',
            marginBottom: 15,
            fontSize: 16,
          },
          botao: {
            backgroundColor: '#000',
            padding: 15,
            borderRadius: 30,
            alignItems: 'center',
            marginTop: 20,
          },
          textoBotao: {
            color: '#fff',
            fontSize: 18,
            fontWeight: 'bold',
          },
          botaoSecundario: {
            backgroundColor: 'transparent',
            padding: 15,
            alignItems: 'center',
            marginTop: 10,
          },
          textoBotaoSecundario: {
            color: '#000',
            fontSize: 16,
            fontWeight: 'bold',
            textDecorationLine: 'underline',
          },
        });

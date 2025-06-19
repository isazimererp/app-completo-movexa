import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Configuracoes() {
  const navigation = useNavigation();
  const [popupVisivel, setPopupVisivel] = useState(false);

  const confirmarLogout = () => {
    setPopupVisivel(true);
  };

  const cancelarLogout = () => {
    setPopupVisivel(false);
  };

  const fazerLogout = () => {
    setPopupVisivel(false);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Inicio' }],
    });
  };
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.titulo}>Configurações</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <Text style={styles.home}>🏠</Text>
        </TouchableOpacity>
      </View>

      {/* Botões */}
      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('MeuPerfil')}
      >
        <Text style={styles.textoBotao}>Meu perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('GerenciarUsuarios')}
      >
        <Text style={styles.textoBotao}>Gerenciar usuários</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoLogout}
        onPress={confirmarLogout}
      >
        <Text style={styles.textoLogout}>Logoff</Text>
      </TouchableOpacity>

      {/* POP-UP de Logout */}
      <Modal visible={popupVisivel} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.popup}>
            <Text style={styles.popupTexto}>
              Tem certeza que deseja sair da sua conta?
            </Text>

            <TouchableOpacity
              style={styles.cancelarButton}
              onPress={cancelarLogout}
            >
              <Text style={styles.cancelarText}>
                Não, quero continuar logado(a)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.confirmarButton}
              onPress={fazerLogout}
            >
              <Text style={styles.confirmarText}>
                Sim, quero sair da minha conta
              </Text>
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
      backgroundColor: '#BEBEBE',
      padding: 20,
      justifyContent: 'center',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 40,
    },
    titulo: {
      fontSize: 30,
      fontWeight: 'bold',
    },
    home: {
      fontSize: 26,
    },
    botao: {
      backgroundColor: 'white',
      borderRadius: 30,
      paddingVertical: 15,
      paddingHorizontal: 20,
      marginBottom: 20,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'black',
    },
    textoBotao: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'black',
    },
    botaoLogout: {
      backgroundColor: '#FF4C4C',
      borderRadius: 30,
      paddingVertical: 15,
      paddingHorizontal: 20,
      marginTop: 20,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'black',
    },
    textoLogout: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
    },
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    popup: {
      backgroundColor: 'white',
      borderRadius: 30,
      padding: 25,
      width: 320,
      alignItems: 'center',
    },
    popupTexto: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    cancelarButton: {
      backgroundColor: '#D9D9D9',
      borderRadius: 20,
      paddingVertical: 10,
      paddingHorizontal: 15,
      marginBottom: 10,
      width: '100%',
      alignItems: 'center',
    },
    cancelarText: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: 14,
    },
    confirmarButton: {
      backgroundColor: '#FF4C4C',
      borderRadius: 20,
      paddingVertical: 10,
      paddingHorizontal: 15,
      width: '100%',
      alignItems: 'center',
    },
    confirmarText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 14,
    },
  });
  
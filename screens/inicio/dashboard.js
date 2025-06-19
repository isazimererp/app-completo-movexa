import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useStyles, createStyleSheet } from 'styles';
import { Dashboard as DashboardTitle } from 'components/page-1/base/dashboard';

export default function DashboardScreen(props) {
  const { styles } = useStyles(stylesheet);
  const navigation = useNavigation();

  return (
    <View style={styles.root} testID={props.testID ?? '101:45'}>
      <DashboardTitle testID="101:40" />

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('Entregas')}
      >
        <Text style={styles.textoBotao}>Entregas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('Pedidos')}
      >
        <Text style={styles.textoBotao}>Pedidos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('Robos')}
      >
        <Text style={styles.textoBotao}>Robôs</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('Configuracoes')}
      >
        <Text style={styles.textoBotao}>Configurações</Text>
      </TouchableOpacity>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  root: {
    width: 393,
    height: 852,
    backgroundColor: 'rgba(234, 234, 234, 0.66)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  botao: {
    width: 250,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },
  textoBotao: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
}));

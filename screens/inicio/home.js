import React from 'react';
import { useStyles, createStyleSheet } from 'styles';
import { View, Text, TouchableOpacity } from 'react-native';
import { LogoMovexa } from 'components/page-1/base/logo-movexa';

export function Inicio(props) {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.root} testID={props.testID ?? '92:6'}>

      {/* Logo */}
      <LogoMovexa testID="92:5" />

      {/* Botão Login */}
      <TouchableOpacity
        style={styles.botaoLogin}
        onPress={() => props.navigation.navigate('Login')}
      >
        <View style={styles.rectangle3} />
        <Text style={styles.login}>Login</Text>
      </TouchableOpacity>

      {/* Botão Registre-se */}
      <TouchableOpacity
        style={styles.botaoRegistreSe}
        onPress={() => props.navigation.navigate('Register')}
      >
        <View style={styles.rectangle4} />
        <Text style={styles.registreSe}>Registre-se</Text>
      </TouchableOpacity>

    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  root: {
    width: 393,
    height: 852,
    backgroundColor: 'rgba(234, 234, 234, 0.658823549747467)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rectangle3: {
    width: 232,
    height: 45,
    borderRadius: 45,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  login: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
  },
  botaoLogin: {
    marginTop: 10,
    alignItems: 'center',
  },
  rectangle4: {
    width: 232,
    height: 45,
    borderRadius: 45,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registreSe: {
    color: '#000',
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
  },
  botaoRegistreSe: {
    marginTop: 10,
    alignItems: 'center',
  },
}));

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './contexts/AuthContext';

// Importar as telas principais
import Home from './screens/inicio/home';
import Login from './screens/inicio/login';
import RegistreSe from './screens/inicio/RegistreSeClean';
import Dashboard from './screens/inicio/dashboard';
import Usuarios from './screens/usuarios/Usuarios';
import Robos from './screens/robos/RobosList';
import Pedidos from './screens/pedidos/pedidos';
import EsqueciSenha from './screens/esqueci_a_senha';
// Usuários - CRUD
import GerenciarUsuarios from './screens/gerenciar usuarios/gerenciar_usuarios';
import AdicionarUsuario from './screens/gerenciar usuarios/adicionar_usuario';
import AlterarUsuario from './screens/gerenciar usuarios/alterar_dados_de_um_usuario';
import ExcluirUsuario from './screens/gerenciar usuarios/excluir_um_usuario';
// Robôs - CRUD
import AdicionarRobo from './screens/robos/adicionar_robo';
import AtualizarRobo from './screens/robos/atualizar_robo';
// Pedidos - CRUD
import AdicionarPedido from './screens/pedidos/adicionar_pedido';
import VisualizarPedido from './screens/pedidos/visualizar_pedido';

// (telas adicionais removidas temporariamente para estabilizar o bundle)

const Stack = createNativeStackNavigator();

export default function App() {
  console.log('App iniciado - Movexa');

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        {/* Telas de Início */}
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="RegistreSe" component={RegistreSe} />
  <Stack.Screen name="Dashboard" component={Dashboard} />
  {/* Dados */}
  <Stack.Screen name="Usuarios" component={Usuarios} />
  <Stack.Screen name="Robos" component={Robos} />
  <Stack.Screen name="Pedidos" component={Pedidos} />
        <Stack.Screen name="EsqueciSenha" component={EsqueciSenha} />

    {/* Usuários - CRUD */}
    <Stack.Screen name="GerenciarUsuarios" component={GerenciarUsuarios} />
    <Stack.Screen name="AdicionarUsuario" component={AdicionarUsuario} />
    <Stack.Screen name="AlterarUsuario" component={AlterarUsuario} />
    <Stack.Screen name="ExcluirUsuario" component={ExcluirUsuario} />

  {/* Robôs - CRUD */}
  <Stack.Screen name="AdicionarRobo" component={AdicionarRobo} />
  <Stack.Screen name="AtualizarRobo" component={AtualizarRobo} />

  {/* Pedidos - CRUD */}
  <Stack.Screen name="AdicionarPedido" component={AdicionarPedido} />
  <Stack.Screen name="VisualizarPedido" component={VisualizarPedido} />

        {/* Telas adicionais removidas temporariamente */}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
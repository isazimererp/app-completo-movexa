import api from './api.js/api';

export async function listarUsuarios() {
  const resposta = await api.get('/usuarios');
  return resposta.data;
}

export async function criarUsuario(dados) {
  const resposta = await api.post('/usuarios', dados);
  return resposta.data;
}

export async function atualizarUsuario(id, dados) {
  const resposta = await api.put(`/usuarios/${id}`, dados);
  return resposta.data;
}

export async function deletarUsuario(id) {
  await api.delete(`/usuarios/${id}`);
}

import api from './api.js/api';

export async function listarRobos() {
  const resposta = await api.get('/robos-agv');
  return resposta.data;
}

export async function criarRobo(dados) {
  const resposta = await api.post('/robos-agv', dados);
  return resposta.data;
}

export async function atualizarRobo(id, dados) {
  const resposta = await api.put(`/robos-agv/${id}`, dados);
  return resposta.data;
}

export async function deletarRobo(id) {
  await api.delete(`/robos-agv/${id}`);
}

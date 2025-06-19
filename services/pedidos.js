import api from './api';

export async function listarPedidos() {
  const resposta = await api.get('/coletas');
  return resposta.data;
}

export async function criarPedido(dados) {
  const resposta = await api.post('/coletas', dados);
  return resposta.data;
}

export async function concluirPedido(id, dados) {
  const resposta = await api.post(`/coletas/${id}/concluir`, dados);
  return resposta.data;
}

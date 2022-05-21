import api from "../api";

export const buscarRepositorios = async (postId) => {
  try {
    const { data, status } = await api.get(`/repos?postId=${postId}`);

    if (status !== 200) throw new Error(`Erro de codigo [${status}]`);

    return data || [];
  } catch ({ message }) {
    console.log('[BUSCAR REPOSITORIO]:', message);

    return [];
  }
};

export const atualizarRepositorios = async (id, body) => {
  try {
    const { status } = await api.put(`/repos/${id}`, body);

    if (status !== 200) throw new Error(`Erro de codigo [${status}]`);

    return { sucesso: true };
  } catch ({ message }) {
    console.log('[ATUALIZAR REPOSITORIO]:', message);

    return { sucesso: false };
  }
};

export const adicionarRepositorios = async (body) => {
  try {
    const { status } = await api.post(`/repos`, body);

    if (status !== 201) throw new Error(`Erro de codigo [${status}]`);

    return { sucesso: true };
  } catch ({ message }) {
    console.log('[ADICIONAR REPOSITORIO]:', message);

    return { sucesso: false };
  }
};

import api from "../api";

export const buscarUsuario = async (usuario) => {
  try {
    const { data, status } = await api.get(`/users?login=${usuario}`);

    if (status !== 200) throw new Error(`Erro de codigo [${status}]`);

    return data?.[0] || null;
  } catch ({ message }) {
    console.log('[BUSCAR USUARIO]:', message);

    return null;
  }
};

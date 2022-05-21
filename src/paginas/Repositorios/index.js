import React, { useState } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";

import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";

import estilos from "./estilos";
import { buscarRepositorios } from "../../servicos/requisicoes/repositorios";

export default function Repositorios() {
  const [repo, setRepo] = useState([]);

  const { navigate } = useNavigation();
  const { params } = useRoute();

  const buscar = async () => {
    const resultado = await buscarRepositorios(params?.id || 0);

    setRepo(resultado);
  };

  // useEffect que é ativado ao trocar de rota.
  useFocusEffect(React.useCallback(() => {
    buscar();

    return () => {};
  }, [params?.id]));

  return (
    <View style={estilos.container}>
      <Text style={estilos.repositoriosTexto}>
        {repo.length} repositórios criados
      </Text>

      <TouchableOpacity
        style={estilos.botao}
        onPress={() => navigate("CriarRepositorio", { id: params?.id || 0 })}
      >
        <Text style={estilos.textoBotao}>Adicionar novo repositório</Text>
      </TouchableOpacity>

      <FlatList
        data={repo}
        style={{ width: "100%" }}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={estilos.repositorio}
            onPress={() => navigate("InfoRepositorio", { item })}
          >
            <Text style={estilos.repositorioNome}>{item.name}</Text>
            <Text style={estilos.repositorioData}>
              Atualizado em {item.data}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

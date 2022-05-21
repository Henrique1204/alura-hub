import React, { useEffect, useState } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";

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

  useEffect(async () => {
    buscar();
  }, [params.id]);

  return (
    <View style={estilos.container}>
      <Text style={estilos.repositoriosTexto}>
        {repo.length} repositórios criados
      </Text>

      <TouchableOpacity
        style={estilos.botao}
        onPress={() => navigate("CriarRepositorio")}
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

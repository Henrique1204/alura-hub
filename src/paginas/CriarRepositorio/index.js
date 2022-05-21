import React, { useState } from "react";
import { Text, View, TouchableOpacity, TextInput, Alert } from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";

import estilos from "./estilos";
import { adicionarRepositorios } from "../../servicos/requisicoes/repositorios";

export default function CriarRepositorio() {
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");

  const { params } = useRoute();
  const { goBack } = useNavigation();

  const adicionar = async () => {
    const { sucesso } = await adicionarRepositorios({
      postId: params?.id,
      name: nome,
      data,
    });

    Alert.alert(
      sucesso
        ? "Item adicionado com sucesso!"
        : "Erro ao adicionar as informações!"
    );

    if (sucesso) goBack();
  };

  return (
    <View style={estilos.container}>
      <TextInput
        placeholder="Nome do repositório"
        autoCapitalize="none"
        style={estilos.entrada}
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        placeholder="Data de criação"
        autoCapitalize="none"
        style={estilos.entrada}
        value={data}
        onChangeText={setData}
      />

      <TouchableOpacity style={estilos.botao} onPress={adicionar}>
        <Text style={estilos.textoBotao}>Criar</Text>
      </TouchableOpacity>
    </View>
  );
}

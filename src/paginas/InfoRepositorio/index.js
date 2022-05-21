import React, { useState } from "react";
import { Text, View, TouchableOpacity, TextInput, Alert } from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";

import estilos from "./estilos";
import { atualizarRepositorios } from "../../servicos/requisicoes/repositorios";

export default function InfoRepositorio() {
  const { params } = useRoute();
  const { goBack } = useNavigation();

  const [nome, setNome] = useState(params.item.name);
  const [data, setData] = useState(params.item.data);


  const atualizar = async () => {
    const { sucesso } = await atualizarRepositorios(params.item.id, {
      ...params.item,
      name: nome,
      data,
    });

    Alert.alert(sucesso ? 'Item atualizado com sucesso!' :'Erro ao atualizar as informações!')

    goBack();
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

      <TouchableOpacity style={estilos.botao} onPress={atualizar}>
        <Text style={estilos.textoBotao}>Salvar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[estilos.botao, { backgroundColor: "#DD2B2B", marginTop: 10 }]}
      >
        <Text style={estilos.textoBotao}>Deletar</Text>
      </TouchableOpacity>
    </View>
  );
}

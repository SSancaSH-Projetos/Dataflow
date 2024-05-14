import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import Icon from 'react-native-vector-icons/FontAwesome';

const GerenciarSA = ({ navigation, route }) => {
  const [situacoesDeAprendizagem, setSituacoesDeAprendizagem] = useState([]);

  useEffect(() => {
    fetchSituacoesDeAprendizagem();
  }, []);

  useEffect(() => {
    if (route.params && route.params.itemAtualizado) {
      const itemAtualizado = route.params.itemAtualizado;
      const updatedList = situacoesDeAprendizagem.map(item => {
        if (item.id === itemAtualizado.id) {
          return itemAtualizado;
        } else {
          return item;
        }
      });
      setSituacoesDeAprendizagem(updatedList);
    }
  }, [route.params]);

  const fetchSituacoesDeAprendizagem = async () => {
    try {
      const response = await axios.get("http://10.110.12.23:8080/sa");
      setSituacoesDeAprendizagem(response.data);
    } catch (error) {
      console.error("Erro ao obter situações de aprendizagem:", error);
    }
  };

  const handleExcluirSituacao = async (id) => {
    try {
      await axios.delete(`http://10.110.12.23:8080/sa/delete/${id}`);
      fetchSituacoesDeAprendizagem();
    } catch (error) {
      console.error("Erro ao excluir situação de aprendizagem:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
        <View style={styles.title}>
          <Text style={styles.titleText}>Gerenciar Situações de Aprendizagem</Text>
        </View>
      </View>

      <View style={styles.content}>
        {/* Lista de Situações de Aprendizagem */}
        {situacoesDeAprendizagem.map((situacao) => (
          <View key={situacao.id} style={styles.situacaoContainer}>
            <Text style={styles.situacaoText}>{situacao.titulo}</Text>
            <Text style={styles.situacaoText}>{situacao.descricao}</Text>
            <Text style={styles.situacaoText}>{situacao.tipo}</Text>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => navigation.navigate("EditarSA", { item: situacao })}>
                <View style={styles.iconAlterar}>
                  <Icon name="edit" size={30} color="black" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleExcluirSituacao(situacao.id)}>
                <View style={styles.iconCancelar}>
                  <Icon name="close" size={30} color="black" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AdicionarSA", { onSituacaoAdded: fetchSituacoesDeAprendizagem })}
      >
        <View style={styles.buttonContent}>
          <Text style={styles.buttonText}>Adicionar Situação de Aprendizagem</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    height: 80,
    backgroundColor: "#3A3042",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  backButton: {
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  backButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  situacaoContainer: {
    flexDirection: "row", // Alterado para "row" para alinhar os ícones horizontalmente
    alignItems: "center",
    marginBottom: 20,
  },
  situacaoText: {
    fontSize: 18,
    marginRight: 10,
  },
  iconContainer: {
    flexDirection: "row", // Para alinhar os ícones horizontalmente
  },
  iconCancelar: {
    backgroundColor: "#FF4C4C",
    padding: 10,
    borderRadius: 15,
    marginRight: 10,
  },
  iconAlterar: {
    backgroundColor: "#DFFF85",
    padding: 10,
    borderRadius: 15,
    marginRight: 10,
  },
  addButton: {
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
  buttonContent: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "#DDD",
  },
  buttonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default GerenciarSA;

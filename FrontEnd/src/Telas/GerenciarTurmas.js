import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";

const GerenciarTurmas = ({ navigation }) => {
  const [turmas, setTurmas] = useState([]);

  useEffect(() => {
    const carregarTurmas = async () => {
      try {
        const response = await axios.get("http://10.110.12.23:8080/turma");
        setTurmas(response.data);
      } catch (error) {
        console.error("Erro ao carregar turmas:", error);
      }
    };

    const unsubscribe = navigation.addListener('focus', () => {
      carregarTurmas();
    });

    return unsubscribe;
  }, [navigation]);

  const deletarTurma = async (id) => {
    try {
      await axios.delete(`http://10.110.12.23:8080/turma/delete/${id}`);
      const novaListaTurma = turmas.filter((turma) => turma.id !== id);
      setTurmas(novaListaTurma);
    } catch (error) {
      console.error("Erro ao remover turma:", error);
    }
  };

  const atualizarTurma = async (turmaAtualizada) => {
    try {
      const response = await axios.put(`http://10.110.12.23:8080/turma/update/${turmaAtualizada.id}`, turmaAtualizada);
      const indiceTurma = turmas.findIndex(turma => turma.id === turmaAtualizada.id);
      const novasTurmas = [...turmas];
      novasTurmas[indiceTurma] = turmaAtualizada;
      setTurmas(novasTurmas);
    } catch (error) {
      console.error("Erro ao atualizar turma:", error);
    }
  };

  const handleIconPress = () => {
    console.log("Ícone clicado!");
    // Coloque aqui a lógica que deseja executar quando o ícone for pressionado
  };

  const handleAdicionarAlunos = () => {
    navigation.navigate("CadastroAlunos"); // Navegar para a tela de cadastro de alunos
  };

  return (
    <View style={styles.container}>
      <View style={styles.fundo}>
        <Text style={styles.titulo}>Gerenciamento De Turmas</Text>
        <TouchableOpacity
          style={[styles.sairButton, styles.tamanhoButtonSair]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.sairButtonText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        {turmas.map((turma, index) => (
          <View key={index}>
            <TouchableOpacity onPress={handleIconPress}>
              <View style={styles.rowContainer}>
                <TouchableOpacity onPress={() => deletarTurma(turma.id)}>
                  <View style={styles.iconCancelar}>
                    <Icon name="close" size={30} color="black" />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("EditarTurma", {
                  turma: turma, // Passando o objeto turma completo
                  onUpdateTurma: atualizarTurma, // Passando a função de atualização
                })}>
                  <View style={styles.iconAlterar}>
                    <Icon name="edit" size={30} color="black" />
                  </View>
                </TouchableOpacity>
                <Text style={styles.text}>
                  {turma.nome} - {turma.sigla}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {turmas.length >= 1 && (
        <TouchableOpacity
          style={styles.buttonAdicionarAluno}
          onPress={handleAdicionarAlunos}
        >
          <Text style={styles.buttonAdicionarTextAluno}>Adicionar Alunos</Text>
        </TouchableOpacity>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonAdicionar}
          onPress={() => navigation.navigate("AdicionarTurma")}
        >
          <Text style={styles.buttonAdicionarText}>Adicionar Turma</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: 0,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  rowContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  iconAlterar: {
    backgroundColor: "#DFFF85",
    padding: 10,
    borderRadius: 15,
    marginRight: 10,
  },
  iconCancelar: {
    backgroundColor: "#FF4C4C",
    padding: 10,
    borderRadius: 15,
    marginRight: 10,
  },
  fundo: {
    height: 120,
    backgroundColor: "#3A3042",
    alignSelf: "stretch",
  },
  sairButton: {
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  sairButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: -10,
    justifyContent: "center"
  },
  tamanhoButtonSair: {
    width: 70,
    height: 40,
    marginTop: -20,
  },
  titulo: {
    color: "#fff",
    textAlign: "center",
    fontSize: 38,
    fontWeight: "bold",
    marginTop: 20,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -20,
  },
  buttonAdicionar: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonAdicionarText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonAdicionarAluno: {
    backgroundColor: "#72A4AE",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonAdicionarTextAluno: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "bold",
  },
});

export default GerenciarTurmas;

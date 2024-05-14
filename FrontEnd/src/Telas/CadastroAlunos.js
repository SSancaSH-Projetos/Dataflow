import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import axios from "axios";

const CadastroAlunos = ({ navigation, route }) => {
  const [nomeAluno, setNomeAluno] = useState("");
  const [numeroChamada, setNumeroChamada] = useState("");
  const [alunosCadastrados, setAlunosCadastrados] = useState([]);

  const handleSalvar = async () => {
    if (nomeAluno.trim() !== "" && numeroChamada.trim() !== "") {
      try {
        // Faz a requisição para a API
        const response = await axios.post("http://10.110.12.23:8080/aluno", {
          nome: nomeAluno,
          numeroChamada: numeroChamada,
        });

        // Se a requisição for bem-sucedida, adiciona o aluno à lista de alunos cadastrados
        setAlunosCadastrados([
          ...alunosCadastrados,
          { nome: nomeAluno, numero: numeroChamada },
        ]);
        console.log("Aluno Cadastrado:", {
          nome: nomeAluno,
          numero: numeroChamada,
        });

        // Limpa os campos de entrada após o cadastro
        setNomeAluno("");
        setNumeroChamada("");
      } catch (error) {
        // Em caso de erro na requisição, exibe uma mensagem de erro
        console.error("Erro ao cadastrar aluno:", error);
        Alert.alert(
          "Erro",
          "Erro ao cadastrar aluno. Por favor, tente novamente."
        );
      }
    } else {
      // Se os campos estiverem vazios, exibe uma mensagem de alerta
      Alert.alert("Atenção", "Por favor, preencha todos os campos.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.fundo}>
        <Text style={styles.title}>Cadastro de Alunos</Text>
        <TouchableOpacity
          style={[styles.backButton, styles.tamanhoButtonVoltar]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Nome do Aluno:</Text>
        <TextInput
          style={styles.input}
          value={nomeAluno}
          onChangeText={setNomeAluno}
        />

        <Text style={styles.label}>Número de Chamada:</Text>
        <TextInput
          style={styles.input}
          value={numeroChamada}
          onChangeText={setNumeroChamada}
        />

        <TouchableOpacity style={styles.button} onPress={handleSalvar}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>

        <View style={styles.listaAlunos}>
          <Text style={styles.listaAlunosTitulo}>Alunos Cadastrados:</Text>
          {alunosCadastrados.map((aluno, index) => (
            <View key={index} style={styles.alunoItemContainer}>
              <Text
                style={styles.alunoItem}
              >{`Nome: ${aluno.nome}, Número: ${aluno.numero}`}</Text>
            </View>
          ))}
        </View>
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
  fundo: {
    height: 80,
    backgroundColor: "#3A3042",
    alignSelf: "stretch",
  },
  title: {
    color: "#fff",
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: -44,
    zIndex: 1,
  },
  backButton: {
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    justifyContent: "center",
    zIndex: 5,
  },
  backButtonText: {
    flexDirection: "row",
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  tamanhoButtonVoltar: {
    width: 66,
    height: 35,
    marginTop: 20,
    marginLeft: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20, // Adicionado para espaçamento nos lados
    paddingTop: 20, // Adicionado para espaçamento no topo
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "black",
    borderWidth: 0.3,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#3A3042",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  listaAlunos: {
    marginTop: 20,
  },
  listaAlunosTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  alunoItemContainer: {
    marginBottom: 5,
  },
  alunoItem: {
    fontSize: 16,
  },
});

export default CadastroAlunos;

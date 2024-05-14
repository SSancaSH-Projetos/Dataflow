import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  CheckBox,
} from "react-native";
import axios from "axios";

const CadastroCapacidades = ({ navigation, route }) => {
  const [capacidades, setCapacidades] = useState([]); // Corrected variable name
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState("");

  const handleCheckboxChange = (option) => {
    setTipo(option);
  };

  useEffect(() => {
    carregarCapacidades(); // Corrected function name
  }, []);

  const carregarCapacidades = async () => {
    try {
      const response = await axios.get("http://10.110.12.23:8080/capacidade");
      setCapacidades(response.data);
    } catch (error) {
      console.error("Erro ao carregar capacidades:", error);
    }
  };

  const deletarCapacidade = async (id) => {
    try {
      await axios.delete(`http://10.110.12.23:8080/capacidade/delete/${id}`);
      carregarCapacidades(); // Corrected function name
    } catch (error) {
      console.error("Erro ao excluir capacidade:", error);
    }
  };

  const handleSalvar = async () => {
    if (descricao.trim() !== "" && tipo.trim() !== "") {
      try {
        const response = await axios.post(
          "http://10.110.12.23:8080/capacidade",
          {
            descricao,
            tipo,
          }
        );
        setCapacidades([...capacidades, response.data]);
        console.log("Capacidade Salva:", response.data);
        setDescricao("");
        setTipo("");
      } catch (error) {
        console.error("Erro ao salvar capacidade:", error);
      }
    }
  };

  const handleAdicionarCriterios = () => {
    navigation.navigate("AdicionarCriterios");
  };

  return (
    <View style={styles.container}>
      <View style={styles.fundo}>
        <TouchableOpacity // gu p
          style={[styles.voltarButton, styles.tamanhoButtonVoltar]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.voltarButtonText}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>Cadastro de Capacidades</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Descrição:</Text>
        <TextInput
          style={styles.input}
          value={descricao}
          onChangeText={setDescricao}
        />

        <View style={styles.checkBoxContainer}>
          <Text style={styles.label}>Tipo:</Text>
          <View style={styles.checkBoxContent}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => handleCheckboxChange("Técnica")}
            >
              <CheckBox
                value={tipo === "Técnica"}
                onValueChange={() => handleCheckboxChange("Técnica")}
              />
              <Text style={styles.checkBoxText}>Técnica</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => handleCheckboxChange("Socioemocional")}
            >
              <CheckBox
                value={tipo === "Socioemocional"}
                onValueChange={() => handleCheckboxChange("Socioemocional")}
              />
              <Text style={styles.checkBoxText}>Socioemocional</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSalvar}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>

        <View style={styles.listaCapacidades}>
          <Text style={styles.listaCapacidadesTitulo}>
            Capacidades Registradas:
          </Text>
          {capacidades.map((capacidade, index) => (
            <View key={index} style={styles.capacidadeItemContainer}>
              <Text
                style={styles.capacidadeItem}
              >{`${capacidade.descricao} - ${capacidade.tipo}`}</Text>
              <TouchableOpacity
                style={styles.adicionarCriteriosButton}
                onPress={() => deletarCapacidade(capacidade.id)}
              >
                <Text style={styles.adicionarCriteriosButtonText}>Excluir</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.adicionarCriteriosButton}
                onPress={() =>
                  handleAdicionarCriterios(
                    navigation.navigate("AdicionarCriterios")
                  )
                }
              >
                <Text style={styles.adicionarCriteriosButtonText}>
                  Adicionar Critérios
                </Text>
              </TouchableOpacity>
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
  voltarButton: {
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    justifyContent: "center",
    zIndex: 5,
  },
  voltarButtonText: {
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
  titulo: {
    color: "#fff",
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: -44,
    zIndex: 1,
  },
  descricao: {
    color: "#fff",
    textAlign: "center",
    fontSize: 38,
    fontWeight: "bold",
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: "black",
    borderWidth: 0.3,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  content: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  checkBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  checkBoxContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  checkBoxText: {
    fontSize: 18,
    color: "black",
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
  listaCapacidades: {
    marginTop: 20,
  },
  listaCapacidadesTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  capacidadeItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  capacidadeItem: {
    fontSize: 16,
  },
  adicionarCriteriosButton: {
    backgroundColor: "#3A3042",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  adicionarCriteriosButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CadastroCapacidades;

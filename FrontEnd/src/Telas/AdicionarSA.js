import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  CheckBox,
} from "react-native";
import axios from "axios";

const AdicionarSA = ({ navigation, route }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");

  const handleCheckboxChange = (option) => {
    if (selectedOption === option) {
      setSelectedOption(null);
    } else {
      setSelectedOption(option);
    }
  };

  const limparCampos = () => {
    setTitulo("");
    setDescricao("");
    setSelectedOption(null);
  };

  const registrar = async () => {
    try {
      console.log(titulo, descricao, selectedOption);
      const response = await axios.post("http://10.110.12.23:8080/sa", {
        titulo: titulo,
        descricao: descricao,
        tipo: selectedOption,
      });
      console.log(response.data);
      limparCampos();
      if (route.params && route.params.onSituacaoAdded) {
        route.params.onSituacaoAdded(); // Atualiza a lista de situações de aprendizagem na tela anterior
      }
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao registrar:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.fundo}>
        <TouchableOpacity
          style={[styles.voltarButton, styles.tamanhoButtonVoltar]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.voltarButtonText}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>
          Adicionar / Editar Situação de Aprendizagem
        </Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Título:</Text>
        <TextInput
          style={styles.input}
          value={titulo}
          onChangeText={setTitulo}
        />
        <Text style={styles.label}>Descrição:</Text>
        <TextInput
          style={styles.input}
          value={descricao}
          onChangeText={setDescricao}
        />
        <View style={[styles.checkBoxContainer, { marginVertical: 10 }]}>
          <Text style={[styles.label, styles.checkBoxLabel]}>Tipo:</Text>
          <View style={styles.checkBoxContent}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => handleCheckboxChange("Somativa")}
            >
              <CheckBox
                value={selectedOption === "Somativa"}
                onValueChange={() => handleCheckboxChange("Somativa")}
                style={{ height: 30, width: 30 }} // Ajuste o tamanho da checkbox aqui
              />
              <Text style={styles.checkBoxText}>Somativa</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => handleCheckboxChange("Formativa")}
            >
              <CheckBox
                value={selectedOption === "Formativa"}
                onValueChange={() => handleCheckboxChange("Formativa")}
                style={{ height: 30, width: 30 }} // Ajuste o tamanho da checkbox aqui
              />

              <Text style={styles.checkBoxText}>Formativa</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.contentButtons}>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={limparCampos}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={registrar}>
            <Text style={styles.buttonText}>Registrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
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
  content: {
    paddingHorizontal: 20,
    marginTop: 20,
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
  },
  checkBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkBoxLabel: {
    width: "20%", // Largura para o texto "Tipo"
  },
  checkBoxContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "80%",
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkBoxText: {
    fontSize: 18,
    color: "black",
    marginLeft: 10,
  },
  contentButtons: {
    alignItems: "center",
    paddingBottom: 40,
    marginTop: 20,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    width: "45%",
    backgroundColor: "black",
    borderRadius: 5,
    height: 50,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 10,
    borderRadius: 5,
  },
});

export default AdicionarSA;

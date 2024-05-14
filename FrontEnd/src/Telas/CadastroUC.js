import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
  Picker,
} from "react-native";
import axios from "axios";

const CadastroUC = ({ navigation, route }) => {
  const { adicionarUC } = route.params;
  const [inputNome, setNomeUC] = useState("");
  const [inputSigla, setSigla] = useState("");
  const [inputModulo, setModulo] = useState("");
  const [inputCarga, setCarga] = useState("");
  const [inputConhecimentos, setConhecimentos] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (route.params && route.params.cursoSelecionado) {
      const { id, nome } = route.params.cursoSelecionado;
      setSelectedCourse(id);
      setNomeUC(nome);
    }

    // Fetch courses from API
    axios
      .get("http://10.110.12.23:8080/curso")
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar cursos:", error);
      });
  }, [route.params]);

  const registrar = async () => {
    try {
      console.log(
        inputNome,
        inputSigla,
        inputModulo,
        inputCarga,
        inputConhecimentos
      );
      const response = await axios.post("http://10.110.12.23:8080/uc", {
        nomeUc: inputNome,
        sigla: inputSigla,
        modulo: inputModulo,
        cargaHoraria: inputCarga,
        conhecimentos: inputConhecimentos,
        curso: selectedCourse, // incluir o curso selecionado no corpo da requisição
      });
      console.log(response.data);
      const novaUC = { id: response.data.id, nome: inputNome };
      adicionarUC(novaUC);
      limparCampos();
      if (route.params && route.params.onCadastroAdded) {
        route.params.onCadastroAdded();
      }
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao registrar:", error);
    }
  };

  const limparCampos = () => {
    setNomeUC("");
    setSigla("");
    setModulo("");
    setCarga("");
    setConhecimentos("");
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View>
        <View style={styles.fundo}>
          <Text style={styles.titulo}> Cadastro de Unidade Curricular </Text>
          <TouchableOpacity
            style={[styles.sairButton, styles.tamanhoButtonSair]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.sairButtonText}>Sair</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Nome:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setNomeUC(text)}
            value={inputNome}
          />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Sigla:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setSigla(text)}
            value={inputSigla}
          />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Módulo:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setModulo(text)}
            value={inputModulo}
          />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Carga horária:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setCarga(text)}
            value={inputCarga}
          />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Conhecimentos:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setConhecimentos(text)}
            value={inputConhecimentos}
          />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Selecione um curso:</Text>
          <Picker
            selectedValue={selectedCourse}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedCourse(itemValue)
            }
            style={styles.input}
          >
            {courses.map((course) => (
              <Picker.Item
                key={course.id}
                label={course.nome}
                value={course.id}
              />
            ))}
          </Picker>
        </View>

        <TouchableOpacity style={styles.button} onPress={registrar}>
          <Text style={styles.buttonText}>Adicionar UC</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  fundo: {
    height: "13%",
    backgroundColor: "#3A3042",
    alignSelf: "stretch",
  },
  sairButton: {
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    justifyContent: "center",
    zIndex: 5,
    borderRadius: 5,
    position: "absolute",
    top: 20,
    right: 20,
  },
  sairButtonText: {
    flexDirection: "row",
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
  },
  titulo: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  formContainer: {
    marginTop: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CadastroUC;

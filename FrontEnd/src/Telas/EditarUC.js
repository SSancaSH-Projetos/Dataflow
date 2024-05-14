import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity, Text, ScrollView, Picker } from "react-native";
import axios from "axios";

const EditarUC = ({ navigation, route }) => {
  const [nomeUC, setNomeUC] = useState("");
  const [sigla, setSigla] = useState("");
  const [modulo, setModulo] = useState("");
  const [cargaHoraria, setCargaHoraria] = useState("");
  const [conhecimentos, setConhecimentos] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (route.params && route.params.uc) {
      const { nomeUc, sigla, modulo, cargaHoraria, conhecimentos, curso } = route.params.uc;
      setNomeUC(nomeUc);
      setSigla(sigla);
      setModulo(modulo);
      setCargaHoraria(cargaHoraria);
      setConhecimentos(conhecimentos);
      setSelectedCourse(curso);
    }

    axios
      .get("http://10.110.12.23:8080/curso")
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar cursos:", error);
      });
  }, [route.params]);

  const editarUC = async () => {
    try {
      if (!nomeUC || !sigla || !modulo || !cargaHoraria || !conhecimentos) {
        console.error("Por favor, preencha todos os campos obrigatórios.");
        return;
      }

      if (!route.params || !route.params.uc || !route.params.uc.id) {
        console.error("Unidade Curricular não selecionada ou inválida.");
        return;
      }

      const response = await axios.put(
        `http://10.110.12.23:8080/uc/update/${route.params.uc.id}`,
        {
          nomeUc: nomeUC,
          sigla: sigla,
          modulo: modulo,
          cargaHoraria: cargaHoraria,
          conhecimentos: conhecimentos,
          curso: selectedCourse,
        }
      );

      const ucAtualizada = response.data; // Pegando os dados atualizados da resposta da API
      navigation.navigate('GerenciarUC', { ucAtualizada: ucAtualizada }); // Enviando para GerenciarUC
    } catch (error) {
      console.error("Erro ao editar UC:", error);
    }
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
            value={nomeUC}
          />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Sigla:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setSigla(text)}
            value={sigla}
          />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Módulo:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setModulo(text)}
            value={modulo}
          />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Carga horária:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setCargaHoraria(text)}
            value={cargaHoraria}
          />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Conhecimentos:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setConhecimentos(text)}
            value={conhecimentos}
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

        <TouchableOpacity style={styles.button} onPress={editarUC}>
          <Text style={styles.buttonText}>Editar UC</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    marginHorizontal: 20,
  },
  fundo: {
    height: 120,
    backgroundColor: "#3A3042",
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
  },
  sairButton: {
    backgroundColor: "#FF0000",
    padding: 10,
    borderRadius: 5,
    position: "absolute",
    top: 20,
    right: 20,
  },
  sairButtonText: {
    color: "#FFF",
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

export default EditarUC;

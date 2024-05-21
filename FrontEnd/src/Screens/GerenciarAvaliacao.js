import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Picker } from "react-native";
import axios from "axios";

import TemplateCrud from "../Components/TemplateCrud";

const GerenciarAvaliacao = ({ navigation }) => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [coursesList, setCoursesList] = useState([]);
  const [selectedTurma, setSelectedTurma] = useState(null);
  const [turmasList, setTurmasList] = useState([]);
  const [selectedUC, setSelectedUC] = useState(null);
  const [UCList, setUCList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCursos = () => axios.get("http://localhost:8080/curso");
  const fetchUCs = () => axios.get("http://localhost:8080/uc");
  const fetchTurmas = () => axios.get("http://localhost:8080/turma");

  useEffect(() => {
    Promise.all([fetchCursos(), fetchUCs(), fetchTurmas()])
      .then((responses) => {
        setCoursesList(responses[0].data);
        setUCList(responses[1].data);
        setTurmasList(responses[2].data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
      });
  }, []);

  useEffect(() => {
    console.log("opa");
    console.log(UCList);
  }, [UCList]);
  

  return (
    <TemplateCrud>
      {/* // PUXAR CURSO  -- no front, está aparecendo a sigla */}
      <View style={styles.formContainer}>
        <Text style={styles.label}>Selecione um curso:</Text>
        <Picker
          selectedValue={selectedCourse}
          onValueChange={(itemValue, itemIndex) => setSelectedCourse(itemValue)}
          style={styles.input}
        >
          {!isLoading & coursesList.map((course) => (
            <Picker.Item
              key={course.id}
              label={course.nome}
              value={course.id}
            />
          ))}
        </Picker>
      </View>

      {/* // PUXAR TURMA */}
      <View style={styles.formContainer}>
        <Text style={styles.label}>Selecione uma turma:</Text>
        <Picker
          selectedValue={selectedTurma}
          onValueChange={(itemValue, itemIndex) => setSelectedTurma(itemValue)}
          style={styles.input}
        >
          {!isLoading & turmasList.map((turma) => (
            <Picker.Item key={turma.id} label={turma.sigla} value={turma.id} />
          ))}
        </Picker>
      </View>

      {/* // PUXAR Unidade Curricular */}
      <View style={styles.formContainer}>
        <Text style={styles.label}>Selecione uma unidade curricular:</Text>
        <Picker
          selectedValue={selectedUC}
          onValueChange={(itemValue, itemIndex) => setSelectedUC(itemValue)}
          style={styles.input}
        >
          {!isLoading & UCList.map((uc) => (
            <Picker.Item key={uc.id} label={uc.nomeUc} value={uc.id} />
          ))}
        </Picker>
      </View>

      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("IniciarAvCapacidade")}
        >
          <Text style={styles.buttonText}>Avançar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.goBackButton]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Visualizar</Text>
        </TouchableOpacity>
      </View>
    </TemplateCrud>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3A3042",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  backButton: {
    marginRight: 10,
  },
  backButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
  title: {
    flex: 1,
    alignItems: "center",
  },
  titleText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  formContainer: {
    marginTop: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "red",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  goBackButton: {
    backgroundColor: "blue",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 20,
  },
});

export default GerenciarAvaliacao;

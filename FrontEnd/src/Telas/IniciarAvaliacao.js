import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Picker } from "react-native";
import axios from "axios";

const IniciarAvaliacao = ({ navigation }) => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [coursesList, setCoursesList] = useState([]);
  const [selectedTurma, setSelectedTurma] = useState(null);
  const [turmasList, setTurmasList] = useState([]);
  const [selectedUC, setSelectedUC] = useState(null);
  const [UCList, setUCList] = useState([]);

  useEffect(() => {
    axios
      .get("http://10.110.12.23:8080/curso")
      .then((response) => {
        setCoursesList(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar cursos:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://10.110.12.23:8080/uc")
      .then((response) => {
        setUCList(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar UCs:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://10.110.12.23:8080/turma")
      .then((response) => {
        setTurmasList(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar turmas:", error);
      });
  }, []);

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
          <Text style={styles.titleText}>Avaliação</Text>
        </View>
      </View>

      {/* // PUXAR CURSO  -- no front, está aparecendo a sigla */}
      <View style={styles.formContainer}>
        <Text style={styles.label}>Selecione um curso:</Text>
        <Picker
          selectedValue={selectedCourse}
          onValueChange={(itemValue, itemIndex) => setSelectedCourse(itemValue)}
          style={styles.input}
        >
          {coursesList.map((course) => (
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
          {turmasList.map((turma) => (
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
          {UCList.map((uc) => (
            <Picker.Item key={uc.id} label={uc.nomeUc} value={uc.id} />
          ))}
        </Picker>
      </View>

      <View>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('IniciarAvCapacidade')}>
          <Text style={styles.buttonText}>Avançar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.goBackButton]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Visualizar</Text>
        </TouchableOpacity>
      </View>
    </View>
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

export default IniciarAvaliacao;

import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from "react-native";
import axios from "axios";

const EditarCurso = ({ navigation, route }) => {
  const [cursoNome, setCursoNome] = useState("");
  const [cargaHoraria, setCargaHoraria] = useState("");
  const [nivel, setNivel] = useState("");

  useEffect(() => {
    if (route.params && route.params.curso) {
      const { nome, cargaHoraria, nivel } = route.params.curso; // Adicione 'id' aqui
      setCursoNome(nome);
      setCargaHoraria(cargaHoraria);
      setNivel(nivel);
      // setCursoId(id); // Defina o ID do curso no estado, se necessário
    }
  }, [route.params]);  

  const editar = async () => {
    try {
      const response = await axios.put(`http://10.110.12.23:8080/curso/update/${route.params.id}`, {
        nome: cursoNome,
        cargaHoraria: cargaHoraria,
        nivel: nivel,
      });
      console.log(response.data);
      navigation.goBack();
      if (route.params && route.params.cursoEditado) {
        route.params.cursoEditado();
      }
    } catch (error) {
      console.error("Erro ao editar curso:", error);
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.voltarButton} onPress={() => navigation.goBack()}>
          <Text style={styles.voltarButtonText}>Voltar</Text>
        </TouchableOpacity>
        <View style={styles.title}>
          <Text style={styles.titleText}>Editar Curso</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Nome do Curso</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            placeholderTextColor="#999"
            value={cursoNome}
            onChangeText={setCursoNome}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Carga Horária</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            placeholderTextColor="#999"
            value={cargaHoraria}
            onChangeText={setCargaHoraria}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Nível</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            placeholderTextColor="#999"
            value={nivel}
            onChangeText={setNivel}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={editar}>
        <View style={styles.buttonContent}>
          <Text style={styles.buttonText}>Salvar Alterações</Text>
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
  voltarButton: {
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  voltarButtonText: {
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
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "black",
    borderWidth: 3,
    paddingHorizontal: 10,
    borderRadius: 15,
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

export default EditarCurso;

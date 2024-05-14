import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Picker, // Import Picker from react-native
} from "react-native";
import axios from "axios";
import TemplateCrud from "../Componentes/TemplateCrud";
import { Typography } from "@mui/material";

const AdicionarTurmas2 = ({ navigation }) => {
  const [cursoNome, setCursoNome] = useState("");
  const [sigla, setSigla] = useState("");
  const [cursos, setCursos] = useState([]); // State to store fetched courses

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await axios.get("http://10.110.12.23:8080/curso");
        setCursos(response.data);
      } catch (error) {
        console.error("Erro ao obter cursos:", error);
      }
    };
    fetchCursos();
  }, []);

  const adicionarTurma = async () => {
    try {
      const response = await axios.post("http://10.110.12.23:8080/turma", {
        nome: cursoNome,
        sigla: sigla,
      });
      console.log(response.data);
      limparCampos();
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao adicionar turma:", error);
    }
  };

  const limparCampos = () => {
    setCursoNome("");
    setSigla("");
  };

  return (
    <TemplateCrud>
      <View style={styles.container}>
        <View style={styles.fundo}>
          <TouchableOpacity
            style={[styles.voltarButton, styles.tamanhoButtonVoltar]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.voltarButtonText}>Voltar</Text>
          </TouchableOpacity>
          <Text style={styles.titulo}>Adicionar Turmas</Text>
        </View>

        <View style={styles.inputsContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Nome do Curso</Text>
            <Picker
              style={styles.pickerCursos}
              selectedValue={cursoNome}
              onValueChange={(itemValue, itemIndex) => setCursoNome(itemValue)}
            >
              {cursos.map((curso) => (
                <Picker.Item
                  label={curso.nome}
                  value={curso.nome}
                  key={curso.id}
                /> // Use curso.id as unique key
              ))}
            </Picker>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Sigla</Text>
            <TextInput
              style={styles.input}
              placeholder=""
              placeholderTextColor="#999"
              value={sigla}
              onChangeText={setSigla}
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.addTurmaButton}
          onPress={adicionarTurma}
        >
          <Text style={styles.addTurmaButtonText}>Adicionar Turma</Text>
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
  inputsContainer: {
    flex: 1,
    paddingHorizontal: "-5%",
    marginTop: 20,
  },
  inputGroup: {
    marginBottom: 0,
    marginTop: "3%",
    alignItems: "center",
  },
  inputLabel: {
    fontSize: 20,
    marginBottom: 5,
  },
  input: {
    right: "100%",
    height: 40, // Adjust the height as needed
    borderColor: "black",
    borderWidth: 3,
    paddingHorizontal: 10,
    borderRadius: 15,
    width: "40%",
  },
  addTurmaButton: {
    backgroundColor: "gray",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    position: "absolute",
    right: "70%",
    top: "80%",
  },
  addTurmaButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  inputSigla: {
    position: "absolute",
    right: 220,
    top: 200,
    flexDirection: "row",
  },
  pickerCursos: {
    right: "100%",
    height: 40, // Adjust the height as needed
    borderColor: "black",
    borderWidth: 3,
    paddingHorizontal: 10,
    borderRadius: 15,
    width: "40%",
  },
});

export default AdicionarTurmas2;

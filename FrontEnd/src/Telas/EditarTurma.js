import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Picker,
} from "react-native";
import axios from "axios";

const EditarTurma = ({ route, navigation }) => {
  const { turma, onUpdateTurma } = route.params;
  const [cursoNome, setCursoNome] = useState(turma.nome);
  const [sigla, setSigla] = useState(turma.sigla);
  const { id } = turma;
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

    if (turma) {
      const { nome, sigla } = turma;
      setCursoNome(nome);
      setSigla(sigla);
    }
  }, [turma]); // Dependency array includes `turma` for re-fetching courses if turma changes

  const salvarTurma = async () => {
    try {
      if (!id) {
        console.error("ID da turma não está definido.");
        return;
      }

      const url = `http://10.110.12.23:8080/turma/update/${id}`;
      await axios.put(url, { nome: cursoNome, sigla: sigla });

      const turmaAtualizada = { ...turma, nome: cursoNome, sigla: sigla };
      onUpdateTurma(turmaAtualizada);
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao salvar turma:", error);
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
        <Text style={styles.titulo}>Editar Turma</Text>
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
                key={curso.id} // Use curso.id as unique key
              />
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
      <TouchableOpacity style={styles.addTurmaButton} onPress={salvarTurma}>
        <Text style={styles.addTurmaButtonText}>Salvar Turma</Text>
      </TouchableOpacity>
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
  inputsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  inputGroup: {
    marginBottom: 0,
    marginTop: 60,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "black",
    borderWidth: 3,
    paddingHorizontal: 10,
    borderRadius: 15,
    width: "45%",
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
  pickerCursos:{
  right: "100%",
  height: 40, // Adjust the height as needed
  borderColor: "black",
  borderWidth: 3,
  paddingHorizontal: 10,
  borderRadius: 15,
  width: "40%",
  }
});

export default EditarTurma;

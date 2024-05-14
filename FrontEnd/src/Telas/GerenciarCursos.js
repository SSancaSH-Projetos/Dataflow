import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";

const GerenciarCursos = ({ navigation, route }) => {
  const [cursos, setCursos] = useState([]);

  const fetchCursos = useCallback(async () => {
    try {
      const response = await axios.get("http://10.110.12.9:8080/curso");
      setCursos(response.data);
    } catch (error) {
      console.error("Erro ao obter cursos:", error);
    }
  }, []);

  useEffect(() => {
    fetchCursos("http://10.110.12.9:8080/curso", {
      method: "GET",
      headers:{
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((response)=> response.json())
    .then((data) => setCursos(data))
    .catch((error) => console.error("Erro ao obter cursos:", error))
  }, [fetchCursos]);

  const handleExcluirCurso = async (id) => {
    try {
      await axios.delete(`http://10.110.12.9:8080/curso/delete/${id}`);
      // Atualizar localmente a lista de cursos após a exclusão
      setCursos(cursos.filter((curso) => curso.id !== id));
    } catch (error) {
      console.error("Erro ao excluir curso:", error);
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
        <Text style={styles.titulo}>Gerenciar Cursos</Text>
      </View>

      <View style={styles.content}>
        {cursos.map((curso) => (
          <View key={curso.id} style={styles.cursoContainer}>
            <Text style={styles.cursoText}>{curso.nome}</Text>
            <Text style={styles.cursoText}>{curso.nivel}</Text>
            <Text style={styles.cursoText}>{curso.cargaHoraria}</Text>
            <View style={styles.iconContainer}>
              <TouchableOpacity

                  onPress={() => navigation.navigate("EditarCurso", { curso: curso })}
              >
                <View style={styles.iconAlterar}>
                  <Icon name="edit" size={30} color="black" />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleExcluirCurso(curso.id)} // Chamar a função handleExcluirCurso ao pressionar o ícone de exclusão
              >
                <View style={styles.iconCancelar}>
                  <Icon name="close" size={30} color="black" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AdicionarCurso")}
      >
        <View style={styles.buttonContent}>
          <Text style={styles.buttonText}>Adicionar Curso</Text>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
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
  situacaoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  situacaoText: {
    fontSize: 18,
    marginRight: 10,
  },
  iconContainer: {
    flexDirection: "row",
  },
  iconCancelar: {
    backgroundColor: "#FF4C4C",
    padding: 10,
    borderRadius: 15,
    marginRight: 10,
  },
  iconAlterar: {
    backgroundColor: "#DFFF85",
    padding: 10,
    borderRadius: 15,
    marginRight: 10,
  },
});

export default GerenciarCursos;

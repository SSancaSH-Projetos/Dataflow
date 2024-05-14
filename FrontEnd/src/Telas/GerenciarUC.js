import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import CadastroCapacidades from "./CadastroCapacidades";

const GerenciarUC = ({ navigation, route }) => {
  const [ucs, setUnidadeCurricular] = useState([]);

  useEffect(() => {
    fetchCourseUnits();
  }, []);

  useEffect(() => {
    if (route.params && route.params.ucAtualizada) {
      const ucAtualizada = route.params.ucAtualizada;
      const updatedList = ucs.map(uc => {
        if (uc.id === ucAtualizada.id) {
          return ucAtualizada;
        } else {
          return uc;
        }
      });
      setUnidadeCurricular(updatedList);
    }
  }, [route.params]);

  const fetchCourseUnits = async () => {
    try {
      const response = await axios.get("http://10.110.12.23:8080/uc");
      const unidadesComCapacidades = response.data.map(unit => ({ ...unit, capacidades: [] }));
      setUnidadeCurricular(unidadesComCapacidades);
    } catch (error) {
      console.error("Erro ao buscar unidades curriculares:", error);
    }
  };

  const adicionarUC = (novaUC) => {
    const novaUCComCapacidades = { ...novaUC, capacidades: [] };
    setUnidadeCurricular([...ucs, novaUCComCapacidades]);
  };

  const deletarUC = async (id) => {
    try {
      await axios.delete(`http://10.110.12.23:8080/uc/delete/${id}`);
      const novaListaUCs = ucs.filter((uc) => uc.id !== id);
      setUnidadeCurricular(novaListaUCs);
    } catch (error) {
      console.error("Erro ao remover Unidade Curricular:", error);
    }
  };

  const adicionarCapacidades = (idUnidadeCurricular, novaCapacidade) => {
    setUnidadeCurricular(prevUnidadesCurriculares =>
      prevUnidadesCurriculares.map(uc =>
        uc.id === idUnidadeCurricular ? { ...uc, capacidades: [...uc.capacidades, novaCapacidade] } : uc
      )
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.fundo}>
        <Text style={styles.titulo}>Gerenciamento de Unidade Curricular</Text>
        <TouchableOpacity
          style={[styles.sairButton, styles.tamanhoButtonSair]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.sairButtonText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        {ucs.map((uc) => (
          <View key={uc.id} style={styles.rowContainer}>
            <TouchableOpacity onPress={() => deletarUC(uc.id)}>
              <View style={styles.iconCancelar}>
                <Icon name="close" size={30} color="black" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("EditarUC", { uc: uc })}
            >
              <View style={styles.iconAlterar}>
                <Icon name="edit" size={30} color="black" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("CadastroCapacidades", { idUnidadeCurricular: uc.id })}>
              <View style={styles.buttonAdicionarCapacidade}>
                <Text style={styles.buttonAdicionarTextCapacidade}>
                  Adicionar Capacidades
                </Text>
              </View>
            </TouchableOpacity>
            <Text style={styles.text}>{uc.nomeUc}</Text>
          </View>
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonAdicionar}
          onPress={() =>
            navigation.navigate("CadastroUC", { adicionarUC: adicionarUC })
          }
        >
          <Text style={styles.buttonAdicionarText}>
            Adicionar Unidade Curricular
          </Text>
        </TouchableOpacity>
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
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  rowContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  iconAlterar: {
    backgroundColor: "#DFFF85",
    padding: 10,
    borderRadius: 15,
    marginRight: 10,
  },
  iconCancelar: {
    backgroundColor: "#FF4C4C",
    padding: 10,
    borderRadius: 15,
    marginRight: 10,
  },
  fundo: {
    height: 120,
    backgroundColor: "#3A3042",
    alignSelf: "stretch",
  },
  sairButton: {
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  sairButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: -10,
    justifyContent: "center",
  },
  tamanhoButtonSair: {
    width: 70,
    height: 40,
    marginTop: -20,
  },
  titulo: {
    color: "#fff",
    textAlign: "center",
    fontSize: 38,
    fontWeight: "bold",
    marginTop: 20,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -20,
  },
  buttonAdicionar: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonAdicionarText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonAdicionarCapacidade: {
    backgroundColor: "#72A4AE",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonAdicionarTextCapacidade: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "bold",
  },
});

export default GerenciarUC;

import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import TabelaSA from "../Componentes/TabelaSA";

const GerenciarTurmas = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.fundo}>
        <TouchableOpacity
          style={[styles.sairButton, styles.tamanhoButtonSair]}
          onPress={() => navigation.goBack()}
        >
          
          <Text style={styles.sairButtonText}>Sair</Text>
        </TouchableOpacity>
        <Text style={styles.texto}>Gerenciar Situações de Aprendizagem</Text>

      </View>
      <div>
      <TabelaSA 
    />
    </div>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  fundo: {
    height: 120,
    backgroundColor: "#3A3042",
    alignSelf: "stretch",
  },
  sairButton: {
    backgroundColor: "red",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  sairButtonText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  tamanhoButtonSair: {
    width: 50,
    height: 25,
    marginTop: 18,
  },
  texto: {
    fontSize: 16,
    marginTop: 10,
    color: "white",
    textAlign: 'center',
  },
});

export default GerenciarTurmas;

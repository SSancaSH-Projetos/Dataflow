import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

const GerarRelatorio = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.fundo}>
        <TouchableOpacity
          style={[styles.sairButton, styles.tamanhoButtonSair]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.sairButtonText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.text}>Gerenciamento de Unidade  Curricular</Text>
      </View>
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
    height: 70,
    backgroundColor: "#3A3042",
    alignSelf: "stretch",
  },
  sairButton: {
    backgroundColor: "red",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
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
});

export default GerarRelatorio;

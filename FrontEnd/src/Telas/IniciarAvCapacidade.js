import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Picker } from "react-native";
import axios from 'axios';

const IniciarAvCapacidade = ({ navigation }) => {
  const [capacidadesList, setcapacidadesList] = useState([]);
  const [selectedCapacidade, setselectedCapacidade] = useState(null);

  useEffect(() => {
    axios
      .get("http://10.110.12.23:8080/capacidade")
      .then((response) => {
        setcapacidadesList(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar capacidades:", error);
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

      {/* PUXAR Capacidade -- no front, está aparecendo a sigla */}
      <View style={styles.formContainer}>
        <Text style={styles.label}>Selecione uma capacidade:</Text>
        <Picker
          selectedValue={selectedCapacidade}
          onValueChange={(itemValue, itemIndex) => setselectedCapacidade(itemValue)}
        >
          {capacidadesList.map((capacidade) => (
            <Picker.Item
              key={capacidade.id}
              label={capacidade.nome}
              value={capacidade.id}
            />
          ))}
        </Picker>
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
    paddingHorizontal: 20,
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default IniciarAvCapacidade;

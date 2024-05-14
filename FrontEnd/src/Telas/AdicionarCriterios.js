import React, { useState } from "react";
import axios from "axios";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  CheckBox,
} from "react-native";

const CadastroCriterios = ({ navigation, route }) => {
  const [criterios, setCriterios] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [mostrarInput, setMostrarInput] = useState(false);
  const [novoCriterio, setNovoCriterio] = useState("");
  const [criterioSelecionado, setCriterioSelecionado] = useState(null);
  const [criteriosDesejaveis, setCriteriosDesejaveis] = useState({});
  const [tipo, setTipo] = useState(""); // Estado local para tipo

  const handleSalvar = () => {
    if (descricao.trim() !== "") {
      setCriterios([...criterios, { descricao, id: Date.now() }]);
      console.log("Critério Salvo:", { descricao });
      setDescricao("");

      // Enviar o critério para a API usando Axios
      axios
        .post("http://10.110.12.23:8080/valiacaoCriterioCritico", { descricao })
        .then((response) => {
          console.log("Resposta da API:", response.data);
          // Lógica adicional após o salvamento na API, se necessário
        })
        .catch((error) => {
          console.error("Erro ao salvar na API:", error);
          // Lógica para lidar com erros, se necessário
        });

      setDescricao("");
    }
  };

  const handleAdicionarNovoCriterio = () => {
    setMostrarInput(true);
  };

  const handleConfirmarNovoCriterio = () => {
    if (novoCriterio.trim() !== "") {
      setCriteriosDesejaveis({
        ...criteriosDesejaveis,
        [criterioSelecionado]: [
          ...(criteriosDesejaveis[criterioSelecionado] || []),
          novoCriterio,
        ],
      });
      console.log("Novo Critério Desejável Adicionado:", {
        descricao: novoCriterio,
      });
      setNovoCriterio("");
      setMostrarInput(false);
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.fundo}>
        <TouchableOpacity // gu p
          style={[styles.voltarButton, styles.tamanhoButtonVoltar]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.voltarButtonText}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>Cadastro de Critérios</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Descrição:</Text>
        <TextInput
          style={styles.input}
          value={descricao}
          onChangeText={setDescricao}
        />

        <View style={styles.checkBoxContainer}>
          <Text style={styles.label}>Tipo:</Text>
          <View style={styles.checkBoxContent}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => setTipo("Desejavel")}
            >
              <CheckBox
                value={tipo === "Desejavel"}
                onValueChange={() => setTipo("Desejavel")}
              />
              <Text style={styles.checkBoxText}>Desejável</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => setTipo("Critico")}
            >
              <CheckBox
                value={tipo === "Critico"}
                onValueChange={() => setTipo("Critico")}
              />
              <Text style={styles.checkBoxText}>Crítico</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSalvar}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>

        <View style={styles.listaCriterios}>
          <Text style={styles.listaCriteriosTitulo}>Critérios Registrados:</Text>
          {criterios.map((criterio) => (
            <View key={criterio.id}>
              <TouchableOpacity
                onPress={() => setCriterioSelecionado(criterio.id)}
              >
                <Text style={styles.criterioItem}>{criterio.descricao}</Text>
              </TouchableOpacity>
              {criterio.id === criterioSelecionado &&
                (mostrarInput ? (
                  <View style={styles.inputNovoCriterioContainer}>
                    <TextInput
                      style={styles.inputNovoCriterio}
                      value={novoCriterio}
                      onChangeText={setNovoCriterio}
                      onBlur={handleConfirmarNovoCriterio}
                      autoFocus={true}
                    />
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.buttonAdicionarCriterio}
                    onPress={handleAdicionarNovoCriterio}
                  >
                    <Text style={styles.buttonAdicionarCriterioText}>
                      Adicionar Critério Desejável
                    </Text>
                  </TouchableOpacity>
                ))}
              {criterio.id === criterioSelecionado &&
                criteriosDesejaveis[criterio.id] &&
                criteriosDesejaveis[criterio.id].map((desejavel, index) => (
                  <Text key={index} style={styles.criterioDesejavelItem}>
                    {desejavel}
                  </Text>
                ))}
            </View>
          ))}
        </View>
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
fundo: {
  height: '13%',
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
  width: '6%',
  height: '5%',
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


descricao: {
  color: "#fff",
  textAlign: "center",
  fontSize: 38,
  fontWeight: "bold",
  marginTop: 20,
},
input: {
  height: 40,
  borderColor: "black",
  borderWidth: 0.3,
  paddingHorizontal: 10,
  borderRadius: 5,
  marginBottom: 10,
},
label: {
  fontSize: 18,
  marginBottom: 5,
},
content: {
  paddingHorizontal: 20,
  marginTop: 20,
},
checkBoxContainer: {
  flexDirection: "row",
  alignItems: "center",
  marginVertical: 10,
},
checkBoxContent: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
},
checkbox: {
  flexDirection: "row",
  alignItems: "center",
  marginRight: 10,
},
checkBoxText: {
  fontSize: 18,
  color: "black",
},
button: {
  backgroundColor: "#3A3042",
  paddingVertical: 10,
  paddingHorizontal: 15,
  borderRadius: 5,
  marginTop: 10,
},
buttonText: {
  color: "#FFF",
  fontSize: 16,
  fontWeight: "bold",
  textAlign: "center",
},
listaCriterios: {
  marginTop: 20,
},
listaCriteriosTitulo: {
  fontSize: 18,
  fontWeight: "bold",
  marginBottom: 10,
},
criterioItemContainer: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 5,
},
criterioItem: {
  fontSize: 16,
},

});

export default CadastroCriterios;
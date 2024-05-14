import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Modal,
  TextInput,
  Image,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Table, Row } from "react-native-table-component";
import axios from "axios";

const GerenciamentoCursos = ({ navigation, route }) => {
  const [visibilidadeMenu, setVisibilidadeMenu] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [nomeCurso, setNomeCurso] = useState("");
  const [cargaHoraria, setCargaHoraria] = useState("");
  const [nivel, setNivel] = useState("");
  const [cursos, setCursos] = useState([]);
  const [cursoSelecionado, setCursoSelecionado] = useState(null);

  useEffect(() => {
    fetchCursos();
  }, []);

  async function fetchCursos() {
    try {
      const response = await axios.get("http://10.110.12.9:8080/curso");
      setCursos(response.data);
    } catch (error) {
      console.error("Erro ao buscar cursos:", error);
    }
  }

  const handleMenu = () => {
    setVisibilidadeMenu(!visibilidadeMenu);
  };

  const handleCursoSelecionado = (curso) => {
    setCursoSelecionado(curso);
  };

  const handleAdicionarCurso = () => {
    setModalVisible(true);
  };

  const handleSalvarCurso = async () => {
    if (!nomeCurso || !cargaHoraria || !nivel) {
      console.error("Nome do curso, carga horária e nível são obrigatórios.");
      return;
    }

    if (isNaN(cargaHoraria)) {
      console.error("A carga horária deve ser um número válido.");
      return;
    }

    try {
      const response = await axios.post("http://10.110.12.9:8080/curso", {
        nome: nomeCurso,
        cargaHoraria: cargaHoraria,
        nivel: nivel,
        deleted: 0,
      });
      fetchCursos();
      console.log(response.data);
      // Navegar de volta para a tela de Gerenciamento de Cursos
    } catch (error) {
      console.error("Erro ao adicionar curso:", error);
    }

    setModalVisible(false);
    setNomeCurso("");
    setCargaHoraria("");
    setNivel("");
  };

  // Exemplo de dados das turmas
  const turmas = [
    { sigla: "T1", operacao: "Operação 1" },
    { sigla: "T2", operacao: "Operação 2" },
    { sigla: "T3", operacao: "Operação 3" },
  ];

  // Cabeçalho da tabela
  const tableHead = ["Sigla da Turma", "Operação"];

  // Dados das turmas formatados para a tabela
  const tableData = turmas.map((turma) => [turma.sigla, turma.operacao]);

  return (
    <View style={styles.container}>
      <View style={styles.topo}>
        <Pressable style={{ marginLeft: 20 }} onPress={handleMenu}>
          <FontAwesome name="bars" size={30} />
        </Pressable>
        <Text style={{ color: "white", marginLeft: 400, fontSize: 30 }}>
          Gerenciamento de Cursos
        </Text>
      </View>
      <View style={styles.viewMae}>
        <View style={styles.quadroEsquerda}>
          <View style={styles.viewTopoSeparacao}>
            <Text style={styles.txtTopoSeparacao}>Lista de Cursos</Text>
          </View>
          {/* Renderização dos botões para cada curso */}

          <ScrollView style={styles.listaDeCursos}>
            {cursos.map((curso) => (
              <Pressable
                key={curso.id}
                style={styles.btnCurso}
                onPress={() => handleCursoSelecionado(curso)}
              >
                <Text style={styles.textoCurso}>{curso.nome}</Text>
                <Pressable onPress={() => console.log("Funciona")} style={{marginLeft:"80%"}}>
                  <Image
                    source={require("./../../assets/novo.png")}
                    style={{ height: 22.5, width: 22.5,}}
                  />
                </Pressable>
              </Pressable>
            ))}

            {console.log(cursos)}
          </ScrollView>
          <View style={styles.viewAddCurso}>
            <Pressable
              style={styles.btnAddCurso}
              onPress={handleAdicionarCurso}
            >
              <Text style={{ fontSize: 20, padding: 15, fontWeight: "bold" }}>
                Adicionar Curso
              </Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.quadroDireita}>
          <View style={styles.viewTopoSeparacao}>
            <Text style={{ ...styles.txtTopoSeparacao, fontWeight: "bold" }}>
              Informações
            </Text>
          </View>
          <View style={styles.viewInformacoes}>
            <Text style={{ ...styles.txtInformacoes, borderTopWidth: 0 }}>
              Nome do Curso: {cursoSelecionado ? cursoSelecionado.nome : ""}
            </Text>
            <Text style={styles.txtInformacoes}>
              Carga Horária:{" "}
              {cursoSelecionado ? cursoSelecionado.cargaHoraria : ""}{" "}
            </Text>
            <Text style={styles.txtInformacoes}>
              Nível: {cursoSelecionado ? cursoSelecionado.nivel : ""}{" "}
            </Text>
          </View>
          <View style={styles.viewListaTurmas}>
            <Text style={{ ...styles.txtTopoSeparacao, fontWeight: "bold" }}>
              Lista de Turmas
            </Text>
          </View>

          {/* Tabela de Turmas */}
          <Table borderStyle={{ borderWidth: 2, borderColor: "black" }}>
            <Row data={tableHead} style={styles.head} textStyle={styles.text} />
            {tableData.map((rowData, index) => (
              <Row
                key={index}
                data={rowData}
                style={[
                  styles.row,
                  index % 2 && { backgroundColor: "#f2f2f2" },
                ]}
                textStyle={styles.text}
              />
            ))}
          </Table>
        </View>
      </View>

      {visibilidadeMenu && (
        <View style={styles.menu}>
          <View style={styles.cabecalhoMenu}>
            <Text
              style={{ fontSize: 40, color: "white", marginHorizontal: 60 }}
            >
              MasterNote
            </Text>
            <Pressable onPress={handleMenu}>
              <FontAwesome name="bars" size={50} />
            </Pressable>
          </View>
          <View
            style={{
              height: "82%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Pressable
              style={{
                ...styles.menuBotoes,
                marginTop: 20,
                backgroundColor: "gray",
              }}
            >
              <Text style={{ fontSize: 18 }}>Gerenciar</Text>
              <Text>Curso</Text>
            </Pressable>
            <Pressable style={styles.menuBotoes}>
              <Text
                onPress={() => navigation.navigate("GerenciarTurmas")}
                style={{ fontSize: 18 }}
              >
                Gerenciar
              </Text>
              <Text>Turma</Text>
            </Pressable>
            <Pressable style={styles.menuBotoes}>
              <Text
                onPress={() => navigation.navigate("GerenciarUC")}
                style={{ fontSize: 18 }}
              >
                Gerenciar
              </Text>
              <Text>Unidade Curricular</Text>
            </Pressable>
            <Pressable style={styles.menuBotoes}>
              <Text
                onPress={() => navigation.navigate("GerenciarSA")}
                style={{ fontSize: 18 }}
              >
                Gerenciar
              </Text>
              <Text>Situação de Aprendizagem</Text>
            </Pressable>
            <Pressable style={styles.menuBotoes}>
              <Text
                onPress={() => navigation.navigate("IniciarAvaliacao")}
                style={{ fontSize: 18 }}
              >
                Gerenciar
              </Text>
              <Text>Avaliações</Text>
            </Pressable>
            <Pressable style={styles.menuBotoes}>
              <Text
                onPress={() => navigation.navigate("GerarRelatorio")}
                style={{ fontSize: 18 }}
              >
                Relatório de
              </Text>
              <Text>Desempenho</Text>
            </Pressable>
          </View>
        </View>
      )}

      {/* Modal de Cadastro de Curso */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Adicionar Curso</Text>
              <Pressable onPress={() => setModalVisible(false)}>
                <FontAwesome name="times" size={24} color="black" />
              </Pressable>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Nome do Curso"
              onChangeText={(text) => setNomeCurso(text)} // Update the 'nomeCurso' state with the text value
              value={nomeCurso}
            />

            <TextInput
              style={styles.input}
              placeholder="Nível"
              onChangeText={(text) => setNivel(text)} // Update the 'nivel' state with the text value
              value={nivel}
            />

            <TextInput
              style={styles.input}
              placeholder="Carga Horária"
              onChangeText={(text) => setCargaHoraria(text)} // Update the 'cargaHoraria' state with the text value
              value={cargaHoraria}
            />

            <Pressable style={styles.modalButton} onPress={handleSalvarCurso}>
              <Text style={styles.modalButtonText}>Salvar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topo: {
    height: "8%",
    flexDirection: "row",
    backgroundColor: "blue",
    alignItems: "center",
  },
  viewMae: {
    flexDirection: "row",
    height: "92%",
  },
  quadroEsquerda: {
    height: "80%",
    width: "28%",
  },
  quadroDireita: {
    width: "72%",
    borderWidth: 2,
  },
  viewTopoSeparacao: {
    height: "6%",
    borderBottomWidth: 2,
    justifyContent: "center",
  },
  txtTopoSeparacao: {
    textAlign: "center",
    color: "red",
    fontSize: 20,
    position: "absolute",
  },
  listaDeCursos: {
    borderBottomWidth: 2,
  },
  viewAddCurso: {
    height: "14%",
    justifyContent: "center",
    alignItems: "center",
  },
  btnAddCurso: {
    width: "95%",
    backgroundColor: "yellow",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 20,
    alignItems: "center",
  },
  viewInformacoes: {
    height: "18%",
    borderBottomWidth: 2,
    justifyContent: "center",
  },
  txtInformacoes: {
    fontSize: 18,
    padding: 5,
    borderTopWidth: 2,
  },
  viewListaTurmas: {
    height: "9%",
    borderBottomWidth: 2,
    justifyContent: "center",
  },
  viewSiglaTopo: {
    width: "70%",
    justifyContent: "center",
    borderBottomWidth: 2,
    borderRightWidth: 2,
  },
  viewOperacaoTopo: {
    width: "30%",
    justifyContent: "center",
    borderBottomWidth: 2,
  },
  txtMedioCentralizado: {
    fontSize: 18,
    textAlign: "center",
  },
  menu: {
    position: "absolute",
    width: "32%",
    height: "100%",
    backgroundColor: "white",
    borderRightWidth: 2,
  },
  cabecalhoMenu: {
    height: "18%",
    backgroundColor: "blue",
    borderBottomWidth: 2,
    alignItems: "center",
    flexDirection: "row",
  },
  menuBotoes: {
    width: "80%",
    borderWidth: 2,
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    marginBottom: 10,
  },

  // Estilos da tabela
  head: { height: 40, backgroundColor: "#f1f8ff" },
  text: { margin: 6, textAlign: "center", textAlignVertical: "center" },
  row: { flexDirection: "row", height: 50, backgroundColor: "white" },

  // Estilos do Modal
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },

  btnCurso: {
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderRadius: 20,
    margin: 5,
  },

  btnCurso2: {
    alignItems: "flex-end",
  },
  textoCurso: {
    fontSize: 16,
    position: "absolute",
    alignSelf: "center",
  },
  dropdownMenu: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#fff",
    elevation: 4,
    borderRadius: 4,
    padding: 8,
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  dropdownText: {
    fontSize: 16,
  },
  listaDeCursosContainer: {
    borderBottomWidth: 2,
    borderBottomColor: "black",
    marginBottom: 10, // Espaço extra abaixo da lista
  },
});

export default GerenciamentoCursos;

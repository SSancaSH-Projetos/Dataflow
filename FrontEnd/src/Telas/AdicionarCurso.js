import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, ScrollView, Modal, TextInput } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Table, Row } from "react-native-table-component";
import axios from "axios";

const GerenciamentoCursos = ({ navigation, route }) => {
  const [visibilidadeMenu, setVisibilidadeMenu] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [nomeCurso, setNomeCurso] = useState('');
  const [cargaHoraria, setCargaHoraria] = useState('');
  const [nivel, setNivel] = useState('');

  const handleMenu = () => {
    setVisibilidadeMenu(!visibilidadeMenu);
  };

  const handleAdicionarCurso = () => {
    setModalVisible(true);
  };

  const handleSalvarCurso = async () => {
    // Aqui você pode implementar a lógica para salvar o curso
    // Por exemplo, enviar os dados para um servidor ou salvar localmente
      try {
        const response = await axios.post("http://10.110.12.26:8080/curso", {
          nome: cursoNome,
          cargaHoraria: cargaHoraria,
          nivel: nivel,
        });
        console.log(response.data);
        limparCampos();
        if (route.params && route.params.onSituacaoAdded) {
          route.params.onSituacaoAdded(); // Atualiza a lista de situações de aprendizagem na tela anterior
        }
        navigation.goBack();
      } catch (error) {
        console.error("Erro ao adicionar curso:", error);
      }


    // Fechar o modal e limpar os campos
    setModalVisible(false);
    setNomeCurso('');
    setCargaHoraria('');
    setNivel('');
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
          <ScrollView style={styles.listaDeCursos}></ScrollView>
          <View style={styles.viewAddCurso}>
            <Pressable style={styles.btnAddCurso} onPress={handleAdicionarCurso}>
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
              Nome do Curso: {/* curso.nome_curso */}
            </Text>
            <Text style={styles.txtInformacoes}>
              Carga Horária: {/* curso.carga_horaria */}
            </Text>
            <Text style={styles.txtInformacoes}>
              Nível: {/* curso.nivel */}
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
                style={[styles.row, index % 2 && { backgroundColor: "#f2f2f2" }]}
                textStyle={styles.text}
              />
            ))}
          </Table>

        </View>
      </View>

      {visibilidadeMenu && (
        <View style={styles.menu}>
          {/* Código do menu */}
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
            <Text style={styles.modalTitle}>Adicionar Curso</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome do Curso"
              onChangeText={setNomeCurso}
              value={nomeCurso}
            />
            <TextInput
              style={styles.input}
              placeholder="Carga Horária"
              onChangeText={setCargaHoraria}
              value={cargaHoraria}
            />
            <TextInput
              style={styles.input}
              placeholder="Nível"
              onChangeText={setNivel}
              value={nivel}
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
    width: "28%",
    borderWidth: 2,
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
  head: { height: 40, backgroundColor: "#f1f8ff" },
  text: { margin: 6, textAlign: 'center', textAlignVertical: 'center' },
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
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
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
});

export default GerenciamentoCursos;

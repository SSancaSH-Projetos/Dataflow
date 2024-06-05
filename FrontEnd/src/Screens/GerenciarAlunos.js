import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import {
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import TemplateCrud from "../Components/TemplateCrud";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const GerenciarAlunos = ({ navigation }) => {
  const [nome, setNome] = useState("");
  const [numeroChamada, setNumeroChamada] = useState("");
  const [alunos, setAlunos] = useState([]);
  const [editAluno, setEditAluno] = useState(null);
  const [editedAluno, setEditedAluno] = useState(null);
  const [modalOpen, setModalOpen] = useState(false); // Estado para controlar o modal
  const [mensagemAviso, setMensagemAviso] = useState("");

  const handleEditarAluno = (aluno) => {
    setEditAluno(aluno);
    setEditedAluno(aluno);
    setModalOpen(true); // Abrir o modal ao pressionar o ícone de editar
  };

  const handleCloseModal = () => {
    setModalOpen(false); // Fechar o modal
  };

  const handleConfirmarEdicao = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/aluno/update/${editedAluno.id}`,
        {
          nome: editedAluno.nome,
          numeroChamada: editedAluno.numeroChamada,
        }
      );
      console.log(response.data);
      fetchAlunos();
      setModalOpen(false);
      limparCampos();
    } catch (error) {
      console.error("Erro ao editar Aluno:", error);
    }
  };

  const fetchAlunos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/aluno");
      setAlunos(response.data);
    } catch (error) {
      console.error("Erro ao obter alunos:", error);
    }
  };

  useEffect(() => {
    fetchAlunos();
  }, []);

  const handleAddAluno = async () => {
    if (!nome || !numeroChamada) {
      setMensagemAviso("Por favor, preencha todos os campos. ");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8080/aluno", {
        nome: nome,
        numeroChamada: numeroChamada,
      });
      console.log(response.data);
      limparCampos();
      fetchAlunos();
      setMensagemAviso("");
    } catch (error) {
      console.error("Erro ao adicionar aluno:", error);
    }
  };

  const limparCampos = () => {
    setNome("");
    setNumeroChamada("");
  };

  const handleDeletarAluno = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/aluno/delete/${id}`);
      fetchAlunos();
    } catch (error) {
      console.error("Erro ao excluir aluno:", error);
    }
  };

  return (
    <ScrollView>
      <TemplateCrud>
        <View style={styles.mainContainer}>
          <View style={styles.contentContainer}>
            <View style={styles.formContainer}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                style={styles.title}
              >
                Adicionar Alunos
              </Typography>
              <TextField
                label="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                variant="outlined"
                fullWidth
                style={styles.input}
              />
              <TextField
                label="Número da Chamada"
                value={numeroChamada}
                onChange={(e) => setNumeroChamada(e.target.value)}
                variant="outlined"
                fullWidth
                style={styles.input}
              />
              {mensagemAviso && (
                <Typography color="error" style={styles.mensagemAviso}>
                  {mensagemAviso}
                </Typography>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddAluno}
                style={styles.button}
              >
                Adicionar Alunos
              </Button>
            </View>
            <View style={styles.tableContainer}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><b>Nome do Aluno</b></TableCell>
                      <TableCell><b>Número da Chamada</b></TableCell>
                      <TableCell><b>Ação</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {alunos.map((aluno) => (
                      <TableRow key={aluno.id}>
                        <TableCell>{aluno.nome}</TableCell>
                        <TableCell>{aluno.numeroChamada}</TableCell>
                        <TableCell>
                          <EditIcon
                            color="primary"
                            onClick={() => handleEditarAluno(aluno)}
                          />
                          <DeleteIcon
                            color="primary"
                            onClick={() => handleDeletarAluno(aluno.id)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </View>
          </View>
        </View>
        <Dialog open={modalOpen} onClose={handleCloseModal}>
          <DialogTitle>Editar Aluno</DialogTitle>
          <DialogContent>
            <TextField
              label="Nome"
              value={editedAluno ? editedAluno.nome : ""}
              onChange={(e) =>
                setEditedAluno({ ...editedAluno, nome: e.target.value })
              }
              fullWidth
              variant="outlined"
              style={styles.input}
            />
            <TextField
              label="Numero da Chamada"
              value={editedAluno ? editedAluno.numeroChamada : ""}
              onChange={(e) =>
                setEditedAluno({
                  ...editedAluno,
                  numeroChamada: e.target.value,
                })
              }
              fullWidth
              variant="outlined"
              style={styles.input}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal}>Cancelar</Button>
            <Button onClick={handleConfirmarEdicao} color="primary">
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
      </TemplateCrud>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10,
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
  },
  formContainer: {
    flex: 1,
    padding: 20,
  },
  tableContainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
  },
  mensagemAviso: {
    marginBottom: 10,
  },
});

export default GerenciarAlunos;
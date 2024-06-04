import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Picker,
  ScrollView,
} from "react-native";
import {
  TextField,
  Typography,
  Breadcrumbs,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  InputLabel,
  MenuItem,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import TemplateCrud from "../Components/TemplateCrud";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const GerenciarCursos = ({ navigation }) => {
  const [nome, setNome] = useState("");
  const [cargaHoraria, setCargaHoraria] = useState("");
  const [nivel, setNivel] = useState("");
  const [cursos, setCursos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editedCurso, setEditedCurso] = useState(null);
  const [mensagemAviso, setMensagemAviso] = useState("");

  const fetchCursos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/curso");
      setCursos(response.data);
    } catch (error) {
      console.error("Erro ao obter cursos:", error);
    }
  };

  useEffect(() => {
    fetchCursos();
  }, []);

  const handleAddCurso = async () => {
    if(!nome || !cargaHoraria || !nivel){
      setMensagemAviso("Por favor, preencha todos os campos. ");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8080/curso", {
        nome: nome,
        cargaHoraria: cargaHoraria,
        nivel: nivel,
      });
      console.log(response.data);
      limparCampos();
      fetchCursos();
      setMensagemAviso("");
    } catch (error) {
      console.error("Erro ao adicionar curso:", error);
    }
  };

  const handleDeletarCurso = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/curso/delete/${id}`);
      fetchCursos(); // Corrected function name
    } catch (error) {
      console.error("Erro ao excluir curso:", error);
    }
  };

  const limparCampos = () => {
    setNome("");
    setCargaHoraria("");
    setNivel("");
  };

  const handleEditarCurso = (curso) => {
    setEditedCurso(curso);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleConfirmarEdicao = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/curso/update/${editedCurso.id}`,
        {
          nome: editedCurso.nome,
          cargaHoraria: editedCurso.cargaHoraria,
          nivel: editedCurso.nivel,
        }
      );
      console.log(response.data);
      fetchCursos();
      setModalOpen(false);
      limparCampos();
    } catch (error) {
      console.error("Erro ao editar curso:", error);
    }
  };

  return (
    <ScrollView>
      <TemplateCrud>
        <View style={styles.mainContainer}>
          <View style={styles.breadcrumbsContainer}></View>
          <View style={styles.contentContainer}>
            <View style={styles.formContainer}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                style={styles.title}
              >
                Adicionar Curso
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
                label="Nivel"
                value={nivel}
                onChange={(e) => setNivel(e.target.value)}
                variant="outlined"
                fullWidth
                style={styles.input}
              />
              <TextField
                label="Carga Horaria"
                value={cargaHoraria}
                onChange={(e) => setCargaHoraria(e.target.value)}
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
                onClick={handleAddCurso}
                style={styles.button}
              >
                Adicionar Curso
              </Button>
            </View>
            <View style={styles.tableContainer}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Curso</TableCell>
                      <TableCell>Nível</TableCell>
                      <TableCell>Carga Horária</TableCell>
                      <TableCell>Ação</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cursos.map((curso) => (
                      <TableRow key={curso.id}>
                        <TableCell>{curso.nome}</TableCell>
                        <TableCell>{curso.nivel}</TableCell>
                        <TableCell>{curso.cargaHoraria}</TableCell>
                        <TableCell>
                          <EditIcon
                            color="primary"
                            onClick={() => handleEditarCurso(curso)}
                          />
                          <DeleteIcon
                            color="primary"
                            onClick={() => handleDeletarCurso(curso.id)}
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
          <DialogTitle>Editar Curso</DialogTitle>
          <DialogContent>
            <TextField
              label="Nome"
              value={editedCurso ? editedCurso.nome : ""}
              onChange={(e) =>
                setEditedCurso({ ...editedCurso, nome: e.target.value })
              }
              fullWidth
              variant="outlined"
              style={styles.input}
            />
            <TextField
              label="Nivel"
              value={editedCurso ? editedCurso.nivel : ""}
              onChange={(e) =>
                setEditedCurso({ ...editedCurso, nivel: e.target.value })
              }
              fullWidth
              variant="outlined"
              style={styles.input}
            />
            <TextField
              label="Carga Horaria"
              value={editedCurso ? editedCurso.cargaHoraria : ""}
              onChange={(e) =>
                setEditedCurso({
                  ...editedCurso,
                  cargaHoraria: e.target.value,
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
  breadcrumbsContainer: {
    marginBottom: 10,
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

export default GerenciarCursos;

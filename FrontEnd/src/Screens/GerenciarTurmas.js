// GerenciarTurmas.js
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ActivityIndicator, ScrollView } from "react-native";
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
  MenuItem,
  Select,
} from "@mui/material";
import axios from "axios";
import TemplateCrud from "../Components/TemplateCrud";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ListaDeTransferencia from "../Components/ListaDeTransferencia";

const GerenciarTurmas = ({ navigation }) => {
  const [cursoId, setCursoId] = useState("");
  const [sigla, setSigla] = useState("");
  const [cursos, setCursos] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [alunosSelecionados, setAlunosSelecionados] = useState([]);

  const fetchCursos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/curso");
      setCursos(response.data);
    } catch (error) {
      console.error("Erro ao obter cursos:", error);
    }
  };

  const fetchTurmas = async () => {
    try {
      const response = await axios.get("http://localhost:8080/turma");
      setTurmas(response.data);
    } catch (error) {
      console.error("Erro ao obter turmas:", error);
    }
  };

  const fetchAlunos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/aluno");
      setAlunos(response.data);
    } catch (error) {
      console.error("Erro ao obter Alunos:", error);
    }
  };

  const handleDeletarTurma = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/turma/delete/${id}`);
      fetchTurmas(); // Corrected function name
    } catch (error) {
      console.error("Erro ao excluir capacidade:", error);
    }
 };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await Promise.all([fetchCursos(), fetchTurmas(), fetchAlunos()]);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleAddTurma = async () => {
    try {
      const response = await axios.post("http://localhost:8080/turma", {
        curso: cursoId,
        sigla: sigla,
        alunosNaTurma: alunosSelecionados.map(aluno => aluno.id), // Passar IDs dos alunos selecionados
      });
      console.log(response.data);
      limparCampos();
      fetchTurmas();
    } catch (error) {
      console.error("Erro ao adicionar turma:", error);
    }
  };

  const handleAlunosSelecionadosChange = (selectedAlunos) => {
    setAlunosSelecionados(selectedAlunos); console.log(selectedAlunos)
  };

  const limparCampos = () => {
    setCursoId("");
    setSigla("");
  };

  const handleEditarTurma = (id) => {
    console.log("Editar turma com ID:", id);
  };

  const handleExcluirTurma = (id) => {
    
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView>
    <TemplateCrud>
      <View style={styles.mainContainer}>
        <View style={styles.breadcrumbsContainer}>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.formContainer}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              style={styles.title}
            >
              Adicionar Turmas
            </Typography>

            <Select
              labelId="curso-select-label"
              id="curso-select"
              value={cursoId}
              onChange={(e) => setCursoId(e.target.value)}
              sx={{ marginBottom: "20px" }}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Selecionar Curso
              </MenuItem>
              {cursos.map((curso) => (
                <MenuItem key={curso.id} value={curso.id}>
                  {curso.nome}
                </MenuItem>
              ))}
            </Select>

            <TextField
              label="Sigla"
              value={sigla}
              onChange={(e) => setSigla(e.target.value)}
              variant="outlined"
              fullWidth
              style={styles.input}
            />
            <ListaDeTransferencia alunos={alunos} onSelectionChange={handleAlunosSelecionadosChange} />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddTurma}
              style={styles.button}
            >
              Adicionar Turma
            </Button>
          </View>
          <View style={styles.tableContainer}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Turma</TableCell>
                    <TableCell>Curso</TableCell>
                    <TableCell>Ação</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {turmas.map((turma) => (
                    <TableRow key={turma.id}>
                      <TableCell>{turma.sigla}</TableCell>
                      <TableCell>{turma.curso.nome}</TableCell>
                      <TableCell>
                        <EditIcon
                          color="primary"
                          onClick={() => handleEditarTurma(turma.id)}
                        />
                        <DeleteIcon
                          color="primary"
                          onClick={() => handleDeletarTurma(turma.id)}
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GerenciarTurmas;

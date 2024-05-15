import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Picker } from "react-native";
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
} from "@mui/material";
import axios from "axios";
import TemplateCrud from "../Components/TemplateCrud";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const GerenciarTurmas = ({ navigation }) => {
  const [cursoId, setCursoId] = useState(""); // Alterado para armazenar o ID do curso selecionado
  const [sigla, setSigla] = useState("");
  const [cursos, setCursos] = useState([]);
  const [turmas, setTurmas] = useState([]);

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

  useEffect(() => {
    fetchCursos();
    fetchTurmas();
  }, []);

  const handleAddTurma = async () => {
    try {
      const response = await axios.post("http://localhost:8080/turma", {
        curso: cursoId,
        sigla: sigla,
      });
      console.log(response.data);

      fetchTurmas();
    } catch (error) {
      console.error("Erro ao adicionar turma:", error);
    }
  };

  const limparCampos = () => {
    setCursoNome("");
    setSigla("");
  };

  const handleEditarTurma = (id) => {
    console.log("Editar turma com ID:", id);
  };

  const handleExcluirTurma = (id) => {
    console.log("Excluir turma com ID:", id);
  };

  return (
    <TemplateCrud>
      <View style={styles.mainContainer}>
        <View style={styles.breadcrumbsContainer}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              color="inherit"
              href="#"
              onPress={() => console.log("Navigate to Dashboard")}
            >
              Dashboard
            </Link>
            <Typography color="textPrimary">Adicionar Turmas</Typography>
          </Breadcrumbs>
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
              displayEmpty // Isso permite que o Select tenha um valor vazio selecionável
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
                    <TableCell>Sigla</TableCell>
                    <TableCell>Curso</TableCell>
                    <TableCell>Ação</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {turmas.map((turma) => (
                    <TableRow key={turma.id}>
                      <TableCell>{turma.sigla}</TableCell>
                      <TableCell>{turma.curso || "não atribuído"}</TableCell>

                      <TableCell>
                        <EditIcon
                          color="primary"
                          onClick={() => handleEditarTurma(turma.id)}
                        />
                        <DeleteIcon
                          color="primary"
                          onClick={() => handleExcluirTurma(turma.id)}
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
});

export default GerenciarTurmas;

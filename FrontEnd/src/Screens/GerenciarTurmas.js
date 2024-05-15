import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Picker,
} from "react-native";
import { TextField, Typography, Breadcrumbs, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import axios from "axios";
import TemplateCrud from "../Components/TemplateCrud";

const GerenciarTurmas = ({ navigation }) => {
  const [cursoNome, setCursoNome] = useState("");
  const [sigla, setSigla] = useState("");
  const [cursos, setCursos] = useState([]);
  const [turmas, setTurmas] = useState([]);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await axios.get("http://10.110.12.23:8080/curso");
        setCursos(response.data);
      } catch (error) {
        console.error("Erro ao obter cursos:", error);
      }
    };

    const fetchTurmas = async () => {
      try {
        const response = await axios.get("http://10.110.12.23:8080/turma");
        setTurmas(response.data);
      } catch (error) {
        console.error("Erro ao obter turmas:", error);
      }
    };

    fetchCursos();
    fetchTurmas();
  }, []);

  const adicionarTurma = async () => {
    try {
      const response = await axios.post("http://10.110.12.23:8080/turma", {
        nome: cursoNome,
        sigla: sigla,
      });
      console.log(response.data);
      limparCampos();
      navigation.goBack();
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
            <Link color="inherit" href="#" onPress={() => console.log("Navigate to Dashboard")}>
              Dashboard
            </Link>
            <Typography color="textPrimary">Adicionar Turmas</Typography>
          </Breadcrumbs>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.formContainer}>
            <Typography variant="h6" noWrap component="div" style={styles.title}>
              Adicionar Turmas
            </Typography>

            <TextField
              label="Nome do Curso"
              value={cursoNome}
              onChange={(e) => setCursoNome(e.target.value)}
              variant="outlined"
              fullWidth
              style={styles.input}
              select
            >
              {cursos.map((curso) => (
                <Picker.Item label={curso.nome} value={curso.nome} key={curso.id} />
              ))}
            </TextField>

            <TextField
              label="Sigla"
              value={sigla}
              onChange={(e) => setSigla(e.target.value)}
              variant="outlined"
              fullWidth
              style={styles.input}
            />

            <Button variant="contained" color="primary" onClick={adicionarTurma} style={styles.button}>
              Adicionar Turma
            </Button>
          </View>
          <View style={styles.tableContainer}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell>Sigla</TableCell>
                    <TableCell>Ação</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {turmas.map((turma) => (
                    <TableRow key={turma.id}>
                      <TableCell>{turma.nome}</TableCell>
                      <TableCell>{turma.sigla}</TableCell>
                      <TableCell>
                        <Button color="primary" onClick={() => handleEditarTurma(turma.id)}>
                          Editar
                        </Button>
                        <Button color="secondary" onClick={() => handleExcluirTurma(turma.id)}>
                          Excluir
                        </Button>
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
    paddingRight: 10,
  },
  tableContainer: {
    flex: 1,
    paddingLeft: 10,
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

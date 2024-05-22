import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Picker, ScrollView } from "react-native";
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


const GerenciarAvaliacao = ({ navigation }) => {
  const [curso, setCursoId] = useState("");
  const [cursos, setCursos] = useState([]);
  const [turmaId, setTurmaId] = useState("");
  const [turmas, setTurmas] = useState([]);
  const [ucId, setUcId] = useState([]);
  const [ucs, setUCs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);



  const fetchCursos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/curso");
      setCursos(response.data);
    } catch (error) {
      console.error("Erro ao obter cursos:", error);
    }
  };

  const fetchUCs = async () => {
    try {
      const response = await axios.get("http://localhost:8080/uc");
      setUCs(response.data);
    } catch (error) {
      console.error("Erro ao obter uc:", error);
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
    const fetchData = async () => {
      setIsLoading(true);
      await Promise.all([fetchCursos(), fetchTurmas(), fetchUCs()]);
      setIsLoading(false);
    };
    fetchData();
  }, []);

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
              style={styles.title}>
              Gerenciar Avaliação
            </Typography>

            <Select
              labelId="aluno-select-curso"
              id="curso-select"
              value={curso}
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


            <Select
              labelId="turma-select-label"
              id="turma-select"
              value={turmaId}
              onChange={(e) => setTurmaId(e.target.value)}
              sx={{ marginBottom: "20px" }}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Selecionar Turma
              </MenuItem>
              {turmas.map((turma) => (
                <MenuItem key={turma.id} value={turma.id}>
                  {turma.sigla}
                </MenuItem>
              ))}
            </Select>


            <Select
              labelId="uc-select-label"
              id="uc-select"
              value={ucId}
              onChange={(e) => setUcId(e.target.value)}
              sx={{ marginBottom: "20px" }}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Selecionar UC
              </MenuItem>
              {ucs.map((uc) => (
                <MenuItem key={uc.id} value={uc.id}>
                  {uc.sigla}
                </MenuItem>
              ))}
            </Select>


          </View>
          <View style={styles.tableContainer}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell>Nivel</TableCell>
                    <TableCell>Carga Horaria</TableCell>
                    <TableCell>Ação</TableCell>
                    
                  </TableRow>
                </TableHead>
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
});



export default GerenciarAvaliacao;

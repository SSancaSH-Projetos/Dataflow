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


const GerenciarRelatorios = ({ navigation }) => {
    const [aluno, setAlunoId] = useState("");
    const [alunos, setAlunos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    const fetchAlunos = async () => {
        try {
          const response = await axios.get("http://localhost:8080/aluno");
          setAlunos(response.data);
        } catch (error) {
          console.error("Erro ao obter alunos:", error);
        }
      };
    
      useEffect(() => {
        const fetchData = async () => {
          setIsLoading(true);
          await Promise.all([fetchAlunos()]);
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
              Relatório do Aluno 
            </Typography>

            <Select
              labelId="aluno-select-label"
              id="curso-select"
              value={aluno}
              onChange={(e) => setAlunoId(e.target.value)}
              sx={{ marginBottom: "20px" }}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Selecionar Aluno
              </MenuItem>
              {alunos.map((aluno) => (
                <MenuItem key={aluno.id} value={aluno.id}>
                  {aluno.nome}
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



export default GerenciarRelatorios;

import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
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
  Button
} from "@mui/material";
import axios from "axios";
import TemplateCrud from "../Components/TemplateCrud";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const GerenciarAlunos = ({ navigation }) => {
  const [nome, setNome] = useState("");
  const [numeroChamada, setNumeroChamada] = useState("");
  const [alunos, setAlunos] = useState([]);

  const fetchAluno = async () => {
    try {
      const response = await axios.get("http://localhost:8080/aluno");
      setAlunos(response.data);
    } catch (error) {
      console.error("Erro ao obter cursos:", error);
    }
  };

  useEffect(() => {
    fetchAluno();
  }, []);

  const handleAddAluno = async () => {
    try {
      const response = await axios.post("http://localhost:8080/aluno", {
        nome: nome,
        numeroChamada: numeroChamada,
      });
      console.log(response.data);
      limparCampos();
      fetchAluno();
    } catch (error) {
      console.error("Erro ao adicionar aluno:", error);
    }
  };

  const limparCampos = () => {
    setNome("");
    setNumeroChamada("");
  };

  const handleEditarAluno = (id) => {
    console.log("Editar aluno com ID:", id);
  };

  const handleExcluirAluno = (id) => {
    console.log("Excluir aluno com ID:", id);
  };

  return (
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
              label="Numero da Chamada"
              value={numeroChamada}
              onChange={(e) => setNumeroChamada(e.target.value)}
              variant="outlined"
              fullWidth
              style={styles.input}
            />
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
                    <TableCell>Nome</TableCell>
                    <TableCell>N° Da Chamada</TableCell>
                    <TableCell>Ação</TableCell>
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
                          onClick={() => handleEditarAluno(aluno.id)}
                        />
                        <DeleteIcon
                          color="primary"
                          onClick={() => handleExcluirAluno(aluno.id)}
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

export default GerenciarAlunos;

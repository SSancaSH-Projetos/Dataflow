import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
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

const GerenciarSAs = ({ navigation }) => {
  const [ucId, setUcId] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState("");
  const [ucs, setUcs] = useState([]);
  const [sas, setSas] = useState([]);

  const fetchUc = async () => {
    try {
      const response = await axios.get("http://localhost:8080/uc");
      setUcs(response.data);
    } catch (error) {
      console.error("Erro ao obter unidade curricular:", error);
    }
  };

  const fetchSa = async () => {
    try {
      const response = await axios.get("http://localhost:8080/sa");
      setSas(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao obter situação de aprendizagem:", error);
    }
  };

  const handleDeletarSA = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/sa/delete/${id}`);
      fetchSa(); // Corrected function name
    } catch (error) {
      console.error("Erro ao excluir sa:", error);
    }
 };


  useEffect(() => {
    fetchSa();
    fetchUc();
  }, []);

  const handleAddSas = async () => {
    try {
      const response = await axios.post("http://localhost:8080/sa", {
         // Passar IDs dos alunos selecionados
         titulo: titulo,
         descricao: descricao,
         tipo: tipo,
         ucId: ucId,
      });
      console.log(response.data);
      
      // Supondo que fetchSa() e limparCampos() estejam definidos e fazem sentido aqui
       fetchSa();
       limparCampos();
    } catch (error) {
      console.error("Erro ao adicionar sa:", error);
    }
};




  const limparCampos = () => {
    setUcId("");
    setTitulo("");
    setDescricao("");
    setTipo("");
  };

  const handleEditarTurma = (id) => {
    console.log("Editar turma com ID:", id);
  };

  const handleExcluirTurma = (id) => {
    
  };


  return (
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
              Adicionar Situação de Aprendizagem
            </Typography>

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

            <TextField
              label="Título"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              variant="outlined"
              fullWidth
              style={styles.input}
            />
            <TextField
              label="Descrição"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              variant="outlined"
              fullWidth
              style={styles.input}
            />

              <Select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              variant="outlined"
              fullWidth
              displayEmpty
              style={styles.input}
              renderValue={
                tipo !== "" ? undefined : () => <span style={{ color: "gray" }}>Tipo de SA</span>
              }
            >
              <MenuItem value="" disabled>
                Tipo de SA
              </MenuItem>
              <MenuItem value="Somativa">Somativa</MenuItem>
              <MenuItem value="Formativa">Formativa</MenuItem>
              <MenuItem value="Formativa">Formativa e Somativa</MenuItem>
            </Select>

            <Button
              variant="contained"
              color="primary"
              onClick={handleAddSas}
              style={styles.button}
            >
              Adicionar Situação de Aprendizagem 
            </Button>
          </View>
          <View style={styles.tableContainer}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Situação de Aprendizagem</TableCell>
                    <TableCell>UC</TableCell>
                    <TableCell>Ação</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sas.map((sa) => (
                    <TableRow key={sa.id}>
                      <TableCell>{sa.titulo}</TableCell>
                      <TableCell>{sa.uc.nomeUC || "não atribuído"}</TableCell>
                      <TableCell>
                        <EditIcon
                          color="primary"
                          onClick={() => handleEditarTurma(turma.id)}
                        />
                        <DeleteIcon
                          color="primary"
                          onClick={() => handleDeletarSA(sa.id)}
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GerenciarSAs;

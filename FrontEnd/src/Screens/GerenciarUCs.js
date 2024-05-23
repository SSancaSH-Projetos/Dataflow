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

const GerenciarUCs = ({ navigation }) => {
  const [nomeUC, setNomeUC] = useState (""); 
  const [sigla, setSigla] = useState("");
  const [cargaHoraria, setCargaHoraria] = useState("");
  const [modulo, setModulo] = useState("");
  const [conhecimentos, setConhecimentos] = useState("");
  const [ucs, setUcs] = useState([]);
  const [curso, setCursoId] = useState("");
  const [cursos, setCursos] = useState([]);




  const fetchUc = async () => {
    try {
      const response = await axios.get("http://localhost:8080/uc");
      setUcs(response.data);
    } catch (error) {
      console.error("Erro ao obter unidade curricular:", error);
    }
  };

  useEffect(() => {
    fetchUc();
    fetchCursos();

  }, []);

  const handleAddUc = async () => {
    try {
      const response = await axios.post("http://localhost:8080/uc", {
        nomeUC: nomeUC,
        sigla: sigla,
        cargaHoraria: cargaHoraria,
        modulo: modulo,
        conhecimentos: conhecimentos,

        
      });
      console.log(response.data);

      fetchUc();
      limparCampos();
    } catch (error) {
      console.error("Erro ao adicionar Unidade Curricular:", error);
    }
  };

  const handleDeletarUC = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/uc/delete/${id}`);
      fetchUc(); // Corrected function name
    } catch (error) {
      console.error("Erro ao excluir UC:", error);
    }
 };

 const fetchCursos = async () => {
  try {
    const response = await axios.get("http://localhost:8080/curso");
    setCursos(response.data);
  } catch (error) {
    console.error("Erro ao obter cursos:", error);
  }
};


  const limparCampos = () => {
    setNomeUC('');
    setSigla('');
    setCargaHoraria('');
    setModulo('');
    setConhecimentos('')
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
              Adicionar Unidade Curricular
            </Typography>


            <Select
                labelId="curso-select-label"
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



            <TextField
              label="Nome da Unidade Curricular"
              value={nomeUC}
              onChange={(e) => setNomeUC(e.target.value)}
              variant="outlined"
              fullWidth
              style={styles.input}
            />
            <TextField
              label="Sigla da Unidade Curricular"
              value={sigla}
              onChange={(e) => setSigla(e.target.value)}
              variant="outlined"
              fullWidth
              style={styles.input}
            />
            <TextField
              label="Carga Horária da UC"
              value={cargaHoraria}
              onChange={(e) => setCargaHoraria(e.target.value)}
              variant="outlined"
              fullWidth
              style={styles.input}
            />

            <TextField
              label="Módulo"
              value={modulo}
              onChange={(e) => setModulo(e.target.value)}
              variant="outlined"
              fullWidth
              style={styles.input}
            />

            <TextField
              label="Conhecimentos"
              value={conhecimentos}
              onChange={(e) => setConhecimentos(e.target.value)}
              variant="outlined"
              fullWidth
              style={styles.input}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddUc}
              style={styles.button}
            >
              Adicionar Unidade Curricular
            </Button>
          </View>
          <View style={styles.tableContainer}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Unidade Curricular</TableCell>
                    <TableCell>Ação</TableCell>
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ucs.map((uc) => (
                    <TableRow key={uc.id}>
                      <TableCell>{uc.sigla}</TableCell>
              
                      <TableCell>
                        <EditIcon
                          color="primary"
                          onClick={() => handleEditarCurso(curso.id)}
                        />
                        <DeleteIcon
                          color="primary"
                          onClick={() => handleDeletarUC(uc.id)}
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



export default GerenciarUCs;


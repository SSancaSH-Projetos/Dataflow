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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const GerenciarCriterios = ({ navigation }) => {
  const [descricao, setDescricao] = useState (""); 
  const [capacidade, setCapacidade] = useState([]);
  const [tipo, setTipo] = useState("");
  const [criterios, setCriterios] = useState([]);


  const fetchCriterios = async () => {
    try {
      const response = await axios.get("http://localhost:8080/criterio");
      setCriterios(response.data);
    } catch (error) {
      console.error("Erro ao obter criterios:", error);
    }
  };

  const fetchCapacidade = async () => {
    try {
      const response = await axios.get("http://localhost:8080/capacidade");
      setCapacidade(response.data);
    } catch (error) {
      console.error("Erro ao obter capacidade", error);
    }
  };

  useEffect(() => {
    fetchCriterios();
    fetchCapacidade();
  }, []);

  const handleAddCriterios = async () => {
    try {
      const response = await axios.post("http://localhost:8080/criterio", {
        descricao: descricao,
        tipo: tipo,
      });
      console.log(response.data);
      limparCampos();
      fetchCriterios();
    } catch (error) {
      console.error("Erro ao adicionar criterios:", error);
    }
  };

  const handleDeletarCriterio = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/criterio/delete/${id}`);
      fetchCriterios(); // Corrected function name
    } catch (error) {
      console.error("Erro ao excluir criterio:", error);
    }
 };

  const limparCampos = () => {
    setTipo('');
    setDescricao('');
  };
  

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
              Adicionar Criterio
            </Typography>

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
                tipo !== "" ? undefined : () => <span style={{ color: "gray" }}>Tipo de Criterio</span>
              }
            >
              <MenuItem value="" disabled>
                Tipo de Criterio
              </MenuItem>
              <MenuItem value="Somativa">Critico</MenuItem>
              <MenuItem value="Formativa">Desejável</MenuItem>
            </Select>
            

            <Button
              variant="contained"
              color="primary"
              onClick={handleAddCriterios}
              style={styles.button}
            >
              Adicionar Criterio
            </Button>
          </View>
          <View style={styles.tableContainer}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Descrição</TableCell>
                    <TableCell>Capacidade</TableCell>
                    <TableCell>Tipo</TableCell>
                    <TableCell>Ação</TableCell>
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                  {criterios.map((criterio) => (
                    <TableRow key={criterio.id}>
                      <TableCell>{criterio.descricao}</TableCell>
                      <TableCell>{criterio.tipo}</TableCell>
                      <TableCell>{criterio.capacidade}</TableCell>
                      
                      
                     
                    
                      <TableCell>
                        <EditIcon
                          color="primary"
                          onClick={() => handleEditarCurso(curso.id)}
                        />
                        <DeleteIcon
                          color="primary"
                          onClick={() => handleDeletarCriterio(criterio.id)}
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
});



export default GerenciarCriterios;

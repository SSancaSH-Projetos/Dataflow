import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
} from "@mui/material";
import axios from "axios";
import TemplateCrud from "../Components/TemplateCrud";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";


const GerenciarCriterios = ({ navigation }) => {
  const [descricao, setDescricao] = useState("");
  const [capacidades, setCapacidades] = useState([]);
  const [tipo, setTipo] = useState("");
  const [criterios, setCriterios] = useState([]);
  const [capId, setCapId] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editedCriterio, setEditedCriterio] = useState(null); // Alteração aqui

  const fetchCriterios = async () => {
    try {
      const response = await fetch("http://localhost:8080/criterio");
      if (!response.ok) {
        throw new Error("Erro ao obter critérios");
      }
      const data = await response.json();
      setCriterios(data);
    } catch (error) {
      console.error("Erro ao obter critérios:", error.message);
    }
  };
  const fetchCapacidades = async () => {
    try {
      const response = await fetch("http://localhost:8080/capacidade");
      if (!response.ok) {
        throw new Error("Erro ao obter capacidades");
      }
      const data = await response.json();
      setCapacidades(data);
    } catch (error) {
      console.error("Erro ao obter capacidades:", error.message);
    }
  };

  useEffect(() => {
    fetchCriterios();
    fetchCapacidades();
  }, []);
  
  const handleAddCriterios = async () => {
    try {
      const response = await axios.post("http://localhost:8080/criterio", {
        descricao: descricao,
        tipo: tipo,
        capId: capId,
      });
      console.log("chegou");
      console.log(response.data);
      limparCampos();
      await fetchCriterios();
    } catch (error) {
      console.error("Erro ao adicionar criterios:", error);
    }
  };

  const handleDeletarCriterio = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/criterio/delete/${id}`);
      await fetchCriterios();
    } catch (error) {
      console.error("Erro ao excluir criterio:", error);
    }
  };

  const limparCampos = () => {
    setTipo("");
    setDescricao("");
    setCapId("");
  };

  const handleEditarCriterio = (criterio) => {
    setEditedCriterio({
      id: criterio.id,
      descricao: criterio.descricao,
      tipo: criterio.tipo,
      capacidade: criterio.capacidade ? criterio.capacidade.id : "", // Garantindo que estamos armazenando o ID da capacidade
    });
    fetchCriterios()
    setModalOpen(true);
  };
  
  

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleConfirmarEdicao = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/criterio/update/${editedCriterio.id}`,
        {
          descricao: editedCriterio.descricao,
          tipo: editedCriterio.tipo,
          capId: editedCriterio.capacidade, // Envie o ID da capacidade selecionada
        }
      );
      console.log(response.data);
      // Atualize o critério no estado com os dados atualizados
      setCriterios(criterios.map((criterio) => (criterio.id === editedCriterio.id ? editedCriterio : criterio)));
      setModalOpen(false);
      setEditedCriterio(null);
      fetchCriterios();
    } catch (error) {
      console.error("Erro ao editar critério:", error);
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
                Adicionar Criterio
              </Typography>

              <Select
                labelId="capacidade-select-label"
                id="capacidade-select"
                value={capId}
                onChange={(e) => setCapId(e.target.value)}
                sx={{ marginBottom: "20px" }}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Selecionar Capacidade
                </MenuItem>
                {capacidades.map((capacidade) => (
                  <MenuItem key={capacidade.id} value={capacidade.id}>
                    {capacidade.descricao}
                  </MenuItem>
                ))}
              </Select>

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
                renderValue={(selected) => {
                  if (selected === "") {
                    return (
                      <span style={{ color: "gray" }}>Tipo de Criterio</span>
                    );
                  } else {
                    return selected;
                  }
                }}
              >
                <MenuItem value="" disabled>
                  Tipo de Criterio
                </MenuItem>
                <MenuItem value="Crítico">Crítico</MenuItem>
                <MenuItem value="Desejável">Desejável</MenuItem>
              </Select>

              <Button
                variant="contained"
                color="primary"
                onClick={handleAddCriterios}
                style={styles.button}
              >
                Adicionar Critério
              </Button>
            </View>
            <View style={styles.tableContainer}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Critério</TableCell>
                      <TableCell>Tipo</TableCell>
                      <TableCell>Capacidade</TableCell>
                      <TableCell>Ação</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {criterios.map((criterio) => (
                      <TableRow key={criterio.id}>
                        <TableCell>{criterio.descricao}</TableCell>
                        <TableCell>{criterio.tipo}</TableCell>
                        <TableCell>
                          {criterio.capacidade.descricao}
                           
                        </TableCell>
                        <TableCell>
                          <EditIcon
                            color="primary"
                            onClick={() => handleEditarCriterio(criterio)}
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
        <Dialog open={modalOpen} onClose={handleCloseModal}>
          <DialogTitle>Editar Critério
          </DialogTitle>
          <DialogContent>
            {editedCriterio && ( // Verificação adicionada
              <>
                <TextField
                  label="Descrição"
                  value={editedCriterio.descricao}
                  onChange={(e) =>
                    setEditedCriterio({
                      ...editedCriterio,
                      descricao: e.target.value,
                    })
                  }
                  fullWidth
                  variant="outlined"
                  style={styles.input}
                />

                <Select
                  label="Capacidade"
                  value={editedCriterio.capacidade}
                  onChange={(e) =>
                    setEditedCriterio({
                      ...editedCriterio,
                      capacidade: e.target.value,
                    })
                  }
                  fullWidth
                  variant="outlined"
                  style={styles.input}
                >
                  <MenuItem value="" disabled>
                    Selecionar Capacidade
                  </MenuItem>
                  {capacidades.map((capacidade) => (
                    <MenuItem key={capacidade.id} value={capacidade.id}>
                      {capacidade.descricao}
                    </MenuItem>
                  ))}
                </Select>

                <Select
                  labelId="tipo-select-label"
                  id="tipo-select"
                  value={editedCriterio.tipo}
                  onChange={(e) =>
                    setEditedCriterio({
                      ...editedCriterio,
                      tipo: e.target.value,
                    })
                  }
                  displayEmpty
                  fullWidth
                  style={styles.input}
                  inputProps={{ style: { color: "black" } }}
                >
                  <MenuItem value="" disabled>
                    Tipo de Critério
                  </MenuItem>
                  <MenuItem value="Crítico">Crítico</MenuItem>
                  <MenuItem value="Desejável">Desejável</MenuItem>
                </Select>
              </>
            )}
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
    color: "black",
  },
  button: {
    marginTop: 10,
  },
});

export default GerenciarCriterios;

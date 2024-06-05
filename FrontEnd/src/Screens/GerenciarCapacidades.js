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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import axios from "axios";
import TemplateCrud from "../Components/TemplateCrud";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const GerenciarCapacidades = ({ navigation }) => {
  const [descricao, setDescricao] = useState (""); 
  const [ucId, setUcId] = useState([]);
  const [tipo, setTipo] = useState("");
  const [capacidades, setCapacidades] = useState([]);
  const [ucs, setUcs] = useState([]);
  const [editCapacidade, setEditCapacidade] = useState(null);
  const [editedCapacidade, setEditedCapacidade] = useState(null);
  const [modalOpen, setModalOpen] = useState(false); // Estado para controlar o modal
  const [mensagemAviso, setMensagemAviso] = useState("");

  const fetchCapacidade = async () => {
    try {
      const response = await axios.get("http://localhost:8080/capacidade");
      setCapacidades(response.data);
    } catch (error) {
      console.error("Erro ao obter capacidade", error);
    }
  };

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
    fetchCapacidade();
  }, []);

  const handleAddCapacidade = async () => {
    if (!descricao || !ucId || !tipo) {
      setMensagemAviso("Por favor, preencha todos os campos.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8080/capacidade", {
        descricao: descricao,
        tipo: tipo,
        ucId:ucId,
      });
      console.log(response.data);
      limparCampos();
      fetchCapacidade();

    } catch (error) {
      console.error("Erro ao adicionar capacidade:", error);
    }
  };

  const handleDeletarCapacidade = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/capacidade/delete/${id}`);
      fetchCapacidade(); // Corrected function name
    } catch (error) {
      console.error("Erro ao excluir capacidade:", error);
    }
 };

  const limparCampos = () => {
    setTipo('');
    setDescricao('');
  };

  const handleEditarCapacidade = (capacidade) => {
    setEditCapacidade(capacidade);
    setEditedCapacidade(capacidade);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleConfirmarEdicao = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/capacidade/update/${editedCapacidade.id}`,
        {
          descricao: editedCapacidade.descricao,
          tipo: editedCapacidade.tipo,
          ucId: editedCapacidade.ucId,
        }
      );
      console.log(response.data);
      fetchCapacidade();
      setModalOpen(false);
      limparCampos();
    } catch (error) {
      console.error("Erro ao editar capacidade:", error);
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
                Adicionar Capacidade
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
                  Selecionar Unidade Curricular
                </MenuItem>
                {ucs.map((uc) => (
                  <MenuItem key={uc.id} value={uc.id}>
                    {uc.sigla}
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
                renderValue={
                  tipo !== "" ? undefined : () => <span style={{ color: "gray" }}>Tipo de Capacidade</span>
                }
              >
                <MenuItem value="" disabled>
                  Tipo de Capacidades
                </MenuItem>
                <MenuItem value="Técnica">Técnica</MenuItem>
                <MenuItem value="Socioemocional">Socioemocional</MenuItem>
              </Select>

              {mensagemAviso && (
                <Typography color="error" style={styles.mensagemAviso}>
                  {mensagemAviso}
                </Typography>
              )}

              <Button
                variant="contained"
                color="primary"
                onClick={handleAddCapacidade}
                style={styles.button}
              >
                Adicionar Capacidade
              </Button>
            </View>
            <View style={styles.tableContainer}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><b>Capacidade</b></TableCell>
                      <TableCell> <b>Tipo</b></TableCell>
                      <TableCell> <b>Unidade Curricular</b></TableCell>
                      <TableCell><b> Ação </b> </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {capacidades.map((capacidade) => (
                      <TableRow key={capacidade.id}>
                        <TableCell>{capacidade.descricao}</TableCell>
                        <TableCell>{capacidade.tipo}</TableCell>
                        <TableCell>{capacidade.uc.nomeUC || "não atribuído"}</TableCell>
                        <TableCell>
                          <EditIcon
                            color="primary"
                            onClick={() => handleEditarCapacidade(capacidade)}
                          />
                          <DeleteIcon
                            color="primary"
                            onClick={() => handleDeletarCapacidade(capacidade.id)}
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
          <DialogTitle>Editar Capacidade</DialogTitle>
          <DialogContent>
            <TextField
              label="Descrição"
              value={editedCapacidade ? editedCapacidade.descricao : ""}
              onChange={(e) =>
                setEditedCapacidade({ ...editedCapacidade, descricao: e.target.value })
              }
              fullWidth
              variant="outlined"
              style={styles.input}
            />
            <Select
              value={editedCapacidade ? editedCapacidade.tipo : ""}
              onChange={(e) =>
                setEditedCapacidade({ ...editedCapacidade, tipo: e.target.value })
              }
              variant="outlined"
              fullWidth
              displayEmpty
              style={styles.input}
              renderValue={
                editedCapacidade?.tipo ? undefined : () => <span style={{ color: "gray" }}>Tipo de Capacidade</span>
              }
            >
              <MenuItem value="" disabled>
                Tipo de Capacidades
              </MenuItem>
              <MenuItem value="Técnica">Técnica</MenuItem>
              <MenuItem value="Socioemocional">Socioemocional</MenuItem>
            </Select>
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
  },
  button: {
    marginTop: 10,
  },
  mensagemAviso: {
    marginBottom: 10
  }
});

export default GerenciarCapacidades;
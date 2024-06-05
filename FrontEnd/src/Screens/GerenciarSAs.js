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

const GerenciarSAs = ({ navigation }) => {
  const [ucId, setUcId] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState("");
  const [ucs, setUcs] = useState([]);
  const [sas, setSas] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editedSa, setEditedSa] = useState(null);
  const [mensagemAviso, setMensagemAviso] = useState("");

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

  useEffect(() => {
    fetchSa();
    fetchUc();
  }, []);

  const handleAddSas = async () => {
    if (!ucId || !titulo || !descricao || !tipo) {
      setMensagemAviso("Por favor, preencha todos os campos.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8080/sa", {
        titulo: titulo,
        descricao: descricao,
        tipo: tipo,
        ucId: ucId,
      });
      console.log(response.data);
      fetchSa();
      limparCampos();
    } catch (error) {
      console.error("Erro ao adicionar sa:", error);
    }
  };
  

  const handleDeletarSA = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/sa/delete/${id}`);
      fetchSa();
    } catch (error) {
      console.error("Erro ao excluir sa:", error);
    }
  };

  const limparCampos = () => {
    setUcId("");
    setTitulo("");
    setDescricao("");
    setTipo("");
  };

  const handleEditarSa = (sa) => {
    setEditedSa(sa);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleConfirmarEdicao = async () => {
    if (!editedSa || !editedSa.uc) {
      console.error("Dados incompletos para edição");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/sa/update/${editedSa.id}`,
        {
          titulo: editedSa.titulo,
          descricao: editedSa.descricao,
          tipo: editedSa.tipo,
          ucId: editedSa.uc.id,
        }
      );
      console.log(response.data);
      fetchSa();
      setModalOpen(false);
      limparCampos();
    } catch (error) {
      console.error("Erro ao editar sa:", error);
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
                  Selecionar Unidade Curricular
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
                renderValue={(selected) => {
                  if (selected === "") {
                    return <span style={{ color: "gray" }}>Tipo de Situação de Aprendizagem</span>;
                  } else {
                    return selected;
                  }
                }}
              >
                <MenuItem value="" disabled>
                  Tipo de SA
                </MenuItem>
                <MenuItem value="Somativa">Somativa</MenuItem>
                <MenuItem value="Formativa">Formativa</MenuItem>
                <MenuItem value="Formativa e Somativa">
                  Formativa e Somativa
                </MenuItem>
              </Select>

              {mensagemAviso && (
                <Typography color="error" style={styles.mensagemAviso}>
                  {mensagemAviso}
                </Typography>
              )}

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
                      <TableCell><b>Situação de Aprendizagem</b></TableCell>
                      <TableCell><b>Tipo</b></TableCell>
                      <TableCell><b>Unidade Curricular</b></TableCell>
                      <TableCell><b>Ação</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sas.map((sa) => (
                      <TableRow key={sa.id}>
                        <TableCell>{sa.titulo}</TableCell>
                        <TableCell>{sa.tipo}</TableCell>
                        <TableCell>{sa.uc?.nomeUC || "não atribuído"}</TableCell>
                        <TableCell>
                          <EditIcon
                            color="primary"
                            onClick={() => handleEditarSa(sa)}
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
        <Dialog open={modalOpen} onClose={handleCloseModal}>
          <DialogTitle>Editar Situação de Aprendizagem</DialogTitle>
          <DialogContent>
            <TextField
              label="Título"
              value={editedSa ? editedSa.titulo : ""}
              onChange={(e) =>
                setEditedSa({
                  ...editedSa,
                  titulo: e.target.value,
                })
              }
              fullWidth
            />
            <TextField
              label="Descrição"
              value={editedSa ? editedSa.descricao : ""}
              onChange={(e) =>
                setEditedSa({
                  ...editedSa,
                  descricao: e.target.value,
                })
              }
              fullWidth
              margin="normal"
            />
            <Select
              labelId="uc-select-label"
              value={editedSa?.uc?.id || ""}
              onChange={(e) =>
                setEditedSa({
                  ...editedSa,
                  uc: { id: e.target.value },
                })
              }
              fullWidth
              margin="normal"
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
            <Select
              labelId="tipo-select-label"
              value={editedSa?.tipo || ""}
              onChange={(e) =>
                setEditedSa({
                  ...editedSa,
                  tipo: e.target.value,
                })
              }
              fullWidth
              margin="normal"
              displayEmpty
              renderValue={(selected) => {
                if (selected === "") {
                  return <span style={{ color: "gray" }}>Tipo de Situação de Aprendizagem</span>;
                } else {
                  return selected;
                }
              }}
            >
              <MenuItem value="" disabled>
                Tipo de SA
              </MenuItem>
              <MenuItem value="Somativa">Somativa</MenuItem>
              <MenuItem value="Formativa">Formativa</MenuItem>
              <MenuItem value="Formativa e Somativa">
                Formativa e Somativa
              </MenuItem>
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">
              Cancelar
            </Button>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mensagemAviso: {
    marginBottom: 10
  }
});

export default GerenciarSAs;
import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import TemplateCrud from "../Components/TemplateCrud";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const GerenciarUCs = ({ navigation }) => {
  const [nomeUC, setNomeUC] = useState("");
  const [sigla, setSigla] = useState("");
  const [cargaHoraria, setCargaHoraria] = useState("");
  const [modulo, setModulo] = useState("");
  const [conhecimentos, setConhecimentos] = useState("");
  const [ucs, setUcs] = useState([]);
  const [curso, setCurso] = useState("");
  const [cursos, setCursos] = useState([]);
  const [editedUC, setEditedUC] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleEditarUC = (uc) => {
    setEditedUC(uc);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditedUC(null);
  };

  const handleConfirmarEdicao = async () => {
    try {
      await axios.put(`http://localhost:8080/uc/update/${editedUC.id}`, {
        nomeUC: editedUC.nomeUC,
        sigla: editedUC.sigla,
        cargaHoraria: editedUC.cargaHoraria,
        modulo: editedUC.modulo,
        conhecimentos: editedUC.conhecimentos,
        curso: editedUC.curso.id, // Supondo que curso seja um objeto com id
      });
      setUcs(ucs.map((uc) => (uc.id === editedUC.id ? editedUC : uc)));
      setModalOpen(false);
      setEditedUC(null);
    } catch (error) {
      console.error("Erro ao editar Unidade Curricular:", error);
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
    fetchCursos();
  }, []);

  const handleAddUc = async () => {
    try {
      const response = await axios.post("http://localhost:8080/uc", {
        curso: curso,
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
      fetchUc();
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
    setNomeUC("");
    setSigla("");
    setCargaHoraria("");
    setModulo("");
    setConhecimentos("");
  };

  return (
    <ScrollView>
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
                Adicionar Unidade Curricular
              </Typography>

              <Select
                labelId="curso-select-label"
                id="curso-select"
                value={curso}
                onChange={(e) => setCurso(e.target.value)}
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
                      <TableCell>Curso</TableCell>
                      <TableCell>Ação</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {ucs.map((uc) => (
                      <TableRow key={uc.id}>
                        <TableCell>{uc.sigla}</TableCell>
                        <TableCell>{uc.curso.nome}</TableCell> {/* Render the course name */}
                        <TableCell>
                          <EditIcon
                            color="primary"
                            onClick={() => handleEditarUC(uc)}
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

      {/* Modal */}
      <ScrollView>
        <Dialog open={modalOpen} onClose={handleCloseModal}>
          <DialogTitle>Editar Unidade Curricular</DialogTitle>
          <DialogContent>
            <Select
              labelId="curso-select-label"
              id="curso-select"
              value={editedUC ? editedUC.curso.id : ""}
              onChange={(e) =>
                setEditedUC({ ...editedUC, curso: cursos.find(curso => curso.id === e.target.value) })
              }
              sx={{ marginBottom: "20px" }}
              displayEmpty
              fullWidth
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
              value={editedUC ? editedUC.nomeUC : ""}
              onChange={(e) =>
                setEditedUC({ ...editedUC, nomeUC: e.target.value })
              }
              variant="outlined"
              fullWidth
              style={styles.input}
            />
            <TextField
              label="Sigla"
              value={editedUC ? editedUC.sigla : ""}
              onChange={(e) =>
                setEditedUC({ ...editedUC, sigla: e.target.value })
              }
              variant="outlined"
              fullWidth
              style={styles.input}
            />
            <TextField
              label="Carga Horária"
              value={editedUC ? editedUC.cargaHoraria : ""}
              onChange={(e) =>
                setEditedUC({ ...editedUC, cargaHoraria: e.target.value })
              }
              variant="outlined"
              fullWidth
              style={styles.input}
            />
            <TextField
              label="Módulo"
              value={editedUC ? editedUC.modulo : ""}
              onChange={(e) =>
                setEditedUC({ ...editedUC, modulo: e.target.value })
              }
              variant="outlined"
              fullWidth
              style={styles.input}
            />
            <TextField
              label="Conhecimentos"
              value={editedUC ? editedUC.conhecimentos : ""}
              onChange={(e) =>
                setEditedUC({ ...editedUC, conhecimentos: e.target.value })
              }
              variant="outlined"
              fullWidth
              style={styles.input}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal}>Cancelar</Button>
            <Button onClick={handleConfirmarEdicao} color="primary">
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
      </ScrollView>
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

export default GerenciarUCs;

import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
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
import VisibilityIcon from "@mui/icons-material/Visibility";
import ListaDeTransferencia from "../Components/ListaDeTransferencia";

const GerenciarTurmas = ({ navigation }) => {
  const [nome, setNome] = useState("");
  const [cursoId, setCursoId] = useState("");
  const [sigla, setSigla] = useState("");
  const [cursos, setCursos] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [numeroChamada, setNumeroChamada] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [alunosSelecionados, setAlunosSelecionados] = useState([]);
  const [editedTurma, setEditedTurma] = useState({
    id: "",
    curso: "",
    sigla: "",
    alunosNaTurma: [],
  });
  const [cursoNome, setCursoNome] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [mensagemAviso, setMensagemAviso] = useState("");
  const [alunosTurma, setAlunosTurma] = useState([]);
  const [alunosSemTurma, setAlunosSemTurma] = useState([]);
  const [alunosModalOpen, setAlunosModalOpen] = useState(false);
  const [modalAddAlunoOpen, setModalAddAlunoOpen] = useState(false);
  const [turmaSelecionadaId, setTurmaSelecionadaId] = useState("");

  const fetchCursos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/curso");
      setCursos(response.data);
    } catch (error) {
      console.error("Erro ao obter cursos:", error);
    }
  };

  const fetchAlunosSemTurma = async () => {
    try {
      const response = await axios.get("http://localhost:8080/aluno/sem-turma");
      setAlunosSemTurma(response.data);
    } catch (error) {
      console.error("Erro ao obter alunos sem turma:", error);
    }
  };

  const handleModalAddAlunoOpen = () => {
    setModalAddAlunoOpen(true);
  };

  const handleModalAddAlunoClose = () => {
    setModalAddAlunoOpen(false);
  };

  const fetchTurmas = async () => {
    try {
      const response = await axios.get("http://localhost:8080/turma");
      setTurmas(response.data);
    } catch (error) {
      console.error("Erro ao obter turmas:", error);
    }
  };

  const fetchAlunos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/aluno");
      setAlunos(response.data);
    } catch (error) {
      console.error("Erro ao obter alunos:", error);
    }
  };

  const handleDeletarTurma = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/turma/delete/${id}`);
      fetchTurmas();
    } catch (error) {
      console.error("Erro ao excluir turma:", error);
    }
  };

  useEffect(() => {
    fetchAlunosSemTurma();
    fetchAlunos();
    const fetchData = async () => {
      setIsLoading(true);
      await Promise.all([fetchCursos(), fetchTurmas()]);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleAddTurma = async () => {
    if (!cursoId || !sigla) {
      setMensagemAviso("Por favor, preencha todos os campos.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8080/turma", {
        curso: cursoId,
        sigla: sigla,
        alunosNaTurma: alunosSelecionados.map((aluno) => aluno.id),
      });
      console.log(response.data);
      limparCampos();
      fetchTurmas();
      setMensagemAviso("");
    } catch (error) {
      console.error("Erro ao adicionar turma:", error);
    }
  };

  const handleAlunosSelecionadosChange = (selectedAlunos) => {
    setAlunosSelecionados(selectedAlunos);
    console.log(selectedAlunos);
  };

  const limparCampos = () => {
    setCursoId("");
    setSigla("");
    setNome("");
    setNumeroChamada("");
  };

  const handleDeletarAluno = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/aluno/delete/${id}`);
      fetchTurmas(); // Atualize a lista de turmas após deletar um aluno
  
      // Atualize a lista de alunos na turma selecionada
      const updatedAlunosTurma = alunosTurma.filter(aluno => aluno.id !== id);
      setAlunosTurma(updatedAlunosTurma);
    } catch (error) {
      console.error("Erro ao excluir aluno:", error);
    }
  };

  const handleEditarTurma = (turma) => {
    const curso = cursos.find((curso) => curso.id === turma.curso.id);
    setEditedTurma({
      id: turma.id,
      curso: turma.curso.id,
      sigla: turma.sigla,
      alunosNaTurma: turma.alunosNaTurma || [],
    });
    setCursoNome(curso ? curso.nome : "");
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleConfirmarEdicao = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/turma/update/${editedTurma.id}`,
        {
          curso: editedTurma.curso,
          sigla: editedTurma.sigla,
          alunosNaTurma: editedTurma.alunosNaTurma.map((aluno) => aluno.id),
        }
      );
      console.log(response.data);
      fetchTurmas();
      setModalOpen(false);
      limparCampos();
    } catch (error) {
      console.error("Erro ao editar turma:", error);
    }
  };

  const handleAddAluno = async () => {
    if (!nome || !numeroChamada || !turmaSelecionadaId) {
      setMensagemAviso("Por favor, preencha todos os campos e selecione uma turma.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8080/aluno", {
        nome: nome,
        numeroChamada: numeroChamada,
        turma: turmaSelecionadaId,
      });
      console.log(response.data);
      limparCampos();
      fetchTurmas(); // Atualize a lista de turmas após adicionar um aluno
  
      // Atualize a lista de alunos na turma selecionada
      const updatedAlunosTurma = [...alunosTurma, response.data];
      setAlunosTurma(updatedAlunosTurma);
  
      // Atualize a lista de alunos sem turma
      fetchAlunosSemTurma();
      
      setMensagemAviso("");
      handleModalAddAlunoClose();
    } catch (error) {
      console.error("Erro ao adicionar aluno:", error);
    }
  };
  

  const handleExibirAlunosTurma = (turmaId) => {
    const turma = turmas.find((turma) => turma.id === turmaId);
    if (turma) {
      setAlunosTurma(turma.alunosNaTurma);
    }
    setTurmaSelecionadaId(turmaId);
    setAlunosModalOpen(true);
  };

  const handleCloseAlunosModal = () => {
    setAlunosModalOpen(false);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

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
                onClick={handleAddTurma}
                style={styles.title}
              >
                Adicionar Turmas
              </Typography>

              <Select
                labelId="curso-select-label"
                id="curso-select"
                value={cursoId}
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
                label="Sigla"
                value={sigla}
                onChange={(e) => setSigla(e.target.value)}
                variant="outlined"
                fullWidth
                style={styles.input}
              />
              <ListaDeTransferencia
                alunos={alunosSemTurma}
                onSelectionChange={handleAlunosSelecionadosChange}
              />
              {mensagemAviso && (
                <Typography color="error" style={styles.mensagemAviso}>
                  {mensagemAviso}
                </Typography>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddTurma}
                style={styles.button}
              >
                Adicionar Turma
              </Button>
            </View>
            <View style={styles.tableContainer}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Turma</TableCell>
                      <TableCell>Curso</TableCell>
                      <TableCell>Ação</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {turmas.map((turma) => (
                      <TableRow key={turma.id}>
                        <TableCell>
                          {typeof turma.sigla === "string" ? turma.sigla : ""}
                        </TableCell>
                        <TableCell>
                          {typeof turma.curso.nome === "string"
                            ? turma.curso.nome
                            : "não atribuído"}
                        </TableCell>
                        <TableCell>
                          <EditIcon
                            color="primary"
                            onClick={() => handleEditarTurma(turma)}
                          />
                          <DeleteIcon
                            color="primary"
                            onClick={() => handleDeletarTurma(turma.id)}
                          />
                          <VisibilityIcon
                            color="primary"
                            onClick={() => handleExibirAlunosTurma(turma.id)}
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
          <DialogTitle>Editar Turma</DialogTitle>
          <DialogContent>
            <TextField
              label="Sigla"
              value={editedTurma.sigla}
              onChange={(e) =>
                setEditedTurma({ ...editedTurma, sigla: e.target.value })
              }
              fullWidth
              variant="outlined"
              style={styles.input}
            />
            <Select
              labelId="curso-select-label"
              id="curso-select"
              value={editedTurma.curso}
              onChange={(e) =>
                setEditedTurma({ ...editedTurma, curso: e.target.value })
              }
              displayEmpty
              fullWidth
              style={styles.input}
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
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal}>Cancelar</Button>
            <Button onClick={handleConfirmarEdicao} color="primary">
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={alunosModalOpen} onClose={handleCloseAlunosModal}>
          <DialogTitle>Alunos na Turma</DialogTitle>
          <DialogContent>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Nome</TableCell>
                    <TableCell align="center">Número de Chamada</TableCell>
                    <TableCell align="center">Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {alunosTurma.map((aluno) => (
                    <TableRow key={aluno.id}>
                      <TableCell align="center">{aluno.nome}</TableCell>
                      <TableCell align="center">{aluno.numeroChamada}</TableCell>
                      <TableCell align="center">
                        <Button
                          style={styles.deleteButton}
                          onClick={() => handleDeletarAluno(aluno.id)}
                          startIcon={<DeleteIcon />}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <Dialog open={modalAddAlunoOpen} onClose={handleModalAddAlunoClose}>
            <DialogTitle>Adicionar Aluno</DialogTitle>
            <DialogContent>
              <TextField
                label="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                variant="outlined"
                fullWidth
                style={styles.input}
              />
              <TextField
                label="Número da Chamada"
                value={numeroChamada}
                onChange={(e) => setNumeroChamada(e.target.value)}
                variant="outlined"
                fullWidth
                style={styles.input}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleModalAddAlunoClose}>Cancelar</Button>
              <Button onClick={handleAddAluno} color="primary">
                Adicionar
              </Button>
            </DialogActions>
          </Dialog>
          <DialogActions>
            <Button onClick={handleModalAddAlunoOpen} color="primary">
              Adicionar Aluno
            </Button>
            <Button onClick={handleCloseAlunosModal}>Fechar</Button>
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
    marginBottom: 20,
  },
});

export default GerenciarTurmas;

import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Typography, MenuItem, Select, Button, Grid } from "@mui/material";
import axios from "axios";
import TemplateCrud from "../Components/TemplateCrud";
import GenericModal from '../Components/Modal';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CropSquareIcon from '@mui/icons-material/CropSquare';

const GerenciarRelatorios = ({ navigation }) => {
  const [curso, setCursoId] = useState("");
  const [cursos, setCursos] = useState([]);
  const [turmaId, setTurmaId] = useState("");
  const [turmaPorCurso, setTurmaPorCurso] = useState([]);
  const [ucId, setUcId] = useState("");
  const [uCsPorCurso, setUCsPorCurso] = useState([]);
  const [saId, setSaId] = useState("");
  const [saPorUC, setSaPorUc] = useState([]);
  const [alunosPorTurma, setAlunosPorTurma] = useState([]);
  const [alunoId, setAlunoId] = useState("");
  const [alunoNome, setAlunoNome] = useState("");
  const [sigla, setSigla] = useState("");
  const [saTitulo, setSaTitulo] = useState("");
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '', actions: null });

  const fetchCursos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/curso");
      setCursos(response.data);
    } catch (error) {
      console.error("Erro ao obter cursos:", error);
    }
  };

  const fetchCursosPorTurma = async (cursoId) => {
    try {
      const response = await axios.get(`http://localhost:8080/curso/pesquisaDeTurmaPorIdDoCurso/${cursoId}`);
      setTurmaPorCurso(response.data);
    } catch (error) {
      console.error("Erro ao obter cursos por TURMAS:", error);
    }
  };

  const fetchUnidadesCurricularesPorCurso = async (cursoId) => {
    try {
      const response = await axios.get(`http://localhost:8080/curso/pesquisarUcporCurso/${cursoId}`);
      setUCsPorCurso(response.data);
    } catch (error) {
      console.error("Erro ao obter UCS por CURSOS:", error);
    }
  };

  const fetchSituacaoDeAprendizagemPorUnidadeCurricular = async (ucId) => {
    try {
      const response = await axios.get(`http://localhost:8080/uc/pesquisaSaporUC/${ucId}`);
      setSaPorUc(response.data);
    } catch (error) {
      console.error("Erro ao obter sa por uc:", error);
    }
  };

  const fetchAlunosPorTurma = async (turmaId) => {
    try {
      const response = await axios.get(`http://localhost:8080/turma/buscarAlunosDaTurma/${turmaId}`);
      setAlunosPorTurma(response.data);
    } catch (error) {
      console.error("Erro ao obter alunos por turma:", error);
    }
  };

  const fetchAlunoNome = async (alunoId) => {
    try {
      const response = await axios.get(`http://localhost:8080/aluno/pesquisaId/${alunoId}`);
      setAlunoNome(response.data.nome);
    } catch (error) {
      console.error("Erro ao obter nome do aluno:", error);
    }
  };

  const fetchUcNome = async (ucId) => {
    try {
      const response = await axios.get(`http://localhost:8080/uc/pesquisaId/${ucId}`);
      setSigla(response.data.sigla);
    } catch (error) {
      console.error("Erro ao obter nome da UC:", error);
    }
  };

  const fetchSaTitulo = async (saId) => {
    try {
      const response = await axios.get(`http://localhost:8080/sa/pesquisaId/${saId}`);
      setSaTitulo(response.data.titulo);
    } catch (error) {
      console.error("Erro ao obter descrição da SA:", error);
    }
  };

  useEffect(() => {
    fetchCursos();
    fetchCursosPorTurma();
    fetchUnidadesCurricularesPorCurso();
    fetchSituacaoDeAprendizagemPorUnidadeCurricular();
    fetchAlunosPorTurma();
  }, []);

  return (
    <ScrollView>
      <TemplateCrud>
        <GenericModal
          open={openModal}
          handleClose={() => setOpenModal(false)}
          title={modalContent.title}
          message={modalContent.message}
          actions={modalContent.actions}
        />
        <View style={styles.mainContainer}>
          <View style={styles.contentContainer}>
            <View style={styles.formContainer}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                style={styles.title}
              >
                Gerenciar Relatórios
              </Typography>

              <Select
                labelId="curso-select-label"
                id="curso-select"
                value={curso}
                onChange={(e) => {
                  setCursoId(e.target.value);
                  fetchCursosPorTurma(e.target.value);
                  fetchUnidadesCurricularesPorCurso(e.target.value);
                }}
                sx={{ marginBottom: "20px" }}
                displayEmpty
                style={styles.inputSelect}
                disabled={disabled}
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

              <Select
                labelId="turma-select-label"
                id="turma-select"
                value={turmaId}
                onChange={(e) => {
                  setTurmaId(e.target.value);
                  fetchAlunosPorTurma(e.target.value);
                }}
                sx={{ marginBottom: "20px" }}
                displayEmpty
                style={styles.inputSelect}
                disabled={disabled}
              >
                <MenuItem value="" disabled>
                  Selecionar Turma
                </MenuItem>
                {turmaPorCurso.map((turma) => (
                  <MenuItem key={turma.id} value={turma.id}>
                    {turma.sigla}
                  </MenuItem>
                ))}
              </Select>

              <Select
                labelId="aluno-select-label"
                id="aluno-select"
                value={alunoId}
                onChange={(e) => {
                  setAlunoId(e.target.value);
                  fetchAlunoNome(e.target.value);
                }}
                sx={{ marginBottom: "20px" }}
                displayEmpty
                style={styles.inputSelect}
                disabled={disabled}
              >
                <MenuItem value="" disabled>
                  Selecionar Aluno
                </MenuItem>
                {alunosPorTurma.map((aluno) => (
                  <MenuItem key={aluno.id} value={aluno.id}>
                    {aluno.nome}
                  </MenuItem>
                ))}
              </Select>

              <Select
                labelId="uc-select-label"
                id="uc-select"
                value={ucId}
                onChange={(e) => {
                  setUcId(e.target.value);
                  fetchSituacaoDeAprendizagemPorUnidadeCurricular(e.target.value);
                  fetchUcNome(e.target.value);
                }}
                sx={{ marginBottom: "20px" }}
                displayEmpty
                style={styles.inputSelect}
                disabled={disabled}
              >
                <MenuItem value="" disabled>
                  Selecionar UC
                </MenuItem>
                {uCsPorCurso.map((uc) => (
                  <MenuItem key={uc.id} value={uc.id}>
                    {uc.sigla}
                  </MenuItem>
                ))}
              </Select>

              <Select
                labelId="sa-select-label"
                id="sa-select"
                value={saId}
                onChange={(e) => {
                  setSaId(e.target.value);
                  fetchSaTitulo(e.target.value);
                }}
                sx={{ marginBottom: "20px" }}
                displayEmpty
                style={styles.inputSelect}
                disabled={disabled}
              >
                <MenuItem value="" disabled>
                  Selecionar SA
                </MenuItem>
                {saPorUC.map((sa) => (
                  <MenuItem key={sa.id} value={sa.id}>
                    {sa.titulo}
                  </MenuItem>
                ))}
              </Select>

              <Button
                variant="contained"
                color="primary"
                onClick={() => setTabelaVisivel(true)}
                style={styles.button}
                disabled={disabled}
              >
                Gerar Relatório
              </Button>

              {disabled && (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => setDisabled(false)}
                  style={styles.button}
                >
                  Cancelar
                </Button>
              )}
            </View>
            <View style={styles.tableContainer}>
              <Card style={{ marginBottom: 20 }}>
                <CardContent>
                <Typography variant="h5" component="div">
                  Informações Adicionais
                </Typography>
                {alunoNome && (
                  <Typography variant="body2" color="textPrimary">
                    <strong>Nome do Aluno:</strong> {alunoNome}
                  </Typography>
                )}

                {sigla && (
                  <Typography variant="body2" color="textPrimary">
                    <strong>Nome da UC:</strong> {sigla}
                  </Typography>
                )}
                {saTitulo && (
                  <Typography variant="body2" color="textPrimary">
                    <strong>Titulo da SA:</strong> {saTitulo}
                  </Typography>
                )}
                </CardContent>
              </Card>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">Critérios Críticos</Typography>
                      <Typography> Total: </Typography>
                      <Typography> Atendidos: </Typography>
                      <Typography> Não atendidos: </Typography>
                      <Typography> Não avaliados: </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">Critérios Desejáveis</Typography>
                      <Typography> Total: </Typography>
                      <Typography> Atendidos: </Typography>
                      <Typography> Não atendidos: </Typography>
                      <Typography> Não avaliados: </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              <Card style={{ marginTop: 20, marginBottom: 20 }}>
                <CardContent>
                  <Typography variant="h6">Critérios Crí­tico </Typography>
                  Colocar os critérios aqui
                </CardContent>
              </Card>

              <Card style={{ marginBottom: 20 }}>
                <CardContent>
                  <Typography variant="h6"> Critérios Desejável </Typography>
                  colocar os critérios aqui
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleIcon />
                      </ListItemIcon>
                      <ListItemText primary="CritÃ©rio A atingido" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CancelIcon />
                      </ListItemIcon>
                      <ListItemText primary="CritÃ©rio B nÃ£o atingido" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CropSquareIcon />
                      </ListItemIcon>
                      <ListItemText primary="CritÃ©rio C nÃ£o avaliado" />
                    </ListItem>
                  </List> 

                  <Typography variant="body2">
          <p> Legenda </p>
            <CheckCircleIcon /> CritÃ©rio atingido
            <CancelIcon /> CritÃ©rio nÃ£o atingido
            <CropSquareIcon /> CritÃ©rio nÃ£o avaliado
        </Typography>



                </CardContent>
              </Card>
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
  contentContainer: {
    flex: 1,
    flexDirection: "row",
  },
  formContainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    marginBottom: 20,
  },
  button: {
    width: 300,
    height: 50,
  },
  inputSelect: {
    width: 300,
  },
  tableContainer: {
    flex: 2,
    padding: 20,
  },
});



export default GerenciarRelatorios;

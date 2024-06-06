import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  Typography,
  MenuItem,
  Select,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Box,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";
import TemplateCrud from "../Components/TemplateCrud";
import GenericModal from "../Components/Modal";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import CropSquareIcon from "@mui/icons-material/CropSquare";

const GerenciarRelatorios = ({ navigation }) => {
  const [curso, setCursoId] = useState("");
  const [cursos, setCursos] = useState([]);
  const [turmaId, setTurmaId] = useState("");
  const [turmaPorCurso, setTurmaPorCurso] = useState([]);
  const [ucId, setUcId] = useState("");
  const [uCsPorCurso, setUCsPorCurso] = useState([]);
  const [alunoId, setAlunoId] = useState("");
  const [alunosPorTurma, setAlunosPorTurma] = useState([]);
  const [alunoNome, setAlunoNome] = useState("");
  const [sigla, setSigla] = useState("");
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [capacidadePorUC, setCapacidadePorUC] = useState([]);
  const [totalCritico, setTotalCritico] = useState("");
  const [totalDesejavel, setTotalDesejavel] = useState("");
  const [atendidosCritico, setAtendidosCritico] = useState("");
  const [naoAtendidosCritico, setNaoAtendidosCritico] = useState("");
  const [atendidosDesejavel, setAtendidosDesejavel] = useState("");
  const [naoAtendidosDesejavel, setNaoAtendidosDesejavel] = useState("");
  const [resultados, setResultados] = useState({});

  const [modalContent, setModalContent] = useState({
    title: "",
    message: "",
    actions: null,
  });

  const fetchResultado = async (ucId, capacidadeId, criterioId, alunoId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/avaliacao/resultado/${ucId}/${capacidadeId}/${criterioId}/${alunoId}`
      );
      setResultados((prevResultados) => ({
        ...prevResultados,
        [`${capacidadeId}-${criterioId}`]: response.data,
      }));
    } catch (error) {
      console.error("Erro ao obter Resultado:", error);
    }
  };


  const fetchAtendidosCritico = async (alunoId, ucId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/avaliacao/contarCriticosAtendidos/${alunoId}/${ucId}`
      );
      setAtendidosCritico(response.data);
    } catch (error) {
      console.error(
        "Erro ao obter total de critérios atendidos criticos:",
        error
      );
    }
  };

  const fetchNaoAtendidosCritico = async (alunoId, ucId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/avaliacao/contarCriticosNaoAtendidos/${alunoId}/${ucId}`
      );
      setNaoAtendidosCritico(response.data);
    } catch (error) {
      console.error(
        "Erro ao obter total de critérios não atendidos criticos:",
        error
      );
    }
  };



  const fetchAtendidosDesejavel = async (alunoId, ucId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/avaliacao/contarDesejaveisAtendidos/${alunoId}/${ucId}`
      );
      setAtendidosDesejavel(response.data);
    } catch (error) {
      console.error(
        "Erro ao obter total de critérios atendidos desejaveis:",
        error
      );
    }
  };

  const fetchNaoAtendidosDesejavel = async (alunoId, ucId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/avaliacao/contarDesejaveisNaoAtendidos/${alunoId}/${ucId}`
      );
      setNaoAtendidosDesejavel(response.data);
    } catch (error) {
      console.error(
        "Erro ao obter total de critérios não atendidos desejaveis:",
        error
      );
    }
  };


  const fetchTotalCritico = async (ucId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/capacidade/contagemTotalCriticos/${ucId}`
      );
      setTotalCritico(response.data);
    } catch (error) {
      console.error("Erro ao obter total de critérios criticos:", error);
    }
  };

  const fetchTotalDesejavel = async (ucId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/capacidade/contagemTotalDesejavel/${ucId}`
      );
      setTotalDesejavel(response.data);
    } catch (error) {
      console.error("Erro ao obter total de critérios desejáveis:", error);
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

  const fetchCursosPorTurma = async (cursoId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/curso/pesquisaDeTurmaPorIdDoCurso/${cursoId}`
      );
      setTurmaPorCurso(response.data);
    } catch (error) {
      console.error("Erro ao obter cursos por TURMAS:", error);
    }
  };

  const fetchUnidadesCurricularesPorCurso = async (cursoId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/curso/pesquisarUcporCurso/${cursoId}`
      );
      setUCsPorCurso(response.data);
    } catch (error) {
      console.error("Erro ao obter UCS por CURSOS:", error);
    }
  };

  const fetchAlunosPorTurma = async (turmaId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/turma/buscarAlunosDaTurma/${turmaId}`
      );
      setAlunosPorTurma(response.data);
    } catch (error) {
      console.error("Erro ao obter alunos por turma:", error);
    }
  };

  const fetchAlunoNome = async (alunoId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/aluno/pesquisaId/${alunoId}`
      );
      setAlunoNome(response.data.nome);
    } catch (error) {
      console.error("Erro ao obter nome do aluno:", error);
    }
  };

  const fetchUcNome = async (ucId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/uc/pesquisaId/${ucId}`
      );
      setSigla(response.data.sigla);
    } catch (error) {
      console.error("Erro ao obter nome da UC:", error);
    }
  };

  const fetchCapacidadePorUC = async (ucId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/uc/pesquisaCapacidadesUc/${ucId}`
      );
      setCapacidadePorUC(response.data);
    } catch (error) {
      console.error("Erro ao obter capacidade por ucs:", error);
    }
  };

  useEffect(() => {
    fetchCursos();
  }, []);

  useEffect(() => {
    if (curso) {
      fetchCursosPorTurma(curso);
      fetchUnidadesCurricularesPorCurso(curso);
    }
  }, [curso]);

  useEffect(() => {
    if (turmaId) {
      fetchAlunosPorTurma(turmaId);
    }
  }, [turmaId]);

  useEffect(() => {
    if (ucId) {
      fetchTotalCritico(ucId);
      fetchTotalDesejavel(ucId);
      fetchCapacidadePorUC(ucId);
      fetchUcNome(ucId);
    }
  }, [ucId]);

  useEffect(() => {
    if (ucId && alunoId) {
      capacidadePorUC.forEach((capacidade) => {
        capacidade.criterios.forEach((criterio) => {
          fetchResultado(ucId, capacidade.id, criterio.id, alunoId);
        });
      });
    }
  }, [ucId, alunoId, capacidadePorUC]);

  const gerarRelatorio = () => {
    if (alunoId) {
      fetchAlunoNome(alunoId);
      if (ucId) {
        fetchAtendidosCritico(alunoId, ucId);
        fetchNaoAtendidosCritico(alunoId, ucId);
        fetchAtendidosDesejavel(alunoId, ucId);
        fetchNaoAtendidosDesejavel(alunoId, ucId);
      }
    }
    setTabelaVisivel(true);
  };

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
                onChange={(e) => setCursoId(e.target.value)}
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
                onChange={(e) => setTurmaId(e.target.value)}
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
                onChange={(e) => setAlunoId(e.target.value)}
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
                onChange={(e) => setUcId(e.target.value)}
                sx={{ marginBottom: "20px" }}
                displayEmpty
                style={styles.inputSelect}
                disabled={disabled}
              >
                <MenuItem value="" disabled>
                  Selecionar Unidade Curricular
                </MenuItem>
                {uCsPorCurso.map((uc) => (
                  <MenuItem key={uc.id} value={uc.id}>
                    {uc.sigla}
                  </MenuItem>
                ))}
              </Select>

              <Button
                variant="contained"
                color="primary"
                onClick={gerarRelatorio}
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

            {tabelaVisivel && (
              <View style={styles.tableContainer}>
                <Card style={{ marginBottom: 20 }}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      Informações Gerais
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
                  </CardContent>
                </Card>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6">Critérios Críticos</Typography>
                        <Typography> Total: {atendidosCritico+naoAtendidosCritico}</Typography>
                        <Typography> Atendidos: {atendidosCritico}</Typography>
                        <Typography> Não atendidos: {naoAtendidosCritico}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6">
                          Critérios Desejáveis
                        </Typography>
                        <Typography> Total: {atendidosDesejavel+naoAtendidosDesejavel}</Typography>
                        <Typography> Atendidos: {atendidosDesejavel}</Typography>
                        <Typography> Não atendidos: {naoAtendidosDesejavel} </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
                {capacidadePorUC.map((capacidade) => (
                  <Card
                    style={{ marginTop: 20, marginBottom: 20 }}
                    key={capacidade.id}
                  >
                    <CardContent>
                      <Typography variant="h6">
                        Capacidade: {capacidade.descricao}
                      </Typography>
                      <CardContent>
                        <TableContainer component={Paper}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Critério</TableCell>
                                <TableCell>Tipo de critério</TableCell>
                                <TableCell>Status</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {capacidade.criterios.map((criterio) => (
                                <TableRow key={criterio.id}>
                                  <TableCell>{criterio.descricao}</TableCell>
                                  <TableCell>{criterio.tipo}</TableCell>
                                  <TableCell>
                                    {resultados[
                                      `${capacidade.id}-${criterio.id}`
                                    ] !== undefined ? (
                                      resultados[
                                        `${capacidade.id}-${criterio.id}`
                                      ] === "atende" ? (
                                        <CheckCircleIcon color="success" />
                                      ) : (
                                        <CancelIcon color="error" />
                                      )
                                    ) : (
                                      <CropSquareIcon />
                                    )}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                        <Typography variant="body2">
                          <Box>
                            <p>Legenda</p>
                            <Box
                              display="inline-flex"
                              alignItems="center"
                              pr={1}
                            >
                              <CheckCircleIcon color="success" />
                              <span>Critério atingido</span>
                            </Box>
                            <Box display="inline-flex" alignItems="center">
                              <CancelIcon color="error" />
                              <span>Critério não atingido</span>
                            </Box>
                          </Box>
                        </Typography>
                      </CardContent>
                    </CardContent>
                  </Card>
                ))}
              </View>
            )}
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
  root: {
    flexGrow: 1,
    padding: 20,
  },
  gerarRelatorioButton: {
    marginTop: 20,
  },
});

export default GerenciarRelatorios;
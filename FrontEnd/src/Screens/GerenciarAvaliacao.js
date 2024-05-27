import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  Typography,
  MenuItem,
  Select,
  Button,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import TemplateCrud from "../Components/TemplateCrud";

const GerenciarAvaliacao = ({ navigation }) => {
  const [curso, setCursoId] = useState("");
  const [cursos, setCursos] = useState([]);
  const [turmaId, setTurmaId] = useState("");
  const [turmas, setTurmas] = useState([]);
  const [ucId, setUcId] = useState([]);
  const [ucs, setUCs] = useState([]);
  const [saId, setSaId] = useState("");
  const [sass, setSas] = useState([]);
  const [capacidadeId, setCapacidadeId] = useState("");
  const [capacidades, setCapacidades] = useState([]);
  const [rowsData] = useState([]);
  const [tabelaVisivel, setTabelaVisivel] = useState(false);
  const [turmaPorCurso, setTurmaPorCurso] = useState([]);
  const [uCsPorCurso, setUCsPorCurso] = useState([]);
  const [capacidadePorUC, setCapacidadePorUC] = useState([]);
  const [saPorUC, setSaPorUc] = useState([]);
  const [criterioPorCap, setCriterioPorCap] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [alunosPorTurma, setAlunosPorTurma] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [avaliacao, setAvaliacao] = useState([]);
  const [criterioId, setCriterioId] = useState("");

  function createData(criterio, tipoCriterio, capacidade, tipoCapacidade) {
    return { criterio, tipoCriterio, capacidade, tipoCapacidade };
  }

  const rows = rowsData.map((data) =>
    createData(
      data.criterio,
      data.tipoCriterio,
      data.capacidade,
      data.tipoCapacidade
    )
  );

  const fetchCursos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/curso");
      setCursos(response.data);
    } catch (error) {
      console.error("Erro ao obter cursos:", error);
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

  const fetchCriterioPorCapacidade = async (capId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/capacidade/pesquisaCriteriosDaCapacidade/${capId}`
      );
      setCriterioPorCap(response.data);
    } catch (error) {
      console.error("Erro ao obter criterio por Capacidade:", error);
    }
  };

  const fetchSaPorUC = async (ucId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/uc/pesquisaSaporUC/${ucId}`
      );
      setSaPorUc(response.data);
    } catch (error) {
      console.error("Erro ao obter sa por uc:", error);
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

  const fetchCapacidadePorUC = async (ucId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/uc/pesquisaCapacidadesUc/${ucId}`
      );
      setCapacidadePorUC(response.data);
    } catch (error) {
      console.error("Erro ao obter sa por ucs:", error);
    }
  };

  const fetchUCsPorCurso = async (cursoId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/curso/pesquisarUcporCurso/${cursoId}`
      );
      setUCsPorCurso(response.data);
    } catch (error) {
      console.error("Erro ao obter UCS por CURSOS:", error);
    }
  };

  const fetchUCs = async () => {
    try {
      const response = await axios.get("http://localhost:8080/uc");
      setUCs(response.data);
    } catch (error) {
      console.error("Erro ao obter uc:", error);
    }
  };

  const fetchTurmas = async () => {
    try {
      const response = await axios.get("http://localhost:8080/turma");
      setTurmas(response.data);
    } catch (error) {
      console.error("Erro ao obter turmas:", error);
    }
  };

  const fetchCapacidade = async () => {
    try {
      const response = await axios.get("http://localhost:8080/capacidade");
      setCapacidades(response.data);
    } catch (error) {
      console.error("Erro ao obter capacidade", error);
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

  const handleAddEvaluation = async (alunoId) => {
    const alunoSelectedOptions = selectedOptions[alunoId];
   console.log(criterioPorCap)
    try {
      for (const criterioCap of criterioPorCap) {
       
        const { criterioId } = criterioCap;
  
        const avaliacaoData = {
          resultado: alunoSelectedOptions ? alunoSelectedOptions.resultado : "",
          curso: curso,
          turma: turmaId,
          uc: ucId,
          aluno: alunoId,
          capacidade: capacidadeId,
          criterio: criterioId,
          sa: saId,
        };
  
        console.log(avaliacaoData);
        console.log(selectedOptions);
        
        const response = await axios.post("http://localhost:8080/avaliacao", avaliacaoData);
        
        console.log("Avaliação adicionada com sucesso para o aluno:", alunoId, "com critério:", criterioId, "e capacidade:", capacidadeId, response.data);
      }
    } catch (error) {
      if (error.response) {
        console.error("Erro ao adicionar avaliação para o aluno:", alunoId, error.response.data);
      } else {
        console.error("Erro ao adicionar avaliação para o aluno:", alunoId, error.message);
      }
    }
  };
  

  const handleAvancar = async () => {
    setTabelaVisivel(true);
  };

  const handleCheckChange = (alunoId, criterioId, value) => {
    setSelectedOptions({
      ...selectedOptions,
      [alunoId]: {
        ...selectedOptions[alunoId],
        [criterioId]: value,
      },
    });
  };


  const handleSubmitAllEvaluations = () => {
    alunosPorTurma.forEach((aluno) => handleAdicionarAvaliacao(aluno.id));
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await Promise.all([
        fetchCursos(),
        fetchTurmas(),
        fetchUCs(),
        fetchCapacidade(),
        fetchSa(),
      ]);
      setIsLoading(false);
    };
    fetchData();
  }, []);

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
                Gerenciar Avaliação
              </Typography>

              <Select
                labelId="curso-select-label"
                id="curso-select"
                value={curso}
                onChange={(e) => {
                  setCursoId(e.target.value);
                  fetchCursosPorTurma(e.target.value);
                  fetchUCsPorCurso(e.target.value); // Chama fetchCursosPorTurma com o id do curso selecionado
                }}
                sx={{ marginBottom: "20px" }}
                displayEmpty
                style={styles.inputSelect}
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
                  // Chama fetchCursosPorTurma com o id do curso selecionado
                }}
                sx={{ marginBottom: "20px" }}
                displayEmpty
                style={styles.inputSelect}
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
                labelId="uc-select-label"
                id="uc-select"
                value={ucId}
                onChange={(e) => {
                  setUcId(e.target.value);
                  fetchCapacidadePorUC(e.target.value);
                  fetchSaPorUC(e.target.value);
                }}
                sx={{ marginBottom: "20px" }}
                displayEmpty
                style={styles.inputSelect}
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
                onChange={(e) => setSaId(e.target.value)}
                sx={{ marginBottom: "20px" }}
                displayEmpty
                style={styles.inputSelect}
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
              <Select
                labelId="capacidade-select-label"
                id="capacidade-select"
                value={capacidadeId}
                onChange={(e) => {
                  setCapacidadeId(e.target.value);
                  fetchCriterioPorCapacidade(e.target.value); // Aqui você está passando o valor selecionado
                }}
                sx={{ marginBottom: "20px" }}
                displayEmpty
                style={styles.inputSelect}
              >
                <MenuItem value="" disabled>
                  Selecionar Capacidade
                </MenuItem>
                {capacidadePorUC.map((capacidade) => (
                  <MenuItem key={capacidade.id} value={capacidade.id}>
                    {capacidade.descricao}
                  </MenuItem>
                ))}
              </Select>

              <Button
                variant="contained"
                color="primary"
                onClick={handleAvancar}
                style={styles.button}
              >
                Iniciar Avaliação
              </Button>
            </View>
            <View style={styles.tableContainer}>
              {tabelaVisivel && (
                <View>
                  {alunosPorTurma.map((aluno) => (
                    <Accordion key={aluno.id}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel-${aluno.id}-content`}
                        id={`panel-${aluno.id}-header`}
                      >
                        <Typography>{aluno.nome}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div style={{ overflowX: "auto", width: "100%" }}>
                          <Typography variant="h6" style={{ textAlign: "center" }}>
                            Critérios
                          </Typography>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>Descrição</TableCell>
                                <TableCell>Tipo</TableCell>
                                <TableCell>Resultado</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {criterioPorCap.map((criterio) => (
                                <TableRow key={criterio.id}>
                                  <TableCell>{criterio.descricao}</TableCell>
                                  <TableCell>{criterio.tipo}</TableCell>
                                  <TableCell>
                                    <RadioGroup
                                      row
                                      value={selectedOptions[aluno.id]?.[criterio.id] || ""}
                                      onChange={(e) =>
                                        handleCheckChange(aluno.id, criterio.id, e.target.value)
                                      }
                                    >
                                      <FormControlLabel
                                        control={<Radio />}
                                        label="Atende"
                                        value="atende"
                                      />
                                      <FormControlLabel
                                        control={<Radio />}
                                        label="Não Atende"
                                        value="naoAtende"
                                      />
                                    </RadioGroup>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </AccordionDetails>
                      <AccordionActions>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleAddEvaluation(aluno.id)} // Adiciona a chamada da função handleAddEvaluation
                      >
                        Adicionar Avaliação Para o(a) {aluno.nome}
                      </Button>
                    </AccordionActions>

                    </Accordion>
                  ))}

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmitAllEvaluations}
                    style={{ marginTop: 20, marginBottom: 20 }}
                  >
                    Adicionar Avaliações para Todos
                  </Button>
                </View>
              )}
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
    flex: 2,
    padding: 20,
  },
  title: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 20,
  },
  button: {
    width: 200,
    height: 50,
  },
  inputSelect: {
    width: 300,
  },
});

export default GerenciarAvaliacao;

  import React, { useState, useEffect } from "react";
  import { View, StyleSheet, ScrollView } from "react-native";
  import {
    Typography,
    MenuItem,
    Select,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    Paper,
  } from "@mui/material";
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


    const [isLoading, setIsLoading] = useState(true);

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

    const handleAddCapacidade = async () => {
      try {
        const response = await axios.post("http://localhost:8080/capacidade", {
          descricao: descricao,
          tipo: tipo,
          ucId: ucId,
        });
        console.log(response.data);
        limparCampos();
        fetchCapacidade();
      } catch (error) {
        console.error("Erro ao adicionar capacidade:", error);
      }
    };


    const handleAvancar = async () => {
      setTabelaVisivel(true);
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
          handleAddCapacidade(),
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
                  onChange={(e) => setCursoId(e.target.value)}
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
                  onChange={(e) => setTurmaId(e.target.value)}
                  sx={{ marginBottom: "20px" }}
                  displayEmpty
                  style={styles.inputSelect}

                >
                  <MenuItem value="" disabled>
                    Selecionar Turma
                  </MenuItem>
                  {turmas.map((turma) => (
                    <MenuItem key={turma.id} value={turma.id}>
                      {turma.sigla}
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

                >
                  <MenuItem value="" disabled>
                    Selecionar UC
                  </MenuItem>
                  {ucs.map((uc) => (
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
                  {sass.map((sa) => (
                    <MenuItem key={sa.id} value={sa.id}>
                      {sa.descricao}
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

              {tabelaVisivel && (


              <View style={styles.tableContainer}>
                <Select
                  labelId="capacidade-select-label"
                  id="capacidade-select"
                  value={capacidadeId}
                  onChange={(e) => setCapacidadeId(e.target.value)} // Corrigido para chamar setCapacidade
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

                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Critério </TableCell>
                        <TableCell> Tipo de Critério </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.criterio}
                          </TableCell>
                          <TableCell align="right">{row.tipoCriterio}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
            

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
      marginBottom: 30,
      marginLeft: 180,
      width: 200, 
      height: 50, 
    },

    inputSelect: {
      width: 550, 

    }

  });

  export default GerenciarAvaliacao;



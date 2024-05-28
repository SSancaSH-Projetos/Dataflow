import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Typography, MenuItem, Select, Button, Alert } from "@mui/material";
import axios from "axios";
import TemplateCrud from "../Components/TemplateCrud";
import GenericModal from '../Components/Modal';

const GerenciarRelatorios = ({ navigation }) => {
  const [curso, setCursoId] = useState("");
  const [cursos, setCursos] = useState([]);
  const [turmaId, setTurmaId] = useState("");
  const [turmaPorCurso, setTurmaPorCurso] = useState([]);
  const [ucId, setUcId] = useState([]);
  const [uCsPorCurso, setUCsPorCurso] = useState([]);
  const [saId, setSaId] = useState("");
  const [saPorUC, setSaPorUc] = useState([]);
  const [alunosPorTurma, setAlunosPorTurma] = useState([]);
  const [alunoId, setAlunoId] = useState([]);
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

  useEffect(() => {
    const fetchData = async () => {
      await fetchCursos();

    };
    fetchUnidadesCurricularesPorCurso();
    fetchCursosPorTurma();
    fetchData();
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
                  setAlunoId(e.target.value)
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
                onChange={(e) => setSaId(e.target.value)}
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
});

export default GerenciarRelatorios;

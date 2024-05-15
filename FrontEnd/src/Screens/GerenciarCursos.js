import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Picker } from "react-native";
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
} from "@mui/material";
import axios from "axios";
import TemplateCrud from "../Components/TemplateCrud";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const GerenciarCursos = ({ navigation }) => {
  const [nome, setNome] = useState (""); 
  const [cargaHoraria, setCargaHoraria] = useState("");
  const [nivel, setNivel] = useState("");
  const [cursos, setCursos] =useState([]);


  const fetchCursos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/curso");
      setCursos(response.data);
    } catch (error) {
      console.error("Erro ao obter cursos:", error);
    }
  };

  useEffect(() => {
    fetchCursos();
  }, []);

  const handleAddCurso = async () => {
    try {
      const response = await axios.post("http://localhost:8080/curso", {
        nome: nome,
        cargaHoraria: cargaHoraria,
        nivel: nivel
      });
      console.log(response.data);

      fetchCursos();
    } catch (error) {
      console.error("Erro ao adicionar curso:", error);
    }
  };
  

  return (
    <TemplateCrud>
      
    </TemplateCrud>
  );
};

const styles = StyleSheet.create({});

export default GerenciarCursos;

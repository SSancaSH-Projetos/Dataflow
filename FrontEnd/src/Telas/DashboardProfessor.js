import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet
} from "react-native";
import axios from "axios";
import TemplateCrud from "../Componentes/TemplateCrud";
import { Typography } from "@mui/material";

const DashboardProfessor = ({ navigation }) => {
  

  return (
    <TemplateCrud><Typography>Meu dashboardDoProfessor</Typography></TemplateCrud>
  );
};

const styles = StyleSheet.create({
});

export default DashboardProfessor;

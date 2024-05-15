import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image
} from "react-native";
import axios from "axios";
import TemplateCrud from "../Components/TemplateCrud";
import { Typography } from "@mui/material";

const DashboardProfessor = ({ navigation }) => {


  return (
    <TemplateCrud>
      <Image
        source={require('../../assets/images/MasterNoteBg.jpg')}
        style={{ flex: 1, resizeMode: 'cover', width: '100%', height: '100%' }}
      />
    </TemplateCrud>
  );

};

const styles = StyleSheet.create({
});

export default DashboardProfessor;

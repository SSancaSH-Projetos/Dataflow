import React, {useEffect} from "react";
import { useHistory } from "react-router-dom"; 
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SchoolIcon from "@mui/icons-material/School";
import GroupIcon from "@mui/icons-material/Group";
import BookIcon from "@mui/icons-material/MenuBook";
import WorkIcon from "@mui/icons-material/Work";
import AssessmentIcon from "@mui/icons-material/Assessment"; // Ícone adicionado
import SummarizeIcon from '@mui/icons-material/Summarize';
import CreateIcon from '@mui/icons-material/Create';
import PersonIcon from '@mui/icons-material/Person';
import { useTheme } from "@mui/material/styles";

import { useNavigation } from "@react-navigation/native";

const drawerWidth = 240;

function CustomDrawer({ open, handleDrawerClose }) {

  
  
  const navigation = useNavigation();

  const handleTurmasClick = (index) => {
    if (index == 0) navigation.navigate("GerenciarCursos");
    if (index == 1) navigation.navigate("GerenciarTurmas");
    if (index == 2) navigation.navigate("GerenciarAlunos");
    if (index == 3) navigation.navigate("GerenciarUCs");
    if (index == 4) navigation.navigate("GerenciarSAs");
    if (index == 5) navigation.navigate("GerenciarAvaliacao");
    if (index == 6) navigation.navigate("GerenciarRelatorios");
   
  };

  useEffect(() => {
    const handleClickForaMenu = (event) => {
      const drawerElement = document.querySelector(".MuiDrawer-paper");
      if (open && drawerElement && !drawerElement.contains(event.target)) {
        handleDrawerClose();
      }
    };

    document.addEventListener("mousedown", handleClickForaMenu);
    return () => {
      document.removeEventListener("mousedown", handleClickForaMenu);
    };
  }, [open, handleDrawerClose]);

  const icons = [<SchoolIcon />, <GroupIcon />, <PersonIcon/>, <WorkIcon />,  <BookIcon />, <CreateIcon/>, <AssessmentIcon />]; // Adicionado o ícone de Avaliação
  const actions = [
    () => handleTurmasClick(0),
    () => handleTurmasClick(1),
    () => handleTurmasClick(2),
    () => handleTurmasClick(3),
    () => handleTurmasClick(4),
    () => handleTurmasClick(5), 
    () => handleTurmasClick(6)
  ];

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <div>
        <Divider />
        <List>
          {[
            "Cursos",
            "Turmas",
            "Alunos",
            "Unidades Curriculares",
            "Situações de Aprendizagem",
          ].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                onClick={actions[index]} 
              >
                <ListItemIcon>{icons[index % icons.length]}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {[
            "Avaliação",
          ].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                onClick={actions[index + 5]} // Atualizado o índice para o ícone de Avaliação
              >
                <ListItemIcon>{icons[index + 5]}</ListItemIcon> {/* Atualizado o índice para o ícone de Avaliação */}
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {[
            "Relatório",
          ].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                onClick={actions[index + 6]} // Atualizado o índice para o ícone de Relatório
              >
                <ListItemIcon>{icons[index + 6]}</ListItemIcon> {/* Atualizado o índice para o ícone de Relatório */}
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </div>
    </Drawer>
  );
}

export default CustomDrawer;

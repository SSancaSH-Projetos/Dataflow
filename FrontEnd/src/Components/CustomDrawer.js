import React, { useEffect } from "react";
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
import AssessmentIcon from "@mui/icons-material/Assessment";
import SummarizeIcon from '@mui/icons-material/Summarize';
import CreateIcon from '@mui/icons-material/Create';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DescriptionIcon from '@mui/icons-material/Description';
import { useTheme } from "@mui/material/styles";

import { useNavigation } from "@react-navigation/native";

const drawerWidth = 240;

function CustomDrawer({ open, handleDrawerClose }) {
  const navigation = useNavigation();

  const handleTurmasClick = (index) => {
    if (index === 0) navigation.navigate("GerenciarCursos");
    if (index === 1) navigation.navigate("GerenciarAlunos");
    if (index === 2) navigation.navigate("GerenciarTurmas");
    if (index === 3) navigation.navigate("GerenciarUCs");
    if (index === 4) navigation.navigate("GerenciarCapacidades");
    if (index === 5) navigation.navigate("GerenciarCriterios");
    if (index === 6) navigation.navigate("GerenciarSAs");
    if (index === 7) navigation.navigate("GerenciarAvaliacao");
    if (index === 8) navigation.navigate("GerenciarRelatorios");
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

  const icons = [
    <SchoolIcon />,
    <GroupIcon />,
    <PersonIcon />,
    <WorkIcon />,
    <BookIcon />,
    <CreateIcon />,
    <AssessmentIcon />,
    <AssignmentIcon />,
    <DescriptionIcon />,
  ];

  const actions = [
    () => handleTurmasClick(0),
    () => handleTurmasClick(1),
    () => handleTurmasClick(2),
    () => handleTurmasClick(3),
    () => handleTurmasClick(4),
    () => handleTurmasClick(5),
    () => handleTurmasClick(6),
    () => handleTurmasClick(7),
    () => handleTurmasClick(8),
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
            "Alunos",
            "Turmas",
          ].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={actions[index]}>
                <ListItemIcon>{icons[index]}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {[
            "Unidades Curriculares",
            "Capacidades",
            "Critérios",
            "Situações de Aprendizagem",
          ].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={actions[index+3]}>
                <ListItemIcon>{icons[index+3]}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["Avaliação", "Relatório"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={actions[index + 7]}>
                <ListItemIcon>{icons[index + 7]}</ListItemIcon>
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

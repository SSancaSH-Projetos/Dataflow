import React from "react";
import { useHistory } from "react-router-dom"; // Importe o useHistory do react-router-dom
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
import { useTheme } from "@mui/material/styles";

import { useNavigation } from "@react-navigation/native";

const drawerWidth = 240;

function CustomDrawer({ open, handleDrawerClose }) {

  
  const navigation = useNavigation();

  const handleTurmasClick = (index) => {
    // Redirecionar para a tela de AdicionarTurmas2
    console.log("teste turmas");
    navigation.navigate("AdicionarTurmas2");
   
  };

  const icons = [<SchoolIcon />, <GroupIcon />, <BookIcon />, <WorkIcon />];

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
            "fafafaf",
            "Unidades Curriculares",
            "Situações de Aprendizagem",
          ].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                onClick={() => handleTurmasClick(index)} // Passando o índice para a função
              >
                <ListItemIcon>{icons[index % icons.length]}</ListItemIcon>
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

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import DashboardProfessor from "../Screens/DashboardProfessor";
import GerenciarTurmas from "../Screens/GerenciarTurmas";
import GerenciarSA from "../Telas/GerenciarSA";
import GerenciarUC from "../Telas/GerenciarUC";
import CadastroUC from "../Telas/CadastroUC";
import CadastroCapacidades from "../Telas/CadastroCapacidades";
import AdicionarSA from "../Telas/AdicionarSA";
import AdicionarTurma from "../Telas/AdicionarTurma";
import AdicionarCurso from "../Telas/AdicionarCurso";
import AdicionarCriterios from "../Telas/AdicionarCriterios";
import IniciarAvCapacidade from "../Telas/IniciarAvCapacidade";
import CadastroAlunos from "../Telas/CadastroAlunos";
import EditarSA from "../Telas/EditarSA";
import EditarUC from "../Telas/EditarUC";
import EditarCurso from "../Telas/EditarCurso";
import EditarTurma from "../Telas/EditarTurma";
import GerenciarCursos from "../Screens/GerenciarCursos";
import GerenciarAlunos from "../Screens/GerenciarAlunos";
import GerenciarUCs from "../Screens/GerenciarUCs";
import GerenciarSAs from "../Screens/GerenciarSAs";
import GerenciarCriterios from "../Screens/GerenciarCriterios";

import GerenciarCapacidades from "../Screens/GerenciarCapacidades";

import GerenciarAvaliacao from "../Screens/GerenciarAvaliacao";
import GerenciarRelatorios from "../Screens/GerenciarRelatorios";

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="DashboardProfessor"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="DashboardProfessor"
          component={DashboardProfessor}
        />
        <Stack.Screen name="GerenciarCriterios" component={GerenciarCriterios} />
        <Stack.Screen name="GerenciarCapacidades" component={GerenciarCapacidades} />
        <Stack.Screen name="GerenciarSAs" component={GerenciarSAs} />
        <Stack.Screen name="GerenciarUCs" component={GerenciarUCs} />
        <Stack.Screen name="GerenciarAlunos" component={GerenciarAlunos} />
        <Stack.Screen name="GerenciarCursos" component={GerenciarCursos} />
        <Stack.Screen name="GerenciarTurmas" component={GerenciarTurmas} />
        <Stack.Screen name="GerenciarUC" component={GerenciarUC} />
        <Stack.Screen name="AdicionarSA" component={AdicionarSA} />
        <Stack.Screen name="CadastroUC" component={CadastroUC} />
        <Stack.Screen name="GerenciarRelatorios" component={GerenciarRelatorios} />
        <Stack.Screen name="CadastroCapacidades" component={CadastroCapacidades}/>
        <Stack.Screen name="AdicionarTurma" component={AdicionarTurma} />
        <Stack.Screen name=" AdicionarCurso" component={AdicionarCurso} />
        <Stack.Screen
          name="AdicionarCriterios"
          component={AdicionarCriterios}
        />
        <Stack.Screen
          name="IniciarAvCapacidade"
          component={IniciarAvCapacidade}
        />
        <Stack.Screen name="CadastroAlunos" component={CadastroAlunos} />
        <Stack.Screen name="EditarSA" component={EditarSA} />
        <Stack.Screen name="EditarUC" component={EditarUC} />
        <Stack.Screen name="EditarCurso" component={EditarCurso} />
        <Stack.Screen name="AdicionarCurso" component={AdicionarCurso} />
        <Stack.Screen name="EditarTurma" component={EditarTurma} />
        <Stack.Screen name="GerenciarAvaliacao" component={GerenciarAvaliacao} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

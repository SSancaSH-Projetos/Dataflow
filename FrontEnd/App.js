import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import IniciarAvaliacao from "./src/Telas/IniciarAvaliacao";
import GerenciarTurmas from "./src/Telas/GerenciarTurmas";
import GerenciarSA from "./src/Telas/GerenciarSA";
import GerenciarUC from "./src/Telas/GerenciarUC";
import GerenciarCursos from "./src/Telas/GerenciarCursos";
import GerarRelatorio from "./src/Telas/GerarRelatorio";
import CadastroUC from "./src/Telas/CadastroUC";
import CadastroCapacidades from "./src/Telas/CadastroCapacidades";
import AdicionarSA from "./src/Telas/AdicionarSA";
import AdicionarTurma from "./src/Telas/AdicionarTurma";
import AdicionarCurso from "./src/Telas/AdicionarCurso";
import AdicionarCriterios from "./src/Telas/AdicionarCriterios";
import IniciarAvCapacidade from "./src/Telas/IniciarAvCapacidade";
import CadastroAlunos from "./src/Telas/CadastroAlunos";
import EditarSA from "./src/Telas/EditarSA";
import EditarUC from "./src/Telas/EditarUC";
import EditarCurso from "./src/Telas/EditarCurso";
import EditarTurma from "./src/Telas/EditarTurma";
const Stack = createStackNavigator();

const TelaInicialProjeto = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.fundo}>
        <TouchableOpacity
          style={[styles.sairButton, styles.tamanhoButtonSair]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.sairButtonText}>Sair</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <Image
          // source={require('./caminho/para/seu/logo.png')}
          style={styles.logo}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.largeButton, styles.buttonMargin]}
          onPress={() => navigation.navigate("IniciarAvaliacao")}
        >
          <Text style={styles.buttonTextAv}>Iniciar Avaliação</Text>
        </TouchableOpacity>
        <View style={styles.horizontalButtonsContainer}>
          <TouchableOpacity
            style={[styles.button, styles.buttonMargin]}
            onPress={() => navigation.navigate("GerenciarTurmas")}
          >
            <Text style={styles.buttonText}>Gerenciar Turma</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonMargin]}
            onPress={() => navigation.navigate("GerenciarSA")}
          >
            <Text style={styles.buttonText}>Gerenciar SA</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonMargin]}
            onPress={() => navigation.navigate("GerenciarUC")}
          >
            <Text style={styles.buttonText}>Gerenciar Unidade Curricular</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonMargin]}
            onPress={() => navigation.navigate("GerenciarCursos")}
          >
            <Text style={styles.buttonText}>Gerenciar Cursos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonMargin]}
            onPress={() => navigation.navigate("GerarRelatorio")}
          >
            <Text style={styles.buttonText}>Gerar Relatório</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="TelaInicialProjeto"
          component={TelaInicialProjeto}
        />
        <Stack.Screen name="GerenciarTurmas" component={GerenciarTurmas} />
        <Stack.Screen name="IniciarAvaliacao" component={IniciarAvaliacao} />
        <Stack.Screen name="GerenciarSA" component={GerenciarSA} />
        <Stack.Screen name="GerenciarUC" component={GerenciarUC} />
        <Stack.Screen name="GerarRelatorio" component={GerarRelatorio} />
        <Stack.Screen name="AdicionarSA" component={AdicionarSA} />
        <Stack.Screen name="CadastroUC" component={CadastroUC} />
        <Stack.Screen
          name="CadastroCapacidades"
          component={CadastroCapacidades}
        />
        <Stack.Screen name="AdicionarTurma" component={AdicionarTurma} />
        <Stack.Screen name="GerenciarCursos" component={GerenciarCursos} />
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 150,
  },
  button: {
    width: 150,
    height: 60,
    backgroundColor: "#3A3042",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 10,
  },
  largeButton: {
    width: 240,
  },
  horizontalButtonsContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  buttonTextAv: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  fundo: {
    height: 80,
    backgroundColor: "#3A3042",
    alignSelf: "stretch",
  },
  buttonMargin: {
    marginVertical: 10,
    marginRight: 10,
  },
  sairButton: {
    backgroundColor: "red",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    justifyContent: "center",
    zIndex: 5,
  },
  sairButtonText: {
    flexDirection: "row",
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  tamanhoButtonSair: {
    width: 60,
    height: 35,
    marginTop: 20,
    marginLeft: 40,
  },
});

export default App;

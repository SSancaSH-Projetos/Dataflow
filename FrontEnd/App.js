import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import GerenciarTurmas from "./src/Telas/GerenciarTurmas";
import IniciarAvaliacao from './src/Telas/IniciarAvaliacao';
import GerenciarSA from './src/Telas/GerenciarSA';
import GerenciarUC from './src/Telas/GerenciarUC';
import GerarRelatorio from './src/Telas/GerarRelatorio';

const Stack = createStackNavigator();

const TelaInicialProjeto = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
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
          onPress={() => navigation.navigate('IniciarAvaliacao')}
        >
          <Text style={styles.buttonText}>Iniciar Avaliação</Text>
        </TouchableOpacity>
        <View style={styles.horizontalButtonsContainer}>
          <TouchableOpacity
            style={[styles.button, styles.buttonMargin]}
            onPress={() => navigation.navigate('GerenciarTurmas')}
          >
            <Text style={styles.buttonText}>Gerenciar Turma</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonMargin]}
            onPress={() => navigation.navigate('GerenciarSA')}
          >
            <Text style={styles.buttonText}>Gerenciar SA</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonMargin]}
            onPress={() => navigation.navigate('GerenciarUC')}
          >
            <Text style={styles.buttonText}>Gerenciar Unidade Curricular</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonMargin]}
            onPress={() => navigation.navigate('GerarRelatorio')}
          >
            <Text style={styles.buttonText}>Gerar Relatório</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
        <Stack.Screen
          name="GerenciarTurmas"
          component={GerenciarTurmas}
        />
        <Stack.Screen
          name="IniciarAvaliacao"
          component={IniciarAvaliacao}
        />
        <Stack.Screen
          name="GerenciarSA"
          component={GerenciarSA}
        />
        <Stack.Screen
          name="GerenciarUC"
          component={GerenciarUC}
        />
        <Stack.Screen
          name="GerarRelatorio"
          component={GerarRelatorio}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF', // Cor de fundo da tela
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 150,
    height: 60,
    backgroundColor: '#3A3042',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 10,
  },
  largeButton: {
    width: 250,
  },
  horizontalButtonsContainer: {
    flexDirection: 'row', // Dispor os botões horizontalmente
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  fundo: {
    height: 70, // Aumentando a espessura da faixa
    backgroundColor: '#3A3042', // Cor da faixa
    alignSelf: 'stretch', // Faz com que a faixa ocupe toda a largura
  },
  buttonMargin: {
    marginVertical: 10, // Adicionando margem vertical entre os botões
    marginRight: 10, // Adicionando margem horizontal entre os botões
  },
  sairButton: {
    backgroundColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  sairButtonText: {
    flexDirection: 'row',
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  tamanhoButtonSair: {
    width: 50,
    height: 25,
    marginTop: 18,
  },
});

export default App;

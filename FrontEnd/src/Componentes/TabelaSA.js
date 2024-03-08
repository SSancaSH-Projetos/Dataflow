



import React, { useState } from 'react';
import { FlatList, View, Text, Button, StyleSheet } from 'react-native';
import CadastroSA from './CadastroSA'

const TabelaSA = () => {
  const [itens, setItens] = useState([
    { situacao: 'Aprendizagem de Inteligência Artificial, Machine Learning', descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sit amet, consectetur adipiscing elit,Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sit amet, consectetur adipiscing elit' },
    { situacao: 'Situacao 2', descricao: 'Descrição 2' },
    { situacao: 'Situacao 3', descricao: 'Descrição 3' }
  ]);
  const [modalVisible, setModalVisible] = useState(false);

  const adicionarItem = (novaSituacao, novaDescricao) => {
    const novoItem = { situacao: novaSituacao, descricao: novaDescricao };
    setItens([...itens, novoItem]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.texto, styles.headerText]}>Situação de Aprendizagem</Text>
        <Text style={[styles.texto, styles.headerText, {textAlign: 'center', flex: 1}]}>Descrição</Text>
      </View>
      <View style={styles.separador}></View> {/* Linha de separação */}
      <FlatList
        data={itens}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={[styles.texto, styles.situacao]}>{item.situacao}</Text>
            <Text style={[styles.texto, styles.descricao]}>{item.descricao}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.botaoContainer}>
        <Button title="Adicionar Item" onPress={() => setModalVisible(true)} />
      </View>
      <CadastroSA
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddItem={adicionarItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Centraliza verticalmente os elementos
    padding: 10,
    backgroundColor: '#FAFAFA',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontWeight: 'bold',
    color: 'black',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRightWidth: 1, // Adiciona uma borda direita
    borderRightColor: '#ccc', // Cor da borda direita
  },
  texto: {
    fontSize: 16,
    color: 'black',
  },
  situacao: {
    flex: 1, // Para garantir que o texto de situação não seja esticado
    paddingRight: 10, // Espaçamento à direita para separar o texto da borda
  },
  descricao: {
    flex: 1, // Para ocupar todo o espaço restante
    textAlign: 'center',
  },
  botaoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  separador: {
    height: '80%', // Garante que a linha de separação abrange toda a altura
    width: 1,
    backgroundColor: '#ccc',
    position: 'absolute', // Posicionamento absoluto para cobrir toda a altura
    marginTop: 10, // Margem superior para compensar a margem do cabeçalho
    marginLeft: '50%', // Começa a partir da metade da largura da tela
    marginBottom: 50, // Distância do botão Adicionar Item
  },
});

export default TabelaSA;

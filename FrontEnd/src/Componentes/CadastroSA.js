// CadastroSA.js
import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
  
const CadastroSA = ({ visible, onClose, onAddItem }) => {
  const [novaSituacao, setNovaSituacao] = useState('');
  const [novaDescricao, setNovaDescricao] = useState('');
  const [name, setName] = useState('');
  const [descricao, setDescricao] = useState('');


  const adicionarItem = () => {
    onAddItem(novaSituacao, novaDescricao);
    setNovaSituacao('');
    setNovaDescricao('');
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
    <View  style={styles.modalContainer}>
        <View style={styles.modalContent}>

      <Input
        label="Título"
        //placeholder="Digite seu nome"
        value={name}
        onChangeText={setName}
      />
      <Input
        label="Descrição"
        //placeholder="Digite seu nome"
        value={descricao}
        onChangeText={setDescricao}
      />
          <TouchableOpacity style={styles.botao} onPress={adicionarItem}>
            <Text style={styles.botaoTexto}>Adicionar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.botao, styles.botaoCancelar]} onPress={onClose}>
            <Text style={styles.botaoTexto}>Cancelar</Text>
          </TouchableOpacity>
        </View>
        </View>

   </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    minWidth: 300,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  botao: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  botaoCancelar: {
    backgroundColor: 'red',
  },
  botaoTexto: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CadastroSA;

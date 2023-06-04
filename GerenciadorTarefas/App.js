import React, { useState } from 'react';
import { View, Text, TextInput, Button, Picker, FlatList } from 'react-native';
import { Card, ListItem } from 'react-native-elements';

export default function App() {
  const [descricao, setDescricao] = useState('');
  const [responsavel, setResponsavel] = useState('');
  const [nivel, setNivel] = useState('1');
  const [situacao, setSituacao] = useState('nova');
  const [prioridade, setPrioridade] = useState('1');
  const [tarefas, setTarefas] = useState([]);
  const [tarefaAtual, setTarefaAtual] = useState(null);

  const criarTarefa = () => {
    const novaTarefa = {
      id: Date.now().toString(),
      descricao,
      responsavel,
      nivel,
      situacao,
      prioridade,
    };
    setTarefas([...tarefas, novaTarefa]);
    resetForm();
  };

  const atualizarTarefa = () => {
    if (!tarefaAtual) return;
    const tarefaAtualizada = {
      id: tarefaAtual.id,
      descricao,
      responsavel,
      nivel,
      situacao,
      prioridade,
    };
    const tarefasAtualizadas = tarefas.map(tarefa => {
      if (tarefa.id === tarefaAtual.id) {
        return tarefaAtualizada;
      }
      return tarefa;
    });
    setTarefas(tarefasAtualizadas);
    setTarefaAtual(null);
    resetForm();
  };

  const editarTarefa = (id) => {
    const tarefa = tarefas.find(tarefa => tarefa.id === id);
    if (!tarefa) return;
    setTarefaAtual(tarefa);
    setDescricao(tarefa.descricao);
    setResponsavel(tarefa.responsavel);
    setNivel(tarefa.nivel);
    setSituacao(tarefa.situacao);
    setPrioridade(tarefa.prioridade);
  };

  const removerTarefa = id => {
    setTarefas(tarefas.filter(tarefa => tarefa.id !== id));
  };

  const resetForm = () => {
    setDescricao('');
    setResponsavel('');
    setNivel('1');
    setSituacao('nova');
    setPrioridade('1');
  };

  const renderItem = ({ item }) => (
    <Card>
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>Descrição: {item.descricao}</ListItem.Title>
          <ListItem.Subtitle>Responsável: {item.responsavel}</ListItem.Subtitle>
          <ListItem.Subtitle>Nível: {item.nivel}</ListItem.Subtitle>
          <ListItem.Subtitle>Situação: {item.situacao}</ListItem.Subtitle>
          <ListItem.Subtitle>Prioridade: {item.prioridade}</ListItem.Subtitle>
        </ListItem.Content>
        <Button title="Editar" onPress={() => editarTarefa(item.id)} />
        <Button title="Remover" onPress={() => removerTarefa(item.id)} />
      </ListItem>
    </Card>
  );

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#F0FFF0' }}>
      <Text style={{ fontSize: 24, marginBottom: 20, textAlign: 'center', color: '#008000' }}>Tarefas</Text>
      <View style={{ marginBottom: 10 }}>
        <Text style={{ marginBottom: 5, color: '#008000' }}>Descrição:</Text>
        <TextInput
          style={styles.input}
          placeholder="Adicione uma descrição"
          onChangeText={text => setDescricao(text)}
          value={descricao}
        />
        <Text style={{ marginBottom: 5, color: '#008000' }}>Responsável:</Text>
        <TextInput
          style={styles.input}
          placeholder="Adicione um responsável"
          onChangeText={text => setResponsavel(text)}
          value={responsavel}
        />
        <Text style={{ marginBottom: 5, color: '#008000' }}>Nível:</Text>
        <Picker
          selectedValue={nivel}
          style={styles.picker}
          onValueChange={itemValue => setNivel(itemValue)}
        >
          <Picker.Item label="1" value="1" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="5" value="5" />
          <Picker.Item label="8" value="8" />
        </Picker>
        <Text style={{ marginBottom: 5, color: '#008000' }}>Situação:</Text>
        <Picker
          selectedValue={situacao}
          style={styles.picker}
          onValueChange={itemValue => setSituacao(itemValue)}
        >
          <Picker.Item label="Nova" value="nova" />
          <Picker.Item label="Em andamento" value="em andamento" />
          <Picker.Item label="Pendente" value="pendente" />
          <Picker.Item label="Cancelada" value="cancelada" />
          <Picker.Item label="Resolvida" value="resolvida" />
        </Picker>
        <Text style={{ marginBottom: 5, color: '#008000' }}>Prioridade:</Text>
        <Picker
          selectedValue={prioridade}
          style={styles.picker}
          onValueChange={itemValue => setPrioridade(itemValue)}
        >
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
        </Picker>
        {tarefaAtual ? (
          <Button title="Atualizar Tarefa" onPress={atualizarTarefa} />
        ) : (
          <Button title="Criar Tarefa" onPress={criarTarefa} />
        )}
      </View>
      <FlatList
        data={tarefas}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={{ flex: 1 }}
      />
    </View>
  );
}

const styles = {
  input: {
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    borderColor: '#008000',
    borderWidth: 1,
  },
  picker: {
    height: 50,
    width: 150,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    borderColor: '#008000',
    borderWidth: 1,
  },
};

import { useAuth } from '@/src/context/AuthContext';
import { supabase } from '@/src/lib/supabase';
import { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function Perfil() { 
  const { setAuth, user } = useAuth();
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [objetos, setObjetos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSignout() {
    const { error } = await supabase.auth.signOut();
    setAuth(null);
    if (error) {
      Alert.alert('Erro', 'Erro ao sair da conta, tente mais tarde.');
    }
  }

  async function fetchObjetos() {
    setLoading(true);
    const { data, error } = await supabase
      .from('objetos')
      .select('*')
      .eq('user_id', user?.id)
      .order('created_at', { ascending: false });

    if (error) {
      Alert.alert('Erro', error.message);
    } else {
      setObjetos(data || []);
    }
    setLoading(false);
  }

  async function addObjeto() {
    if (!nome) {
      Alert.alert('Atenção', 'Informe um nome para o objeto.');
      return;
    }

    const { error } = await supabase
      .from('objetos')
      .insert([{ nome, descricao, user_id: user?.id }]);

    if (error) {
      Alert.alert('Erro', error.message);
    } else {
      setNome('');
      setDescricao('');
      fetchObjetos();
    }
  }

  async function updateObjeto(id: string | number) {
    console.log('updateObjeto chamado com id:', id);
    if (!nome) {
      Alert.alert('Atenção', 'Informe um nome para o objeto.');
      return;
    }
    const { error } = await supabase
      .from('objetos')
      .update({ nome, descricao })
      .eq('id', id);
    if (error) {
      Alert.alert('Erro', error.message);
    } else {
      setNome('');
      setDescricao('');
      fetchObjetos();
    }
  }

  function confirmarRemocao(id: string | number) {
    console.log('confirmarRemocao chamado com id:', id);
    Alert.alert(
      "Remover objeto",
      "Tem certeza que deseja remover este objeto?",
      [
        { text: "Cancelar"},
        { text: "Remover", onPress: () => removeObjeto(id) }
      ]
    );
  }

  async function removeObjeto(id: string | number) {
    console.log('removeObjeto chamado com id:', id);
    const { error } = await supabase
      .from('objetos')
      .delete()
      .eq('id', id);

    if (error) {
      Alert.alert('Erro', error.message);
    } else {
      fetchObjetos();
    }
  }

  useEffect(() => {
    if (user) fetchObjetos();
  }, [user]);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Perfil</Text>
      <Text>{user?.email}</Text>

      <TextInput
        placeholder="Nome do objeto"
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        placeholder="Descrição"
        style={styles.input}
        value={descricao}
        onChangeText={setDescricao}
      />
      <Button title="Cadastrar Objeto" onPress={addObjeto} />

      <Text style={styles.subtitulo}>Meus Objetos</Text>
      {loading ? (
        <Text>Carregando...</Text>
      ) : (
        <FlatList
          data={objetos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemText}>
                {item.nome} - {item.descricao}
              </Text>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                <TouchableOpacity 
                  style={styles.removeBtn} 
                  onPress={() => confirmarRemocao(item.id)}
                >
                  <Text style={styles.delete}>Remover</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.updateBtn}
                  onPress={() => updateObjeto(item.id)}
                >
                  <Text style={styles.updateText}>Alterar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
      <View style={{ marginBottom: 50 }}>
      <Button title="Deslogar" onPress={handleSignout} color="red" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 34,
    padding: 16,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitulo: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 8,
    marginVertical: 6,
    borderRadius: 6,
  },
  item: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 14,
    marginBottom: 4,
  },
  removeBtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#fdd',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginRight: 8,
  },
  updateBtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#def',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  delete: {
    color: 'red',
    fontWeight: 'bold',
  },
  updateText: {
    color: '#0077cc',
    fontWeight: 'bold',
  },
});

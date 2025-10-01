import { useAuth } from '@/src/context/AuthContext'
import { supabase } from '@/src/lib/supabase'
import { useState } from 'react'
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { styles } from '@/src/styles'
import { router } from 'expo-router'

export default function AddObjeto() {
  const { user } = useAuth()
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')

  async function addObjeto() {
    if (!nome) {
      Alert.alert('Atenção', 'Informe um nome para o objeto.')
      return
    }

    const { error } = await supabase
      .from('objetos')
      .insert([{ nome, descricao, user_id: user?.id }])

    if (error) Alert.alert('Erro', error.message)
    else router.back() 
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastrar Objeto</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do objeto"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
      />
      <TouchableOpacity style={styles.saveBtn} onPress={addObjeto}>
        <Text style={styles.saveText}>Salvar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelBtn} onPress={() => router.back()}>
        <Text style={styles.cancelText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  )
}

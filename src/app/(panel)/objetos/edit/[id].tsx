import { useAuth } from '@/src/context/AuthContext'
import { supabase } from '@/src/lib/supabase'
import { styles } from '@/src/styles'
import { router, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native'

export default function EditObjeto() {
  const { user } = useAuth()
  const { id } = useLocalSearchParams()
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')

  async function fetchObjeto() {
    const { data, error } = await supabase
      .from('objetos')
      .select('*')
      .eq('id', id)
      .single()

    if (error) Alert.alert('Erro', error.message)
    else {
      setNome(data.nome)
      setDescricao(data.descricao)
    }
  }

  async function saveObjeto() {
    const { error } = await supabase
      .from('objetos')
      .update({ nome, descricao })
      .eq('id', id)

    if (error) Alert.alert('Erro', error.message)
    else router.back() 
  }

  useEffect(() => {
    if (id) fetchObjeto()
  }, [id])

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Editar Objeto</Text>
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
      <TouchableOpacity style={styles.saveBtn} onPress={saveObjeto}>
        <Text style={styles.saveText}>Salvar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelBtn} onPress={() => router.back()}>
        <Text style={styles.cancelText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  )
}

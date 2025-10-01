import { useAuth } from '@/src/context/AuthContext'
import { supabase } from '@/src/lib/supabase'
import { styles } from '@/src/styles'
import { useFocusEffect } from '@react-navigation/native'
import { router } from 'expo-router'
import { useCallback, useState } from 'react'
import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native'

export default function Profile() {
  const { setAuth, user } = useAuth()
  const [objetos, setObjetos] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  async function handleSignout() {
    const { error } = await supabase.auth.signOut()
    setAuth(null)
    if (error) Alert.alert('Erro', 'Erro ao sair da conta, tente mais tarde.')
  }

  async function fetchObjetos() {
    if (!user) return
    setLoading(true)
    const { data, error } = await supabase
      .from('objetos')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) Alert.alert('Erro', error.message)
    else {
      setObjetos(data || [])
      console.log('Objetos carregados:', data)
    }
    setLoading(false)
  }

  useFocusEffect(
    useCallback(() => {
      fetchObjetos()
    }, [user])
  )

  async function confirmarRemocao(id: string) {
    console.log('Botão remover clicado para id:', id)
    Alert.alert('Remover objeto', 'Tem certeza que deseja remover este objeto?', [
      { text: 'Cancelar' },
      { text: 'Remover', onPress: () => {
        console.log('Confirmado para remover id:', id)
        removeObjeto(id)
      } }
    ])
  }

  async function removeObjeto(id: string) {
    console.log('Removendo objeto com id:', id)
    try {
      const { error } = await supabase.from('objetos').delete().eq('id', id)
      if (error) {
        console.log('Erro ao remover:', error)
        Alert.alert('Erro', error.message)
      } else {
        console.log('Objeto removido com sucesso!')
        Alert.alert('Sucesso', 'Objeto removido com sucesso!')
        fetchObjetos()
      }
    } catch (e) {
      console.log('Exceção ao remover:', e)
      Alert.alert('Erro', 'Exceção ao remover objeto.')
    }
  }

  return (
    <View style={styles.container}>
       <Text style={styles.titulo}>{user?.email}</Text>
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => router.push('/(panel)/objetos/add')}
      >
        <Text style={styles.addBtnText}>Cadastrar Objeto</Text>
      </TouchableOpacity>

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
              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.editBtn}
                  onPress={() => router.push(`/(panel)/objetos/edit/${item.id}`)}
                >
                  <Text style={styles.editText}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.removeBtn}
                  onPress={() => {
                    console.log('Remover direto, id:', item.id)
                    removeObjeto(item.id)
                  }}
                >
                  <Text style={styles.delete}>Remover</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      <TouchableOpacity style={styles.logoutBtn} onPress={handleSignout}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  )
}

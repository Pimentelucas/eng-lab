import { Stack, router } from 'expo-router'
import { useEffect } from 'react'
import { AuthProvider, useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import Colors from '../../constants/Colors'

export default function RootLayout() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  )
}

function MainLayout() {
  const { setAuth } = useAuth()

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setAuth(session.user)
        router.replace('/(panel)/profile/page')
        return
      }
      setAuth(null)
      router.replace('/(auth)/signin/page')
    })
  }, [])

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/signin/page" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/signup/page" options={{ headerShown: false }} />

      {/* Profile */}
      <Stack.Screen
        name="(panel)/profile/page"
        options={{
          headerShown: true,
          title: 'Perfil',
          headerStyle: { backgroundColor: Colors.zinc }, 
          headerTintColor: Colors.white,
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />

      {/* Add Objeto */}
      <Stack.Screen
        name="(panel)/objetos/add"
        options={{
          headerShown: true,
          title: 'Cadastrar Objeto',
          headerStyle: { backgroundColor: Colors.zinc },
          headerTintColor: Colors.white,
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />

      {/* Edit Objeto */}
      <Stack.Screen
        name="(panel)/objetos/edit/[id]"
        options={{
          headerShown: true,
          title: 'Editar Objeto',
          headerStyle: { backgroundColor: Colors.zinc },
          headerTintColor: Colors.white,
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
    </Stack>
  )
}

import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Signup() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const [loading, setLoading] = useState(false);

    const handleSignup = () => {
        console.log('Cadastrando usuário:', { name, email, password });
    }

    return (
        <SafeAreaView style={{flex: 1,}}>
            <ScrollView style={{flex: 1, backgroundColor: Colors.white,}}>
                <View style={styles.container}>
                    <View style={styles.header}>

                        <Pressable 
                            style={styles.backButton}
                            onPress={() => router.back()}
                        >
                            <Ionicons name='arrow-back' size={24} color={Colors.white}/>               
                        </Pressable>
                        <Text style={styles.logoText}>
                            Balansy
                            <Text style={{ color: Colors.white, fontSize: 24, fontWeight: 'bold', marginLeft: 20 }}></Text>
                        </Text>
                        <Text style={styles.slogan}>
                            Criar uma conta
                        </Text>
                    </View>

                    <View style={styles.form}>
                        <View>
                            <Text style={styles.lablel}>Nome completo</Text>
                            <TextInput
                                placeholder="Nome completo..."
                                style={styles.input}
                                value={ name }
                                onChangeText={setName}
                            />
                        </View>
                        
                        <View>
                            <Text style={styles.lablel}>Email</Text>
                            <TextInput
                                placeholder="Digite seu email..."
                                style={styles.input}
                                value={ email }
                                onChangeText={setEmail}
                            />
                        </View>

                        <View>
                            <Text style={styles.lablel}>Senha</Text>
                            <TextInput
                                placeholder="Digite sua senha..."
                                style={styles.input}
                                secureTextEntry={true}
                                value={ password }
                                onChangeText={setPassword}
                            />
                        </View>
                        <Pressable style={styles.button} onPress={handleSignup}>
                            <Text style={styles.buttonText}>Cadastrar</Text>
                        </Pressable>

                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 34,
        backgroundColor: Colors.zinc,
    },
    header: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    logoText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.white,
        marginBottom: 10,
    },
    slogan: {
        fontSize: 16,
        color: Colors.white,
        marginBottom: 40,
    },
    form: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: Colors.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 20,
    },
    lablel: {
        fontSize: 16,
        color: Colors.gray,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.gray,
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,   
    },
    button: {
        backgroundColor: Colors.green,
        padding: 15,
        paddingBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        borderRadius: 8,
    },
    buttonText: {
        color: Colors.zinc,
        fontWeight: 'bold',
    },
    backButton: {
        backgroundColor: 'transparent',
        padding: 10,
        marginBottom: 20,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
});

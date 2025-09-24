import Colors from '@/constants/Colors';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Login() { 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const [loading, setLoading] = useState(false);

    function handleSignIn() {
        console.log('Logando usuário:', { email, password });
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.logoText}>
                    Balansy
                    <Text style={{ color: Colors.white, fontSize: 24, fontWeight: 'bold', marginLeft: 20 }}></Text>
                </Text>
                <Text style={styles.slogan}>
                    Alugue itens com a palma da mão
                </Text>
            </View>

            <View style={styles.form}>
                <View>
                    <Text style={styles.lablel}>Email</Text>
                    <TextInput
                        placeholder="Digite seu email..."
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                <View>
                    <Text style={styles.lablel}>Senha</Text>
                    <TextInput
                        placeholder="Digite sua senha..."
                        style={styles.input}
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>
                <Pressable style={styles.button} onPress={handleSignIn}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </Pressable>

                <Link href="/(auth)/signup/page" style={styles.link}>
                    <Text>Criar uma conta</Text>
                </Link>
            </View>
        </View>
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
    link: { 
        marginTop: 10,
        textAlign: 'center',
    }
});

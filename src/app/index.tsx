import colors from '@/constants/Colors';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default function Index() { 



    return (
        <View style={styles.container}>
                <ActivityIndicator size={44} color={colors.green} />
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

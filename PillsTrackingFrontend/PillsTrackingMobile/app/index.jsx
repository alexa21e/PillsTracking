import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';

export default function App() {
    const login = async () => {
        navigation.navigate('login');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>PillsTracking</Text>
            <Text style={styles.p}>for Patients</Text>
            <StatusBar style="auto" />
            <Pressable style={styles.button} onPress={login}>
                <Text style={styles.buttonText}>Login</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    p: {
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    button: {
        marginTop: 40
    },
});
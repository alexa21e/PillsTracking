import React, { useState } from 'react';
import { router } from 'expo-router';
import { Text, View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useSession } from '@/context/ctx';

interface Prescription {
    id: string;
    name: string;
  }

export default function SignIn() {
    const { signIn } = useSession();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSignIn = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get<Prescription[]>(`https://localhost:7137/api/Patients/prescriptionsByPhoneNumber`, {
                params: { phoneNumber }
            });
            if (response.status === 200) {
                signIn();
                router.replace({ pathname: '/prescriptions', params: { prescriptions: JSON.stringify(response.data) } }); 
            }
        } catch (error) {
            Alert.alert('Error', 'You are not registered in the database');
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter phone number"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
            />
            <Button title="Sign In" onPress={handleSignIn} disabled={isLoading} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 8,
        width: '80%',
    },
    prescriptionsContainer: {
        marginTop: 20,
        width: '80%',
      },
      prescriptionText: {
        fontSize: 18,
        padding: 8,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
      },
});
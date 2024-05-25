import { useSession } from '@/context/ctx';
import {Text, View, Button, StyleSheet} from 'react-native';

export default function PrescriptionsList(){
    const { signOut } = useSession();
    
    return (
        <View style={styles.container}>
            <Text>Prescriptions List</Text>
            <Button title="Sign Out" color={"blue"} onPress={signOut}></Button>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: "80%",
    },
  });
  
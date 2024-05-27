import React from 'react';
import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSession } from '@/context/ctx';

interface Prescription {
  id: string;
  name: string;
}

export default function PrescriptionsScreen() {
  const router = useRouter();
  const { signOut } = useSession();
  const { prescriptions } = useLocalSearchParams();

  const prescriptionsList: Prescription[] = prescriptions ? JSON.parse(prescriptions as string) : [];

  const handleSignOut = () => {
    signOut();
    router.replace('/log-in'); // Navigate to login screen after sign out
  };

  const handlePress = (id: string) => {
    router.push({ pathname: '/prescriptionDetails', params: { id } });
  };

  const renderTableHeader = () => (
    <View style={[styles.row, styles.header]}>
      <Text style={[styles.cell, styles.headerText]}>Prescription Name</Text>
    </View>
  );

  const renderTableRow = ({ item }: { item: Prescription }) => (
    <TouchableOpacity onPress={() => handlePress(item.id)} style={styles.row}>
      <Text style={styles.cell}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prescriptions</Text>
      <FlatList
        data={prescriptionsList}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderTableHeader}
        renderItem={renderTableRow}
        contentContainerStyle={styles.table}
      />
      <Button title="Sign Out" color={"blue"} onPress={handleSignOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: '#f8f9fa',
  },
  table: {
    width: '80%',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 1, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  header: {
    backgroundColor: '#e9ecef',
  },
  cell: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    paddingVertical: 8,
  },
  headerText: {
    fontWeight: 'bold',
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 16,
  },
});

// screens/PrescriptionDetails.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getPrescriptionById } from './api/prescriptions'; // Adjust the import path as necessary

const PrescriptionDetails = () => {
  const route = useRoute();
  const { prescriptionId } = route.params;
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const loadDetails = async () => {
      const data = await getPrescriptionById(prescriptionId);
      setDetails(data);
    };

    loadDetails();
  }, [prescriptionId]);

  if (!details) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{details.name}</Text>
      <Text style={styles.label}>Duration: <Text style={styles.value}>{details.duration} days</Text></Text>
      <Text style={styles.label}>Creation Date: <Text style={styles.value}>{new Date(details.creationDate).toLocaleDateString()}</Text></Text>
      <Text style={styles.subtitle}>Drugs:</Text>
      {details.drugs.map(drug => (
        <View key={drug.id} style={styles.drug}>
          <Text style={styles.label}>Name: <Text style={styles.value}>{drug.name}</Text></Text>
          <Text style={styles.label}>Concentration: <Text style={styles.value}>{drug.concentration} mg</Text></Text>
          <Text style={styles.label}>Dosage: <Text style={styles.value}>{drug.dosage} pills</Text></Text>
          <Text style={styles.label}>Frequency: <Text style={styles.value}>{drug.frequency} hours</Text></Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  value: {
    fontWeight: 'normal',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  drug: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
});

export default PrescriptionDetails;

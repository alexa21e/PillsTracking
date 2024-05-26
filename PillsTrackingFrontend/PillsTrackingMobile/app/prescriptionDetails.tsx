import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';

interface Drug {
  id: string;
  name: string;
  concentration: number;
  dosage: number;
  frequency: number;
}

interface PrescriptionDetail {
  id: string;
  name: string;
  duration: number;
  creationDate: string;
  drugs: Drug[];
}

export default function PrescriptionDetailScreen() {
  const { id } = useLocalSearchParams();
  const [prescription, setPrescription] = useState<PrescriptionDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPrescriptionDetail = async () => {
      try {
        const response = await axios.get<PrescriptionDetail>(`https://localhost:7137/api/Patients/${id}`);
        setPrescription(response.data);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch prescription details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrescriptionDetail();
  }, [id]);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!prescription) {
    return <Text>No details available</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{prescription.name}</Text>
      <Text>Duration: {prescription.duration} days</Text>
      <Text>Creation Date: {new Date(prescription.creationDate).toLocaleDateString()}</Text>
      <Text style={styles.subTitle}>Drugs:</Text>
      {prescription.drugs.map((drug) => (
        <View key={drug.id} style={styles.drugContainer}>
          <Text>Name: {drug.name}</Text>
          <Text>Concentration: {drug.concentration} mg</Text>
          <Text>Dosage: {drug.dosage}</Text>
          <Text>Frequency: Every {drug.frequency} hours</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
  },
  drugContainer: {
    marginTop: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
});

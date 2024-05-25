import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet, Text, Animated } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getPrescriptionsByPatientId } from './api/prescriptions';

const Home = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { patientId } = route.params;
  const [tableData, setTableData] = useState([]);
  const [tableHead, setTableHead] = useState(['Prescription Name']);

  useEffect(() => {
    const loadPrescriptions = async () => {
      const data = await getPrescriptionsByPatientId(patientId);
      const tableDataFormatted = data.map(item => [item.name, item.id]);
      setTableData(tableDataFormatted);
    };

    loadPrescriptions();
  }, [patientId]);

  const handleRowPress = (rowData) => {
    navigation.navigate('Pp', { prescriptionId: rowData[1] });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Prescriptions</Text>
      <ScrollView style={styles.dataWrapper}>
        <Table borderStyle={styles.tableBorder}>
          <Row data={tableHead} style={styles.head} textStyle={styles.headerText} />
          {
            tableData.map((rowData, index) => (
              <TouchableOpacity key={index} onPress={() => handleRowPress(rowData)}>
                <Row
                  data={rowData.slice(0, 1)} 
                  textStyle={styles.text}
                />
                <View style={styles.separator} />
              </TouchableOpacity>
            ))
          }
        </Table>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    padding: 15,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 36,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#4a90e2',
    textAlign: 'center',
  },
  tableBorder: {
    borderWidth: 1,
    borderColor: '#ddd',
  },
  headerText: {
    margin: 6,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  head: {
    height: 50,
    backgroundColor: '#4a90e2',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  text: {
    margin: 6,
    textAlign: 'center',
    color: '#333',
    fontSize: 16,
  },
  dataWrapper: {
    marginTop: -1
  },
  row: {
    height: 40,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    justifyContent: 'center',
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 5,
  },
});


export default Home;
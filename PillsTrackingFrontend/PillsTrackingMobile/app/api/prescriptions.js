import apiManager from './apiManager';

export const getPrescriptionsByPatientId = async (patientId) => {
  try {
    const response = await apiManager.get(`patients/${patientId}/prescriptions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching prescriptions:', error);
    return [];
  }
};

import apiManager from './apiManager';

export const login = async (phoneNumber) => {
    try {
        const response = await apiManager.post(`Account/login/patient?phoneNumber=${phoneNumber}`);
        const data = response.data; 
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
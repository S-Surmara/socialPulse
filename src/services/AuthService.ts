// services/ApiService.ts
import axios from 'axios';
import mockApiData from '../MockData/mockApiData.json'

const apiUrl = 'http://localhost:8080'; // Adjust the API endpoint as needed

const ApiService = {
  login: async (username: string, password: string) => {
    // uncomment below code when actual service is created 

    try {
      const response = await axios.post(`${apiUrl}/login`, { username , password });
      return response.data;
    } catch (error) {
      // Handle error (e.g., show error message)
      console.error('Error during login:', error);
      throw error;
    }

    // comment below code when actual service is created 

    // try {
    //     // Simulate delay to mimic network latency
    //     await new Promise(resolve => setTimeout(resolve, 1000));

    //     // Simulate API response based on email and password
    //     const responseKey = email === '' && password === '' ? 'validUser' : 'invalidUser';
    //     const responseData = mockApiData.login[responseKey];

    //     return responseData;
    //   } catch (error) {
    //     // Handle error (e.g., show error message)
    //     console.error('Error during login:', error);
    //     throw error;
    //   }

  },

  signup: async (
    email: string,
    password: string,
    confirmPassword: string,
    username: string,
    name: string
  ) => {
    try {
      // Check if password and confirmPassword match
      if (password !== confirmPassword) {
        throw new Error('Password and Confirm Password do not match');
      }

      const response = await axios.post(`${apiUrl}/signup`, { name , username, email , password});
      return response.data;
    } catch (error) {
      console.error('Error during signup:', error);
      throw error;
    }
  },
};

export default ApiService;

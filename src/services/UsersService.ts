import axios from 'axios';

const apiUrl = 'http://localhost:8080'; // Adjust the API endpoint as needed

const UsersService = {
    getUserList : async () => {
        try {
            const response = await axios.get(`${apiUrl}/users`);
            return response.data;
          } catch (error) {
            // Handle error (e.g., show error message)
            console.error('Error during getting users list:', error);
            throw error;
          }
    }
};

export default UsersService;
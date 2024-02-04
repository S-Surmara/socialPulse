import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/friendship';

export const friendshipService = {
  sendFriendRequest: async (userId: number, friendId: number) => {
    try {
      const response = await axios.post(`${BASE_URL}/send-request`, {userId: userId , friendId: friendId , status: 'Pending'});

      return response.data;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  },
  acceptFriendRequest: async (userId: number, friendId: number) => {
    try {
      const response = await axios.post(`${BASE_URL}/accept-request`, {userId: friendId , friendId: userId , status: 'Accepted'});

      return response.data;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  },
  rejectFriendRequest: async (userId: number, friendId: number) => {
    try {
      const response = await axios.post(`${BASE_URL}/reject-request`, {userId: friendId , friendId: userId , status: 'Rejected'});
      return response.data;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  }
};

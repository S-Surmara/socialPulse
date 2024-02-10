// PostService.ts
import axios from 'axios';
import friendsList from '../MockData/friendsList.json'
const BASE_URL = 'http://localhost:8080/api/friendship';

export const friendsService = {

  getFrirndsList: async (userId: number) => {
    try{
      const response = await axios.get(`${BASE_URL}/${userId}/friends`);
      return response
    } catch {
      console.log("error while fetching friends List");
    }
  },

  getFriendsListJson: () => {
    try {
      // For now, simulate fetching posts from a JSON file
      const response = friendsList;
      return response;
    } catch (error) {
      console.error('Error fetching Friends list:', error);
      throw error;
    }
  }
};

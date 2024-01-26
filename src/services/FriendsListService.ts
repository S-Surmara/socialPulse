// PostService.ts
import axios from 'axios';
import friendsList from '../MockData/friendsList.json'

export const friendsService = {
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

import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

export const postService = {
  createPost: async (postData: FormData) => {
    try {
      const response = await axios.post(`${BASE_URL}/posts`, postData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  },

  getUserPosts: async (username: string) => {
    try {
      const url = `${BASE_URL}/user/${username}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching user posts:', error);
      throw error;
    }
  },

  getUserPostsJson: async () => {
    try {
      // For now, simulate fetching posts from a JSON file
      const response = await axios.get('/posts.json');
      return response.data;
    } catch (error) {
      console.error('Error fetching user posts:', error);
      throw error;
    }
  },
};

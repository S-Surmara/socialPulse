// PostService.ts
import axios from 'axios';

const BASE_URL = 'your_backend_base_url';

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

  getUserPosts: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/posts`);
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
  }
};

// ProfilePage.tsx
import React, { useEffect, useState } from 'react';
import { postService } from '../services/PostService';

// Define a type for a single post
type Post = {
  id: number;
  text: string;
  image?: string; // Optional image property
};

const ProfilePage: React.FC = () => {
  const [userPosts, setUserPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        debugger
        const data = await postService.getUserPostsJson();
        setUserPosts(data);
      } catch (error) {
        console.error('Error fetching user posts:', error);
      }
    };

    fetchUserPosts();
  }, []);

  return (
    <div>
      <h1>Your Profile</h1>
      {userPosts.map((post) => (
        <div key={post.id}>
          <p>{post.text}</p>
          {post.image && <img src={post.image} alt="Post" />}
        </div>
      ))}
    </div>
  );
};

export default ProfilePage;

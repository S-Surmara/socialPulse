// ProfilePage.tsx
import React, { useEffect, useState } from 'react';
import { postService } from '../services/PostService';
import './ProfilePage.scss';
import AppBar from '../components/AppBar/AppBar';
import { useProfileParams } from '../utilities/urlParams';

// Define a type for a single post
type Post = {
  id: number;
  text: string;
  image?: string; // Optional image property
};

const ProfilePage: React.FC = () => {
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const { id, name } = useProfileParams();

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const data = await postService.getUserPostsJson();
        setUserPosts(data);
      } catch (error) {
        console.error('Error fetching user posts:', error);
      }
    };

    fetchUserPosts();
  }, []);
  
  useEffect(() => {
    // Use userId and friendName in your component logic
    console.log('User ID:', id);
    console.log('Friend Name:', name);
  }, [id, name]);

  return (
    <>
    <AppBar buttonName='logOut'></AppBar>
    <div className="profile-container">
      <h1 className="profile-header">Your Profile</h1>
      {userPosts.map((post) => (
        <div className="post-container" key={post.id}>
          <p className="post-text">{post.text}</p>
          {post.image && <img className="post-image" src={post.image} alt="Post" />}
        </div>
      ))}
    </div>
    </>
  );
};

export default ProfilePage;

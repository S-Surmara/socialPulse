// ProfilePage.tsx
import React, { useEffect, useState } from 'react';
import { postService } from '../services/PostService';
import './ProfilePage.scss';
import AppBar from '../components/AppBar/AppBar';
import { useProfileParams } from '../utilities/urlParams';
import { useLocation } from 'react-router-dom';

// Define a type for a single post
type Post = {
  id: number;
  text: string;
  image?: number[]; // Optional image property
  username: string;
  imageDataUrl?: string; // Add imageDataUrl property
};

const ProfilePage: React.FC = () => {
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const { id, name } = useProfileParams();
  const location = useLocation();

  const convertByteArrayToDataUrl = (byteArray: number[] | undefined) => {
    debugger
    if (!byteArray || byteArray.length === 0) {
      return '';  // Return an empty string if byteArray is undefined or empty
    }
  
    const blob = new Blob([new Uint8Array(byteArray)], { type: 'image/jpeg' });
    const dataUrl = URL.createObjectURL(blob);
  
    return dataUrl;
  };
  

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const username = queryParams.get('user') || '';
    const fetchUserPosts = async () => {
      debugger
      try {
        const data = await postService.getUserPosts(username);
        const postsWithImageData = data.map((post: Post) => {
          const imageDataUrl = "data:image/png;base64," + post.image;
          return { ...post, imageDataUrl };
        });
        setUserPosts(postsWithImageData);
      } catch (error) {
        console.error('Error fetching user posts:', error);
      }
    };

    fetchUserPosts();
  }, [location.search]);

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
            {post.image && <img className="post-image" src={post.imageDataUrl} alt="Post" />}
          </div>
        ))}
      </div>
    </>
  );
};

export default ProfilePage;

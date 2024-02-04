// ProfilePage.tsx
import React, { useEffect, useState } from 'react';
import { postService } from '../services/PostService';
import './ProfilePage.scss';
import AppBar from '../components/AppBar/AppBar';
import { useProfileParams } from '../lib/urlParams';
import { useLocation } from 'react-router-dom';
import { useCustomCookie } from '../lib/cookie';
import { friendshipService } from '../services/FriendshipService';

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
  const { profileName, profileId } = useProfileParams();
  const [ frndReq , setFrndReq ] = useState<'success' | 'reject' | 'pending'>('reject');
  const [ disableFrndReq , setDisableFrndReq ] = useState(true);
  const location = useLocation();
  const { get } = useCustomCookie();

  useEffect(() => {
    const userId = parseInt(get('userId') , 10);
    if(frndReq === 'reject' && userId!= profileId){
      setDisableFrndReq(false);
    } else{
      setDisableFrndReq(true);
    }
  },[]);


  useEffect(() => {
    const username = profileName || '';
    const fetchUserPosts = async () => {
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

  const handleAddFriendClick = async () => {
    const userId = parseInt(get('userId') , 10);
    const friendId = profileId;
    let response = userId && friendId && await friendshipService.sendFriendRequest(userId,friendId);
    response && response.response === "success" && setFrndReq('pending');
    setDisableFrndReq(true);
    console.log(frndReq);
  };

  return (
    <>
      <AppBar buttonName='logOut'></AppBar>
      <div className="profile-container">
        <h1 className="profile-header">{profileName} Profile</h1>
        <button className="add-friend-button" onClick={handleAddFriendClick} disabled={disableFrndReq}>
                {frndReq==="pending" ? <p>Pending</p> : <p>Add Friend</p>}
        </button>
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

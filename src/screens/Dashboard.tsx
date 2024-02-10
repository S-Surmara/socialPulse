// Dashboard.tsx

import React, { useEffect, useState } from 'react';
import './Dashboard.scss';
import AppBar from '../components/AppBar/AppBar';
import PostElement from '../components/PostElement/PostElement';
import { friendsService } from '../services/FriendsListService';
import { useHistory } from 'react-router-dom';
import UsersService from '../services/UsersService';
import { useCustomCookie } from '../lib/cookie';
import { postService } from '../services/PostService';
import { Post } from './ProfilePage';

export interface FriendList {
  "id": number,
  "name": string,
  "username": string,
  "email": string
}

export interface UsersList {
  "id": number,
  "name": string;
  "username": string;
}

const Dashboard: React.FC = () => {
  const [friendsList, setFriendsList] = useState<FriendList[]>([]);
  const [usersList, setUsersList] = useState<UsersList[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');
  const [friendsPost, setFriendsPosts] = useState<Post[][]>([]);
  const history = useHistory(); // Initialize useHistory
  const { get } = useCustomCookie();

  useEffect(() => {
    const userId = get('userId');
    const fetchFriendsList = async () => {
      try {
        const response = await friendsService.getFrirndsList(parseInt(userId));
        setFriendsList(response?.data);
      } catch (error) {
        alert('Error fetching Friends list:');
      }
    };

    const fetchUsersList = async () => {
      try {
        const response = await UsersService.getUserList();
        setUsersList(response);
      } catch {
        alert("error while fetching users list");
      }
    }

    fetchFriendsList();
    fetchUsersList();
    console.log('friends list=', friendsList)
  }, []);

  useEffect(() => {
    const fetchFriendsPosts = async () => {
      const newPosts = await Promise.all(
        friendsList.map(async (friend) => {
          try {
            const data = await postService.getUserPosts(friend.username);
            return data.map((post: Post) => {
              const imageDataUrl = "data:image/png;base64," + post.image;
              return { ...post, imageDataUrl };
            });
          } catch (error) {
            console.error('Error fetching user posts:', error);
            return [];
          }
        })
      );

      setFriendsPosts((prevPosts) => [...prevPosts, ...newPosts]);
    };

    fetchFriendsPosts();
  }, [friendsList]);


  const navigateToProfile = (friendId: number, friendName: string) => {
    // Use history.push to navigate to the profile page with user ID and name as URL params
    history.push(`/profile?s=s&profileId=${friendId}&profileName=${encodeURIComponent(friendName)}`);
  };

  const renderFriendsList = () => (
    <>
      {friendsList.map((friend) => (
        friend.name.toLowerCase().includes(searchInput.toLowerCase()) ?
          <div className="post-container" key={friend.id} onClick={() => navigateToProfile(friend.id, friend.name)}>
            <div className="friend-name">{friend.name}</div>
            <div className="friend-username">@{friend.username}</div>
          </div>
          :
          <></>
      ))}
    </>
  );

  const renderLeftPane = () => {
    return (
      <div className="left-pane">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>

        <div className="friends-list">
          {renderFriendsList()}
        </div>
      </div>
    );
  };

  const renderFriendsPosts = () => {
    return (
      <>
        {friendsPost.map((friendPosts) => (
          friendPosts.map((post) => (
            <div className="post-container" key={post.id}>
              <p>@{post.username}</p>
              <p className="post-text">{post.text}</p>
              {post.image && <img className="post-image" src={post.imageDataUrl} alt="Post" />}
            </div>
          ))
        ))}
      </>
    );
  };


  const renderMiddlePane = () => {
    return (
      <div className="middle-pane">
        <PostElement></PostElement>
        <div className="posts">
          <h2>Posts from Friends</h2>
          {/* Add your post components here */}
          {renderFriendsPosts()}
        </div>
      </div>
    );
  };
  return (
    <div className="dashboard">
      {/* AppBar */}
      <div className='appBar'>
        <AppBar buttonName="profile" usersList={usersList} />
      </div>

      {/* Rest of the dashboard content */}
      <div className='content'>
        {renderLeftPane()}
        {renderMiddlePane()}
      </div>
    </div>
  );
};

export default Dashboard;

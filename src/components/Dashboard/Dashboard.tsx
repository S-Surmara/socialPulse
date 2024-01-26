// Dashboard.tsx

import React, { useEffect, useState } from 'react';
import './Dashboard.scss';
import AppBar from '../AppBar/AppBar';
import PostElement from '../PostElement/PostElement';
import { friendsService } from '../../services/FriendsListService';
import { useHistory } from 'react-router-dom';

interface FriendList {
  "id": string,
  "name": string
}

const Dashboard: React.FC = () => {
  const [friendsList, setFriendsList] = useState<FriendList[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');
  const history = useHistory(); // Initialize useHistory

  useEffect(() => {
    const fetchFriendsList = async () => {
      try {
        const response = friendsService.getFriendsListJson();
        setFriendsList(response);
      } catch (error) {
        console.error('Error fetching Friends list:', error);
      }
    };

    fetchFriendsList();
  }, []);

  const navigateToProfile = (friendId: string, friendName: string) => {
    // Use history.push to navigate to the profile page with user ID and name as URL params
    history.push(`/profile?id=${friendId}&name=${encodeURIComponent(friendName)}`);
  };

  const renderFriendsList = () => (
    <>
      {friendsList.map((friend) => (
        friend.name.toLowerCase().includes(searchInput.toLowerCase()) ?
          <div className="post-container" key={friend.id} onClick={() => navigateToProfile(friend.id, friend.name)}>
            <p className="post-text">{friend.name}</p>
          </div>
          :
          <></>
      ))}
    </>
  );

  const renderLeftPane = () => {
    return (
      <div className="left-pane">
        {/* Navigation Icons */}
        <div className="navigation-icons">
          <p>Icon 1</p>
          <p>Icon 2</p>
          <p>Icon 3</p>
        </div>
      </div>
    );
  };

  const renderMiddlePane = () => {
    return (
      <div className="middle-pane">
        <PostElement></PostElement>
        <div className="posts">
          <h2>Posts from Friends</h2>
          {/* Add your post components here */}
        </div>
      </div>
    );
  };

  const renderRightPane = () => {
    return (
      <div className="right-pane">
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
  return (
    <div className="dashboard">
      {/* AppBar */}
      <div className='appBar'>
        <AppBar buttonName="profile" />
      </div>

      {/* Rest of the dashboard content */}
      <div className='content'>
        {renderLeftPane()}
        {renderMiddlePane()}
        {renderRightPane()}
      </div>
    </div>
  );
};

export default Dashboard;

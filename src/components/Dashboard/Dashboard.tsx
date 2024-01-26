// Dashboard.tsx

import React from 'react';
import './Dashboard.scss';
import AppBar from '../AppBar/AppBar';
import PostElement from '../PostElement/PostElement';

const Dashboard: React.FC = () => {

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
          <input type="text" placeholder="Search" />
        </div>

        <div className="friends-list">
          <p>Friend 1</p>
          <p>Friend 2</p>
          {/* Add more friends as needed */}
        </div>
      </div>
    );
  };
  return (
    <div className="dashboard">
      {/* AppBar */}
      <div className='appBar'>
        <AppBar />
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

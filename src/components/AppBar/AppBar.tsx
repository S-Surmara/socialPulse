import React from 'react';
import './AppBar.scss'; // Import your custom Sass file
import { useHistory } from 'react-router-dom';

const NavBar: React.FC = () => {
  const history = useHistory();
  const handleProfileclick = () => {
    history.push('/profile');
  };

  return (
    <nav className="custom-navbar">
      <div className="container">
        <a className="logo" href="#">Your Logo</a>

        <div className="nav-items">
          {/* Search bar form */}
          <form className="search-form">
            <input className="search-input" type="search" placeholder="Search" aria-label="Search" />
            <button className="search-button" type="submit">Search</button>
          </form>

          {/* Profile icon button */}
          <button type="button" className="profile-button" onClick={handleProfileclick}>
            <span>Profile</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

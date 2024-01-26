import React from 'react';
import './AppBar.scss'; // Import your custom Sass file
import { useHistory } from 'react-router-dom';

interface AppBarType {
  buttonName : string
}

const NavBar = (props: AppBarType) => {
  const buttonName = props.buttonName;
  const history = useHistory();
  const handleProfileclick = () => {
    (buttonName === "profile") ? history.push('/profile') : history.push('/');
  };

  const handleNavBarButton = () => {
    return(
      <button type="button" className="profile-button" onClick={handleProfileclick}>
        <span>{buttonName === "profile"? "Profile" : "logout"}</span>
      </button>
    )
  };

  return (
    <nav className="custom-navbar">
      <div className="container">
        <a className="logo" href="#">My Logo</a>

        <div className="nav-items">
          {/* Search bar form */}
          <form className="search-form">
            <input className="search-input" type="search" placeholder="Search" aria-label="Search" />
            <button className="search-button" type="submit">Search</button>
          </form>

          {handleNavBarButton()}

        </div>
      </div>
    </nav>
  );
};

export default NavBar;

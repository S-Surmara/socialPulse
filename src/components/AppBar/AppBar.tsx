import React, { useState } from 'react';
import './AppBar.scss'; // Import your custom Sass file
import { useHistory } from 'react-router-dom';
import UsersService from '../../services/UsersService';
import { UsersList } from '../../screens/Dashboard';
import { useCustomCookie } from '../../lib/cookie';

export interface AppBarType {
  usersList?: UsersList[],
  buttonName : string
}

const NavBar = (props: AppBarType) => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [suggestions, setSuggestions] = useState<UsersList[] | undefined>([]);
  const { get } = useCustomCookie();
  const buttonName = props.buttonName;
  const history = useHistory();
  const handleProfileClick = (profileName: string) => {
    (buttonName === "profile") ? history.push(`/profile?user=${profileName}`) : history.push('/');
  };

  const handleNavBarButton = () => {
    const username = get('username');
    return(
      <button type="button" className="profile-button" onClick={() => handleProfileClick(username)}>
        <span>{buttonName === "profile"? "Profile" : "logout"}</span>
      </button>
    )
  };

  const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setSearchInput(input);
      
    const suggestions: UsersList[] | undefined  = props.usersList;

    setSuggestions(
      suggestions?.filter(
        (user) =>
          user.name.toLowerCase().includes(input.toLowerCase()) ||
          user.username.toLowerCase().includes(input.toLowerCase())
      )
    );
  };

  const renderSuggestionList = () => {
    if(!suggestions?.length || !searchInput.length) return (<></>);  
    return (
      <ul className="suggestions-list">
        {suggestions?.map((user) => (
          <li key={user.username} onClick={() => handleProfileClick(user.username)}>
            <div className="suggestion-name">{user.name}</div>
            <div className="suggestion-username">@{user.username}</div>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <nav className="custom-navbar">
      <div className="container">
        <a className="logo" href="#">
        <img className='Logoimage' src='../../logo.png' alt='Social Pulse logo' style={{ width: '40px', height: 'auto' ,borderRadius: '50%'}} />

        </a>

        <div className="nav-items">
          {/* Search bar form */}
          <form className="search-form">
            <input className="search-input" type="search" placeholder="Search" aria-label="Search" onChange={handleSearchChange}/>
            {/* <button className="search-button" type="submit">Search</button> */}
          </form>
          {renderSuggestionList()}

          {handleNavBarButton()}

        </div>
      </div>
    </nav>
  );
};

export default NavBar;

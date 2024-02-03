import React, { useState } from 'react';
import './AppBar.scss'; // Import your custom Sass file
import { useHistory } from 'react-router-dom';
import UsersService from '../../services/UsersService';

interface AppBarType {
  buttonName : string
}

interface SuggestedUser {
  name: string,
  username: string
}

const NavBar = (props: AppBarType) => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [suggestions, setSuggestions] = useState<SuggestedUser[]>([]);
  const buttonName = props.buttonName;
  const history = useHistory();
  const handleProfileClick = (profileName: string) => {
    (buttonName === "profile") ? history.push(`/profile/${profileName}`) : history.push('/');
  };

  const handleNavBarButton = () => {
    return(
      <button type="button" className="profile-button" onClick={() => handleProfileClick('self')}>
        <span>{buttonName === "profile"? "Profile" : "logout"}</span>
      </button>
    )
  };

  const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setSearchInput(input);

    //TODO : get from service call . 
    let response = null;
    try{
      response = await UsersService.getUserList();
    } catch{
      alert("error while fetching users list");
    }
      
    const suggestions: SuggestedUser[]  = response;

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
        <a className="logo" href="#">My Logo</a>

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

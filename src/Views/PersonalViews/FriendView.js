import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getFriend } from '../../Helpers/Data/FriendData';
import FriendCards from '../../Components/FriendCardComponent';
import './VStyles/UsersView.scss';

function FriendView({
  user,
  setUser,
}) {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    getFriend().then((response) => setFriends(response));
  }, []);
  return (
    <div className="usersView">
      <form action="/" method="get" className="searchUsers">
        <label htmlFor="header-search"></label>
        <input
          type="text"
          id="header-search"
          placeholder="Search Users"
          name="s"
          className="input"
        />
        <button className="searchUsersButton" type="submit">Search</button>
      </form>
      {friends.map((friendInfo) => (
        <FriendCards
          key={friendInfo.firebaseKey}
          {...friendInfo}
          setFriends={setFriends}
          user={user}
          setUser={setUser}
        />
      ))}
    </div>
  );
}

FriendView.propTypes = {
  user: PropTypes.any,
  setUser: PropTypes.func,
};

export default FriendView;

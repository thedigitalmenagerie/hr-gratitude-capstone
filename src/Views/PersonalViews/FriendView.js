import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { mergedUserFriendData } from '../../helpers/data/FriendData';
import FriendCards from '../../Components/PersonalComponents/FriendCardComponent';
import './VStyles/UsersView.scss';

function FriendView({
  user,
  setUser,
}) {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    mergedUserFriendData(friends.friendKey).then((response) => setFriends(response));
  }, []);
  return (
    <div className="usersView">
      <form action="/" method="get" className="searchUsers">
        <label htmlFor="header-search"></label>
        <input
          type="text"
          id="header-search"
          placeholder="Search Your Friends"
          name="s"
          className="input"
        />
      </form>
      {friends?.map((friendInfo) => (
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

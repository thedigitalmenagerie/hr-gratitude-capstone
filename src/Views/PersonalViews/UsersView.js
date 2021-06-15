import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getUser } from '../../helpers/data/UserData';
import UserCards from '../../Components/PersonalComponents/UserCardComponent';
import './VStyles/UsersView.scss';

function UsersView({
  user,
  setUser,
}) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUser().then((response) => setUsers(response));
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
      {users?.map((userInfo) => (
        <UserCards
          key={userInfo.firebaseKey}
          {...userInfo}
          setUsers={setUsers}
          user={user}
          setUser={setUser}
        />
      ))}
    </div>
  );
}

UsersView.propTypes = {
  user: PropTypes.any,
  setUser: PropTypes.func,
};

export default UsersView;

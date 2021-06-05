import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getUser } from '../Helpers/Data/UserData';
import UserCards from '../Components/UserCardComponent';
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
    <div className="UsersView">
      {users.map((userInfo) => (
        <UserCards
          key={userInfo.firebaseKey}
          firebaseKey={userInfo.firebaseKey}
          fullName={userInfo.fullName}
          profileImage={userInfo.profileImage}
          uid={userInfo.uid}
          userEmail={userInfo.userEmail}
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

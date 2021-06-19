import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { mergedUserFriendData } from '../../helpers/data/FriendData';
import SpecificFriendCards from '../../Components/FriendComponents/SpecificFriendCardComponent';
import './VStyles/SpecificFriendView.scss';

function SpecificFriendView({
  user,
  setUser,
}) {
  const [specificFriends, setSpecificFriends] = useState([]);

  useEffect(() => {
    mergedUserFriendData(specificFriends.friendKey).then((response) => setSpecificFriends(response));
  }, []);
  return (
    <div className="specificFriedView">
      {specificFriends?.map((friendInfo) => (
        <SpecificFriendCards
        key={friendInfo.firebaseKey}
        {...friendInfo}
        setSpecificFriends={setSpecificFriends}
        friendKey={specificFriends.friendKey}
        user={user}
        setUser={setUser}
      />
      ))}
    </div>
  );
}

SpecificFriendView.propTypes = {
  user: PropTypes.any,
  setUser: PropTypes.func,
  friendKey: PropTypes.string,
};

export default SpecificFriendView;

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Typing from 'react-typing-animation';
import { animations } from 'react-animation';
import { mergedUserFriendData } from '../../helpers/data/FriendData';
import SpecificFriendCards from '../../Components/FriendComponents/SpecificFriendCardComponent';

function SpecificFriendView({
  user,
  setUser,
}) {
  const [specificFriends, setSpecificFriends] = useState([]);

  useEffect(() => {
    mergedUserFriendData(specificFriends.friendKey).then((response) => setSpecificFriends(response));
  }, []);
  return (
    <div className="specificFriendView" style={{ animation: animations.fadeIn }}>
      <Typing><h1 className="text-center my-3"> Friend</h1></Typing>
      {specificFriends?.map((friendInfo) => (
        <SpecificFriendCards
        key={friendInfo.firebaseKey}
        {...friendInfo}
        setSpecificFriends={setSpecificFriends}
        friendKey={specificFriends.friendKey}
        user={user}
        setUser={setUser}
        specificFriends={specificFriends}
      />
      ))}
    </div>
  );
}

SpecificFriendView.propTypes = {
  user: PropTypes.any,
  setUser: PropTypes.func,
  friendKey: PropTypes.string,
  specificFriends: PropTypes.any,
};

export default SpecificFriendView;

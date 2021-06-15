import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SpecificFriendCard from '../../Components/PersonalComponents/ItemCardComponent';
import { getSpecificFriend } from '../../helpers/data/FriendData';

export default function SingleCategoryView({ user }) {
  const [specificFriend, setSpecificFriend] = useState([]);
  useEffect(() => {
    getSpecificFriend(user).then((response) => setSpecificFriend(response));
  }, []);
  return (
    <div className="categoryItemView">
        {specificFriend.map((friend) => (
          <SpecificFriendCard
            key={friend.firebaseKey}
            specificFriend={specificFriend}
            user={user}
            {...friend}
          />
        ))}
      </div>
  );
}

SingleCategoryView.propTypes = {
  user: PropTypes.any
};

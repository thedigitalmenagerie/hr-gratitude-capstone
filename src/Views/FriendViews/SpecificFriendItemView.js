import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import StackGrid from 'react-stack-grid';
import { getItem } from '../../helpers/data/ItemData';
import { mergedUserFriendData } from '../../helpers/data/FriendData';
import SpecificFriendItemCards from '../../Components/FriendComponents/SpecificFriendItemCardComponent';

const SpecificFriendItemView = ({
  user,
  setUser,
}) => {
  const [friendsForItems, setFriendsForItems] = useState([]);
  const [items, setItems] = useState([]);
  const { uid } = useParams();

  useEffect(() => {
    mergedUserFriendData(friendsForItems.friendKey).then((response) => setFriendsForItems(response));
    getItem(uid).then((response) => setItems(response));
  }, []);

  return (
    <div className="itemView">
        <StackGrid className="stackGridItems" gutterHeight={10}>
              {items?.map((friendItemInfo) => (
              <SpecificFriendItemCards
                key={friendItemInfo.firebaseKey}
                {...friendItemInfo}
                user={user}
                setUser={setUser}
                setFriendsForItems={setFriendsForItems}
                friendKey={friendItemInfo.friendKey}
                friendsForItems={friendsForItems}
              />
              ))}
          </StackGrid>
            </div>
  );
};

SpecificFriendItemView.propTypes = {
  user: PropTypes.any,
  setUser: PropTypes.func,
  friendKey: PropTypes.string,
};

export default SpecificFriendItemView;

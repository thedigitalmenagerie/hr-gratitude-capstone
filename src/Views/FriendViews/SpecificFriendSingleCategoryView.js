import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import StackGrid from 'react-stack-grid';
import { getCategoryItems } from '../../helpers/data/CategoryItemData';
import { mergedUserFriendData } from '../../helpers/data/FriendData';
import SpecificFriendItemCards from '../../Components/FriendComponents/SpecificFriendItemCardComponent';

export default function SpecificFriendSingleCategoryView({
  user,
  setUser,
}) {
  const [friendsForCategoryItems, setFriendsForCategoryItems] = useState([]);
  const [categoryItems, setCategoryItems] = useState([]);
  const { uid, categoryKey } = useParams();

  useEffect(() => {
    mergedUserFriendData(friendsForCategoryItems.friendKey).then((response) => setFriendsForCategoryItems(response));
    getCategoryItems(uid, categoryKey).then((response) => setCategoryItems(response));
  }, []);

  return (
        <StackGrid className="stackGridCategories" gutterHeight={10}>
              {categoryItems?.map((friendCategoryItemInfo) => (
              <SpecificFriendItemCards
                key={friendCategoryItemInfo.firebaseKey}
                {...friendCategoryItemInfo}
                user={user}
                setUser={setUser}
                setFriendsForCategoryItems={setFriendsForCategoryItems}
                friendKey={friendCategoryItemInfo.friendKey}
                friendsForCategories={friendsForCategoryItems}
                categoryKey={friendsForCategoryItems.categoryKey}
              />
              ))}
          </StackGrid>
  );
}

SpecificFriendSingleCategoryView.propTypes = {
  user: PropTypes.any,
  setUser: PropTypes.func,
};

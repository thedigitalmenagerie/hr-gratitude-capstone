import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Typing from 'react-typing-animation';
import { useParams } from 'react-router-dom';
import { animations } from 'react-animation';
import { getCategoryItems } from '../../helpers/data/CategoryItemData';
import { mergedUserFriendData } from '../../helpers/data/FriendData';
import SpecificFriendItemCards from '../../Components/FriendComponents/SpecificFriendItemCardComponent';
import './VStyles/SpecificFriendSingleCategoryView.scss';

export default function SpecificFriendSingleCategoryView({
  user,
  setUser,
}) {
  const [friendsForCategoryItems, setFriendsForCategoryItems] = useState([]);
  const [categoryItems, setCategoryItems] = useState([]);
  const { categoryKey } = useParams();
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState('');

  useEffect(() => {
    mergedUserFriendData(friendsForCategoryItems.friendKey).then((response) => setFriendsForCategoryItems(response));
    getCategoryItems(categoryKey).then((response) => setCategoryItems(response));
  }, []);

  useEffect(() => {
    setFilteredData(
      categoryItems.filter((categoryItem) => categoryItem.itemName.toLowerCase().includes(search.toLowerCase()))
    );
  }, [search, categoryItems]);

  return (
    <div id="friendCategoryItemView" style={{ animation: animations.fadeIn }}>
      { categoryItems.length === 0
        ? <Typing><h5 className="text-center my-3">No items found with that name!</h5></Typing>
        : <div className="innerContainer">
            <div className="searchAndCardContainer">
              <Typing><h1 className="text-center my-3">Friend Category Items</h1></Typing>
              <div className="searchContainer">
                <input type="search" id="search" placeholder="Search" aria-describedby="button-addon" className="form-control" onChange={(e) => setSearch(e.target.value)}/>
              </div>
              <div className="friendItemCardContainer" gutterHeight={10}>
              {filteredData?.map((friendCategoryItemInfo) => (
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
          </div>
            </div>
          </div>
      }
    </div>

  );
}

SpecificFriendSingleCategoryView.propTypes = {
  user: PropTypes.any,
  setUser: PropTypes.func,
};

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
    <div>
      { filteredData.length === 0
        ? <div className="d-flex flex-column justify-content-center">
            <h5 className="text-center my-3">No items found with that name!</h5>
          </div>
        : <div>
            <div className="d-flex flex-column justify-content-center">
              <h1 className="text-center my-3">All Items</h1>
              <div className="form-group mb-4 d-flex justify-content-center">
                <input type="search" id="search" placeholder="Search by item name..." aria-describedby="button-addon" className="form-control" onChange={(e) => setSearch(e.target.value)}/>
              </div>
              <StackGrid className="stackGridCategories" gutterHeight={10}>
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
          </StackGrid>
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

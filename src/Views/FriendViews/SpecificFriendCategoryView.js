import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import StackGrid from 'react-stack-grid';
import { getCategory } from '../../helpers/data/CategoryData';
import { mergedUserFriendData } from '../../helpers/data/FriendData';
import SpecificFriendCategoryCards from '../../Components/FriendComponents/SpecificFriendCategoryCardComponent';

export default function SpecificFriendCategoryView({
  user,
  setUser,
}) {
  const [friendsForCategories, setFriendsForCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const { uid } = useParams();
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState('');

  useEffect(() => {
    mergedUserFriendData(friendsForCategories.friendKey).then((response) => setFriendsForCategories(response));
    getCategory(uid).then((response) => setCategories(response));
  }, []);

  useEffect(() => {
    setFilteredData(
      categories.filter((category) => category.categoryName.toLowerCase().includes(search.toLowerCase()))
    );
  }, [search, categories]);

  return (
    <div className="categoryView">
      { filteredData.length === 0
        ? <div className="d-flex flex-column justify-content-center">
            <h5 className="text-center my-3">No items found with that name!</h5>
          </div>
        : <div>
            <div className="d-flex flex-column justify-content-center">
              <h1 className="text-center my-3">All Categories</h1>
              <div className="form-group mb-4 d-flex justify-content-center">
                <input type="search" id="search" placeholder="Search by category name..." aria-describedby="button-addon" className="form-control" onChange={(e) => setSearch(e.target.value)}/>
              </div>
              <StackGrid className="stackGridCategories" gutterHeight={10}>
              {filteredData?.map((friendCategoryInfo) => (
              <SpecificFriendCategoryCards
                key={friendCategoryInfo.firebaseKey}
                {...friendCategoryInfo}
                user={user}
                setUser={setUser}
                setFriendsForCategories={setFriendsForCategories}
                friendKey={friendCategoryInfo.friendKey}
                friendsForCategories={friendsForCategories}
              />
              ))}
          </StackGrid>
            </div>
          </div>
      }
            </div>
  );
}

SpecificFriendCategoryView.propTypes = {
  user: PropTypes.any,
  setUser: PropTypes.func,
  categories: PropTypes.any,
  setCategories: PropTypes.func,
  friendKey: PropTypes.string,
};

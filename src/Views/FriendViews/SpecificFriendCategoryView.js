import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Typing from 'react-typing-animation';
import { animations } from 'react-animation';
import { useParams } from 'react-router-dom';
import { getCategory } from '../../helpers/data/CategoryData';
import { mergedUserFriendData } from '../../helpers/data/FriendData';
import SpecificFriendCategoryCards from '../../Components/FriendComponents/SpecificFriendCategoryCardComponent';
import './VStyles/SpecificFriendCategoryView.scss';

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
    <div className="friendCategoryView" style={{ animation: animations.fadeIn }}>
      { categories.length === 0
        ? <div className="d-flex flex-column justify-content-center">
            <Typing><h5 className="text-center my-3">No items found with that name!</h5></Typing>
          </div>
        : <div className="innerContainer">
            <div className="searchAndCardContainer">
              <Typing><h1 className="text-center my-3">Friend Categories</h1></Typing>
                <div className="searchContainer">
                <input type="search" id="search" placeholder="Search" aria-describedby="button-addon" className="form-control" onChange={(e) => setSearch(e.target.value)}/>
              </div>
              <div className="categoryCardContainer">
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
          </div>
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

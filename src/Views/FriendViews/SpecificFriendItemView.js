import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Typing from 'react-typing-animation';
import { animations } from 'react-animation';
import { useParams } from 'react-router-dom';
import { getItem } from '../../helpers/data/ItemData';
import { mergedUserFriendData } from '../../helpers/data/FriendData';
import SpecificFriendItemCards from '../../Components/FriendComponents/SpecificFriendItemCardComponent';
import './VStyles/SpecificFriendItemView.scss';

const SpecificFriendItemView = ({
  user,
  setUser,
}) => {
  const [friendsForItems, setFriendsForItems] = useState([]);
  const [items, setItems] = useState([]);
  const { uid } = useParams();
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState('');

  useEffect(() => {
    mergedUserFriendData(friendsForItems.friendKey).then((response) => setFriendsForItems(response));
    getItem(uid).then((response) => setItems(response));
  }, []);

  useEffect(() => {
    setFilteredData(
      items.filter((item) => item.itemName.toLowerCase().includes(search.toLowerCase()))
    );
  }, [search, items]);

  return (
    <div className="friendItemView" style={{ animation: animations.fadeIn }}>
      { items.length === 0
        ? <Typing><h5 className="text-center my-3">No items found with that name!</h5></Typing>
        : <div className="innerContainer">
            <div className="searchAndCardContainer">
              <Typing><h1 className="text-center my-3">Friend Items</h1></Typing>
              <div className="searchContainer">
                <input type="search" id="search" placeholder="Search" aria-describedby="button-addon" className="form-control" onChange={(e) => setSearch(e.target.value)}/>
              </div>
              <div className="friendItemCards">
              {filteredData?.map((friendItemInfo) => (
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
          </div>
            </div>
          </div>
      }
            </div>
  );
};

SpecificFriendItemView.propTypes = {
  user: PropTypes.any,
  setUser: PropTypes.func,
  friendKey: PropTypes.string,
};

export default SpecificFriendItemView;

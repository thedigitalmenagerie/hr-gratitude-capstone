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
    <div className="itemView">
      { filteredData.length === 0
        ? <div className="d-flex flex-column justify-content-center">
            <h5 className="text-center my-3">No items found with that name!</h5>
          </div>
        : <div>
            <div className="d-flex flex-column justify-content-center">
              <h1 className="text-center my-3">All Events</h1>
              <div className="form-group mb-4 d-flex justify-content-center">
                <input type="search" id="search" placeholder="Search by event name..." aria-describedby="button-addon" className="form-control" onChange={(e) => setSearch(e.target.value)}/>
              </div>
              <StackGrid className="stackGridItems" gutterHeight={10}>
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
          </StackGrid>
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

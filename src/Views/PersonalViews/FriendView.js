import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { mergedUserFriendData } from '../../helpers/data/FriendData';
import FriendCards from '../../Components/PersonalComponents/FriendCardComponent';
import './VStyles/UsersView.scss';

function FriendView({
  user,
  setUser,
}) {
  const [friends, setFriends] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState('');

  useEffect(() => {
    mergedUserFriendData(friends.friendKey).then((response) => setFriends(response));
  }, []);

  useEffect(() => {
    setFilteredData(
      friends.filter((friend) => friend.fullName.toLowerCase().includes(search.toLowerCase()))
    );
  }, [search, friends]);

  return (
    <div className="usersView">
      { filteredData.length === 0
        ? <div className="d-flex flex-column justify-content-center">
            <h5 className="text-center my-3">No items found with that name!</h5>
          </div>
        : <div>
            <div className="d-flex flex-column justify-content-center">
              <h1 className="text-center my-3">All Items</h1>
              <div className="form-group mb-4 d-flex justify-content-center">
                <input type="search" id="search" placeholder="Search by user's name..." aria-describedby="button-addon" className="form-control" onChange={(e) => setSearch(e.target.value)}/>
              </div>
              {filteredData?.map((friendInfo) => (
        <FriendCards
          key={friendInfo.firebaseKey}
          {...friendInfo}
          setFriends={setFriends}
          user={user}
          setUser={setUser}
        />
              ))}
            </div>
          </div>
      }
    </div>
  );
}

FriendView.propTypes = {
  user: PropTypes.any,
  setUser: PropTypes.func,
};

export default FriendView;

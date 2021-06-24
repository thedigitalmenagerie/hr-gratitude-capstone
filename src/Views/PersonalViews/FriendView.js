import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Typing from 'react-typing-animation';
import { animations } from 'react-animation';
import ClipLoader from 'react-spinners/ClipLoader';
import { mergedUserFriendData } from '../../helpers/data/FriendData';
import FriendCards from '../../Components/PersonalComponents/FriendCardComponent';
import { getUser } from '../../helpers/data/UserData';
import './VStyles/UsersView.scss';

function FriendView({
  user,
  setUser,
}) {
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState('');

  useEffect(() => {
    getUser(user?.uid).then((response) => console.warn(response));
    mergedUserFriendData(friends.friendKey).then((response) => setFriends(response));
    setLoading(false);
  }, []);

  useEffect(() => {
    setFilteredData(
      friends.filter((friend) => friend.fullName.toLowerCase().includes(search.toLowerCase()))
    );
    setLoading(false);
  }, [search, friends]);

  return (
    <div className="usersView" style={{ animation: animations.fadeIn }}>
      { loading
        ? <div className="loading">
            <Typing><h6 className="">Just a sec.</h6></Typing>
            <ClipLoader color="#ffffff" loading={loading} size={150} className="spinner" />
          </div>
        : <div className="innerContainer" >
            { friends.length === 0
              ? <Typing><h5 className="text-center my-3">Not your friend</h5></Typing>
              : <div>
                  <div className="searchAndCardContainer">
                    <Typing><h1 className="text-center my-3">Your Friends</h1></Typing>
                    <div className="searchContainer">
                      <input type="search" id="search" placeholder="Search" aria-describedby="button-addon" className="form-control" onChange={(e) => setSearch(e.target.value)}/>
                    </div>
                       <div>
                        {filteredData?.map((friendInfo) => (
                          <FriendCards
                            key={friendInfo.firebaseKey}
                            {...friendInfo}
                            setFriends={setFriends}
                            user={user}
                            setUser={setUser}
                          />
                        ))}</div>
                       <div></div>
                  </div>
                </div>
            }
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

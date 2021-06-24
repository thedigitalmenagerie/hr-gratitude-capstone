import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ClipLoader from 'react-spinners/ClipLoader';
import Typing from 'react-typing-animation';
import { animations } from 'react-animation';
import { getUser } from '../../helpers/data/UserData';
import UserCards from '../../Components/PersonalComponents/UserCardComponent';
import './VStyles/UsersView.scss';

function UsersView({
  user,
  setUser,
}) {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState('');

  useEffect(() => {
    getUser(user?.uid).then((response) => setUsers(response));
    setLoading(false);
  }, []);

  useEffect(() => {
    setFilteredData(
      users.filter((oneUser) => oneUser.fullName.toLowerCase().includes(search.toLowerCase()))
    );
    setLoading(false);
  }, [search, users]);

  return (
    <div>
      { loading
        ? <div className="loading">
            <Typing><h6 className="">Just a sec.</h6></Typing>
            <ClipLoader color="#b6b34b" loading={loading} size={150} className="spinner" />
          </div>
        : <div className="usersView" style={{ animation: animations.fadeIn }}>
      { users.length === 0
        ? <div className="d-flex flex-column justify-content-center">
            <Typing><h5 className="text-center my-3">No user found with that name!</h5></Typing>
          </div>
        : <div className="innerContainer">
            <div className="searchAndCardContainer">
              <Typing><h1 className="text-center my-3">All Users</h1></Typing>
              <div className="searchContainer">
                <input type="search" id="search" placeholder="Search" aria-describedby="button-addon" className="form-control" onChange={(e) => setSearch(e.target.value)}/>
              </div>
              <div className="cardContainer">
                {filteredData?.map((userInfo) => (
                  <UserCards
                      key={userInfo.firebaseKey}
                      {...userInfo}
                      setUsers={setUsers}
                      user={user}
                      setUser={setUser}
                  />
                ))}
              </div>
            </div>
          </div>
      }
    </div> }</div>
  );
}

UsersView.propTypes = {
  user: PropTypes.any,
  setUser: PropTypes.func,
};

export default UsersView;

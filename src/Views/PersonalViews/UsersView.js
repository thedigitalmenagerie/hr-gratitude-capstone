import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StackGrid from 'react-stack-grid';
import { getUser } from '../../helpers/data/UserData';
import UserCards from '../../Components/PersonalComponents/UserCardComponent';
import './VStyles/UsersView.scss';

function UsersView({
  user,
  setUser,
}) {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState('');

  useEffect(() => {
    getUser().then((response) => setUsers(response));
  }, []);

  useEffect(() => {
    setFilteredData(
      users.filter((oneUser) => oneUser.fullName.toLowerCase().includes(search.toLowerCase()))
    );
  }, [search, users]);

  return (
    <div className="usersView">
      { filteredData.length === 0
        ? <div className="d-flex flex-column justify-content-center">
            <h5 className="text-center my-3">No user found with that name!</h5>
          </div>
        : <div>
            <div className="d-flex flex-column justify-content-center">
              <h1 className="text-center my-3">All Users</h1>
              <div className="form-group mb-4 d-flex justify-content-center">
                <input type="search" id="search" placeholder="Search by item name..." aria-describedby="button-addon" className="form-control" onChange={(e) => setSearch(e.target.value)}/>
              </div>
              <StackGrid className="userCardContainer">
                {filteredData?.map((userInfo) => (
                  <UserCards
                      key={userInfo.firebaseKey}
                      {...userInfo}
                      setUsers={setUsers}
                      user={user}
                      setUser={setUser}
                  />
                ))}
              </StackGrid>
            </div>
          </div>
      }
    </div>
  );
}

UsersView.propTypes = {
  user: PropTypes.any,
  setUser: PropTypes.func,
};

export default UsersView;

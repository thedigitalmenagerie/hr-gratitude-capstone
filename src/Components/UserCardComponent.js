import React, { useState } from 'react';
import {
  Card,
  CardImg,
  CardTitle,
  CardText,
} from 'reactstrap';
import PropTypes from 'prop-types';
import FriendForm from '../Forms/FriendForm';
import './CStyles/UserCardComponent.scss';

const UserCards = ({
  firebaseKey,
  fullName,
  profileImage,
  uid,
  userEmail,
  setUsers,
  user,
  setUser,
}) => {
  const [editingUsers, setEditingUsers] = useState(false);

  const handleClick = (type) => {
    switch (type) {
      case 'addFriend':
        setEditingUsers((prevState) => !prevState);
        break;
      case 'addCloseFriend':
        setEditingUsers((prevState) => !prevState);
        break;
      default:
        console.warn('Nothing selected');
    }
  };

  return (
      <Card className="userCards" key={firebaseKey}>
        <div className="top">
          <div className="left">
            <CardImg className="profileImage" src={profileImage} alt="Profile Image" />
          </div>
          <div className="right">
            <CardTitle className="fullName">{fullName}</CardTitle>
            <CardText className="userEmail">{userEmail}</CardText>
          </div>
        </div>
        <div className="bottom">
          {
            user
              && <div className="hiddenFriendContent">
                { user
                  ? <div>
                      <button className="addUserAsFriend" onClick={() => handleClick('addFriend')}>Friend</button>
                      <button className="addUserAsCloseFriend">Close Friend</button>
                        <div>
                          {editingUsers && <FriendForm
                            FriendFormTitle='Add Friend'
                            firebaseKey={firebaseKey}
                            fullName={fullName}
                            profileImage={profileImage}
                            uid={uid}
                            userEmail={userEmail}
                            setUsers={setUsers}
                            user={user}
                            setUser={setUser}
                          />}
                        </div>
                    </div>
                  : <div></div>
                }
              </div>
          }
        </div>
      </Card>
  );
};

UserCards.propTypes = {
  firebaseKey: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  profileImage: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
  setUsers: PropTypes.func,
  user: PropTypes.any,
  setUser: PropTypes.func
};

export default UserCards;

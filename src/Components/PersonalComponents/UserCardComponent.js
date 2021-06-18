import React, { useState } from 'react';
import 'firebase/auth';
import {
  Card,
  CardImg,
  CardTitle,
  CardText,
} from 'reactstrap';
import PropTypes from 'prop-types';
import {
  addUserFriend
} from '../../helpers/data/FriendData';
import './CStyles/UserCardComponent.scss';

const UserCards = ({
  firebaseKey,
  fullName,
  profileImage,
  uid,
  userEmail,
  user,
}) => {
  const [editingUsers, setEditingUsers] = useState(false);
  const [userFriend, setUserFriend] = useState([]);

  const handleClick = (type) => {
    switch (type) {
      case 'addFriend':
        if (user.uid !== uid) {
          const userFriendObj = {
            friendKey: uid,
            uidKey: user.uid
          };
          addUserFriend(userFriendObj).then((userFriendArray) => setUserFriend(userFriendArray));
          setEditingUsers((prevState) => !prevState);
        } else if (userFriend || userFriend === null) {
          setEditingUsers((prevState) => !prevState);
        }
        break;
      default:
        console.warn('Nothing selected');
    }
  };

  return (
    <div className="userCardContainer">
        {
          user?.uid !== uid
                && <div>
            { uid
              ? <Card className="userCards" key={firebaseKey} id={uid}>
                  <CardImg className="profileImage" src={profileImage} alt="Profile Image" />
                  <CardTitle className="fullName">{fullName}</CardTitle>
                  <CardText className="userEmail">{userEmail}</CardText>
                  {!editingUsers
                    ? <button className="addUserAsFriend" onClick={() => handleClick('addFriend')}>Add Friend</button>
                    : <div>
                      <button className="removeUserAsFriend" onClick={() => handleClick('addFriend')}>Remove Friend</button>
                  </div>
                  }
                </Card>
              : <div></div>
            }
            </div>
          }
  </div>
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

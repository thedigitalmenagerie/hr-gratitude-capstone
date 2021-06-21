import React, { useState } from 'react';
import 'firebase/auth';
import {
  Card,
  CardImg,
  CardTitle,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { AnimationWrapper } from 'react-hover-animation';
import {
  addUserFriend
} from '../../helpers/data/FriendData';
import './CStyles/UserCardComponent.scss';
import greenAddButton from '../../Assets/greenAddButton.png';

const UserCards = ({
  firebaseKey,
  fullName,
  profileImage,
  uid,
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
    <AnimationWrapper><div className="userCardContainer">
        {
          user?.uid !== uid
                && <div>
            { uid
              ? <Card className="userCards" key={firebaseKey} id={uid}>
                  <CardImg className="profileImage" src={profileImage} alt="Profile Image" />
                  <CardTitle className="fullName">{fullName}</CardTitle>
                  {!editingUsers
                    ? <button className="addUserAsFriend" onClick={() => handleClick('addFriend')}><img className="addUserButton" src={greenAddButton}/></button>
                    : <div>
                  </div>
                  }
                </Card>
              : <div></div>
            }
            </div>
          }
  </div></AnimationWrapper>
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

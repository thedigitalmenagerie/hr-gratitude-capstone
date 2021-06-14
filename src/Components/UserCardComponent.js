import React, { useState } from 'react';
import 'firebase/auth';
import {
  Card,
  CardImg,
  CardTitle,
  CardText,
} from 'reactstrap';
import PropTypes from 'prop-types';
import FriendForm from '../Forms/FriendForm';
import {
  addFriend,
  addUserFriend
} from '../Helpers/Data/FriendData';
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
  const [friend, setFriend] = useState({
    fullName,
    profileImage,
    uid,
    userEmail,
  });
  const [userFriend, setUserFriend] = useState({
    friendKey: firebaseKey,
    uidKey: user.uid
  });

  const handleClick = (type) => {
    switch (type) {
      case 'addFriend':
        if (user.uid !== uid) {
          console.warn(userFriend);
          console.warn(friend);
          addFriend(friend).then((friendArray) => setFriend(friendArray));
          addUserFriend(userFriend).then((userFriendArray) => setUserFriend(userFriendArray));
          setEditingUsers((prevState) => !prevState);
        }
        break;
      default:
        console.warn('Nothing selected');
    }
  };

  return (
    <div className="userCardContainer">
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

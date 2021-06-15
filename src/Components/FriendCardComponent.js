import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import 'firebase/auth';
import {
  Card,
  CardImg,
  CardTitle,
  CardText,
} from 'reactstrap';
import PropTypes from 'prop-types';
import FriendForm from '../Forms/FriendForm';
import { deleteFriend, deleteUserFriend } from '../Helpers/Data/FriendData';
import './CStyles/UserCardComponent.scss';

const FriendCards = ({
  firebaseKey,
  fullName,
  profileImage,
  uid,
  userEmail,
  setUsers,
  user,
  setUser,
}) => {
  const [editingFriend, setEditingFriend] = useState(false);

  const history = useHistory();

  const handleClick = (type) => {
    switch (type) {
      case 'deleteFriend':
        deleteFriend(firebaseKey)
          .then((friendArray) => setEditingFriend(friendArray));
        deleteUserFriend(firebaseKey)
          .then((userFriendArray) => setEditingFriend(userFriendArray));
        break;
      case 'view':
        history.push(`friendView/${firebaseKey}`);
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
                      <button className="removeUserAsFriend" onClick={() => handleClick('deleteFriend')}>Delete Friend</button>
                        <div>
                          {editingFriend && <FriendForm
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

FriendCards.propTypes = {
  firebaseKey: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  profileImage: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
  setUsers: PropTypes.func,
  user: PropTypes.any,
  setUser: PropTypes.func
};

export default FriendCards;

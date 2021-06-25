import React from 'react';
import { useHistory } from 'react-router-dom';
import 'firebase/auth';
import {
  Card,
  CardImg,
  CardTitle,
  CardText,
} from 'reactstrap';
import PropTypes from 'prop-types';
import './CStyles/FriendCardComponent.scss';
import { AnimationWrapper } from 'react-hover-animation';
import greenView from '../../Assets/greenView.png';
import greenDelete from '../../Assets/greenDelete.png';
import { deleteUserFriend } from '../../helpers/data/FriendData';

const FriendCards = ({
  firebaseKey,
  fullName,
  profileImage,
  userEmail,
  user,
  isFriend,
  friendKey,
  uid,
}) => {
  const history = useHistory();

  const handleClick = (type) => {
    switch (type) {
      case 'viewFriend':
        history.push(`/friendView/${firebaseKey}`);
        break;
      case 'deleteFriend':
        deleteUserFriend(firebaseKey)
          .then((userFriendArray) => console.warn(userFriendArray));
        break;
      default:
        console.warn('Nothing selected');
    }
  };

  return (
    <div className="friendCardContainer">
      { isFriend === true
        && <div>
          { uid !== user?.uid
            ? <Card className="friendCards" key={firebaseKey} id={friendKey}>
              <div>
                 <CardImg className="profileImage" src={profileImage} alt="Profile Image" />
              </div>
                 <div>
                   <CardTitle className="fullName">{fullName}</CardTitle>
                  <CardText className="userEmail">{userEmail}</CardText>
                    <div className="buttonContainer row">
                    <AnimationWrapper><button className="viewFriend" onClick={() => handleClick('viewFriend')}><img className="viewFriendButton" src={greenView}/></button></AnimationWrapper>
                    <AnimationWrapper><button className="deleteFriend" onClick={() => handleClick('deleteFriend')}><img className="deleteFriendButton" src={greenDelete}/></button></AnimationWrapper>
                  </div>
                 </div>
                </Card>
            : <div></div>
        }
        </div>
      }

            </div>
  );
};

FriendCards.propTypes = {
  firebaseKey: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  profileImage: PropTypes.string.isRequired,
  uidKey: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
  isFriend: PropTypes.bool,
  friendKey: PropTypes.string,
  user: PropTypes.any,
  uid: PropTypes.any,
  setFriends: PropTypes.any,
};

export default FriendCards;

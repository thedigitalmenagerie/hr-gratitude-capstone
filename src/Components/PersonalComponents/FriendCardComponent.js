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
import greenView from '../../Assets/greenView.png';

const FriendCards = ({
  firebaseKey,
  fullName,
  profileImage,
  uidKey,
  userEmail,
  user,
  isFriend,
  friendKey,
}) => {
  const history = useHistory();

  const handleClick = (type) => {
    switch (type) {
      case 'viewFriend':
        history.push(`/friendView/${firebaseKey}`);
        break;
      default:
        console.warn('Nothing selected');
    }
  };

  return (
    <div className="friendCardContainer">
      {
          isFriend === true
                && <div>
            { uidKey !== user?.uid
              ? <Card className="friendCards" key={firebaseKey} id={friendKey}>
                  <CardImg className="profileImage" src={profileImage} alt="Profile Image" />
                  <CardTitle className="fullName">{fullName}</CardTitle>
                  <CardText className="userEmail">{userEmail}</CardText>
                  <button className="viewFriend" onClick={() => handleClick('viewFriend')}><img className="viewFriendButton" src={greenView}/></button>
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
};

export default FriendCards;

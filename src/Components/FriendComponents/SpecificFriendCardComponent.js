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
import { AnimationWrapper } from 'react-hover-animation';
import greenEvents from '../../Assets/greenEvents.png';
import greenCategory from '../../Assets/greenCategory.png';
import greenItems from '../../Assets/greenItems.png';
import './CStyles/SpecificFriendCardComponent.scss';

const SpecificFriendCards = ({
  firebaseKey,
  fullName,
  profileImage,
  userEmail,
  friendKey,
  isFriend,
  uid,
  // specificFriends,
  user
}) => {
  const history = useHistory();

  const handleClick = (type) => {
    switch (type) {
      case 'viewFriendCategories':
        history.push(`/friendView/${firebaseKey}/Categories/${uid}`);
        break;
      case 'viewFriendItems':
        history.push(`/friendView/${firebaseKey}/Items/${uid}`);
        break;
      case 'viewFriendEvents':
        history.push(`/friendView/${firebaseKey}/Events/${uid}`);
        break;
      default:
        console.warn('Nothing selected');
    }
  };

  return (
    <div className="friendCards">
            {
          isFriend === true
                && <div>
            { uid !== user?.uid
              ? <Card className="friendCard" key={firebaseKey} id={friendKey}>
                  <CardImg className="profileImage" src={profileImage} alt="Profile Image" />
                  <CardTitle className="fullName">{fullName}</CardTitle>
                  <CardText className="userEmail">{userEmail}</CardText>
                  <div className="specificFriendButtonDiv">
                  <AnimationWrapper><button className="viewFriend"><img className="viewFriendButton" src={greenEvents} onClick={() => handleClick('viewFriendEvents')}></img></button></AnimationWrapper>
                  <AnimationWrapper><button className="viewFriend"><img className="viewFriendButton" src={greenCategory} onClick={() => handleClick('viewFriendCategories')}></img></button></AnimationWrapper>
                  <AnimationWrapper><button className="viewFriend"><img className="viewFriendButton" src={greenItems} onClick={() => handleClick('viewFriendItems')}></img></button></AnimationWrapper></div>
                </Card>
              : <div></div>
            }
            </div>
      }</div>
  );
};

SpecificFriendCards.propTypes = {
  firebaseKey: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  profileImage: PropTypes.string.isRequired,
  friendKey: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
  isFriend: PropTypes.bool,
  uidKey: PropTypes.string,
  user: PropTypes.any,
  uid: PropTypes.any,
  specificFriends: PropTypes.any,
};

export default SpecificFriendCards;

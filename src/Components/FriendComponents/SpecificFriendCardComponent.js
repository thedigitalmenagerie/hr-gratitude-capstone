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
import date from '../../Assets/date.png';
import category from '../../Assets/category.png';
import giftView from '../../Assets/giftView.png';

const SpecificFriendCards = ({
  firebaseKey,
  fullName,
  profileImage,
  userEmail,
  friendKey,
  isFriend,
  uidKey,
  user,
  uid,
}) => {
  const history = useHistory();

  const handleClick = (type) => {
    switch (type) {
      case 'viewFriendCategories':
        history.push(`/friendView/${firebaseKey}/Categories/${uid}`);
        break;
      // case 'viewFriendItems':
      //   history.push(`/friendView/${firebaseKey}/Items/${uid}`);
      //   break;
      case 'viewFriendEvents':
        history.push(`/friendView/${firebaseKey}/Events/${uid}`);
        break;
      default:
        console.warn('Nothing selected');
    }
  };

  return (
    <div className="userCardContainer">
            {
          isFriend === true
                && <div>
            { uidKey !== user?.uid
              ? <Card className="userCards" key={firebaseKey} id={friendKey}>
                  <CardImg className="profileImage" src={profileImage} alt="Profile Image" />
                  <CardTitle className="fullName">{fullName}</CardTitle>
                  <CardText className="userEmail">{userEmail}</CardText>
                  <button><img className="navImg" src={date} onClick={() => handleClick('viewFriendEvents')}></img></button>
                  <button><img className="navImg" src={category} onClick={() => handleClick('viewFriendCategories')}></img></button>
                  <button><img className="navImg" src={giftView} onClick={() => handleClick('viewFriendItems')}></img></button>
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
};

export default SpecificFriendCards;

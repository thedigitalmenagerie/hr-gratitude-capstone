import React from 'react';
// import { useHistory } from 'react-router-dom';
import {
  Card,
  CardTitle,
  CardText,
} from 'reactstrap';
import PropTypes from 'prop-types';

const SpecificFriendEventCards = ({
  firebaseKey,
  eventName,
  eventDate,
  eventDescription,
  uid,
  user,
}) => {
  // const history = useHistory();

  const handleClick = (type) => {
    switch (type) {
      case 'view':
        // history.push(`/myCategories/${firebaseKey}`);
        break;
      default:
        console.warn('Nothing selected');
    }
  };

  return (
    <div className="eventContainer">
            { uid !== user?.uid
              ? <Card className= "eventCard" key={firebaseKey} id={uid}>
              <div className="eventLeft">
                <CardTitle tag="h5" className="name">{eventName}</CardTitle>
                <CardText className="eventDate">{eventDate}</CardText>
              </div>
              <div className="eventRight">
                <CardText id="area">{eventDescription}</CardText>
                <div>
                      <button id="deleteEvent" onClick={() => handleClick('delete')}>Delete Category</button>
                    </div>
              </div>
            </Card>
              : <div></div>
            }
            </div>
  );
};

SpecificFriendEventCards.propTypes = {
  firebaseKey: PropTypes.string.isRequired,
  user: PropTypes.any,
  eventName: PropTypes.string.isRequired,
  eventDate: PropTypes.string.isRequired,
  eventDescription: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired
};

export default SpecificFriendEventCards;

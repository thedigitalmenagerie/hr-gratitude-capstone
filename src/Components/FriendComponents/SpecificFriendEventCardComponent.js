import React from 'react';
// import { useHistory } from 'react-router-dom';
import {
  Card,
  CardTitle,
  CardText,
} from 'reactstrap';
import PropTypes from 'prop-types';

export default function SpecificFriendEventCards({
  firebaseKey,
  eventName,
  eventDate,
  eventDescription,
  uid,
  user,
}) {
  return (
    <div className="friendEventContainer">
            { uid !== user?.uid
              ? <Card className= "eventCard" key={firebaseKey} id={uid}>
              <div className="friendEventLeft">
                <CardTitle tag="h5" className="name">{eventName}</CardTitle>
                <CardText className="eventDate">{eventDate}</CardText>
              </div>
              <div className="eventDescription">
                <CardText id="area">{eventDescription}</CardText>
                <div>
                    </div>
              </div>
            </Card>
              : <div></div>
            }
            </div>
  );
}

SpecificFriendEventCards.propTypes = {
  firebaseKey: PropTypes.string.isRequired,
  user: PropTypes.any,
  eventName: PropTypes.string.isRequired,
  eventDate: PropTypes.string.isRequired,
  eventDescription: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired
};

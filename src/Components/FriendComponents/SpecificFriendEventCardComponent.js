import React from 'react';
// import { useHistory } from 'react-router-dom';
import {
  Card,
  CardTitle,
  CardText,
} from 'reactstrap';
import PropTypes from 'prop-types';
import whiteSolidCircle from '../../Assets/whiteSolidCircle.png';
import './CStyles/SpecificFriendEventCardComponent.scss';

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
              ? <Card className= "friendEventCard" key={firebaseKey} id={uid}>
              <CardTitle tag="h5" className="name"><img className="calenderHole" src={whiteSolidCircle}/>{eventName}<img className="calenderHole" src={whiteSolidCircle}/></CardTitle>
              <CardText className="eventDate">{eventDate}</CardText>
              <CardText className="eventDescription">{eventDescription}</CardText>
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

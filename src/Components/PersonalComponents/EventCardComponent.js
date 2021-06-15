import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Card,
  CardTitle,
  CardText,
} from 'reactstrap';
import PropTypes from 'prop-types';
import EventForm from '../../Forms/EventForm';
import { deleteEvent } from '../../helpers/data/EventData';
import './CStyles/EventCardComponent.scss';

const EventCards = ({
  setEvents,
  firebaseKey,
  eventName,
  eventDate,
  eventDescription,
  uid,
  user,
  setUser,
}) => {
  const [editingEvents, setEditingEvents] = useState(false);

  const history = useHistory();

  const handleClick = (type) => {
    switch (type) {
      case 'delete':
        deleteEvent(firebaseKey)
          .then((eventArray) => setEvents(eventArray));
        history.push('/myEvents');
        break;
      case 'edit':
        setEditingEvents((prevState) => !prevState);
        break;
      default:
        console.warn('Nothing selected');
    }
  };

  return (
    <div className="eventContainer">
      <Card className= "eventCard" key={firebaseKey} id={uid}>
        <div className="eventLeft">
          <CardTitle tag="h5" className="name">{eventName}</CardTitle>
          <CardText className="eventDate">{eventDate}</CardText>
        </div>
        <div className="eventRight">
          <CardText id="area">{eventDescription}</CardText>
          <div>
                <button id="deleteEvent" onClick={() => handleClick('delete')}>Delete Category</button>
                <button id="editEvent" onClick={() => handleClick('edit')}>
                  {editingEvents ? 'Close Form' : 'Edit Event'}
                </button>
              </div>
              <div>
                {editingEvents && <EventForm
                  categoryFormTitle='Edit Event'
                  firebaseKey={firebaseKey}
                  eventDate={eventDate}
                  eventName={eventName}
                  eventDescription={eventDescription}
                  uid={uid}
                  setEvents={setEvents}
                  user={user}
                  setUser={setUser}
                />}
              </div>
        </div>
      </Card>
    </div>
  );
};

EventCards.propTypes = {
  firebaseKey: PropTypes.string.isRequired,
  setEvents: PropTypes.func,
  user: PropTypes.any,
  setUser: PropTypes.func,
  eventName: PropTypes.string.isRequired,
  eventDate: PropTypes.string.isRequired,
  eventDescription: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired
};

export default EventCards;

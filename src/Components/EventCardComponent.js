import React, { useState } from 'react';
import {
  Card,
  CardTitle,
  CardText,
} from 'reactstrap';
import PropTypes from 'prop-types';
import EventForm from '../Forms/EventForm';
import { deleteEvent } from '../Helpers/Data/EventData';

const EventCards = ({
  setEvents,
  firebaseKey,
  eventName,
  eventDate,
  eventDescription,
  uidKey,
  user,
  setUser,
}) => {
  const [editingEvents, setEditingEvents] = useState(false);

  const handleClick = (type) => {
    switch (type) {
      case 'delete':
        deleteEvent(firebaseKey)
          .then((eventArray) => setEvents(eventArray));
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
      <Card className= "eventLeft" key={firebaseKey}>
        <div className="row no-gutters">
          <div className="col-5 right">
              <CardTitle tag="h5" className="name">{eventName}</CardTitle>
              <CardText id="area">{eventDescription}</CardText>
              <CardText className="eventDate">{eventDate}</CardText>
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
                  uidKey={uidKey}
                  setEvents={setEvents}
                  user={user}
                  setUser={setUser}
                />}
              </div>
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
  uidKey: PropTypes.string.isRequired
};

export default EventCards;

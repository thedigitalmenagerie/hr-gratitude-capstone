import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { updateEvent, addEvent } from '../Helpers/Data/EventData';

const EventForm = ({
  eventFormTitle,
  firebaseKey,
  eventName,
  eventDate,
  eventDescription,
  uidKey,
  setEvents,
}) => {
  const [event, setEvent] = useState({
    eventName: eventName || '',
    eventDate: eventDate || '',
    eventDescription: eventDescription || '',
    firebaseKey: firebaseKey || null,
    uidKey: uidKey || '',
  });

  const handleInputChange = (e) => {
    setEvent((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (event.firebaseKey) {
      updateEvent(event).then((eventArray) => setEvents(eventArray));
    } else {
      addEvent(event).then((eventArray) => setEvents(eventArray));

      setEvent({
        eventName: '',
        eventDate: '',
        eventDescription: '',
        firebaseKey: null,
        uidKey: '',
      });
    }
  };

  return (
    <form
      id="addEventForm"
      autoComplete='off'
      onSubmit={handleSubmit}
    >
      <h3 id="eventFormTitle">{eventFormTitle}</h3>
      <label>Name:</label>
      <input
        name='eventName'
        type='text'
        placeholder='Event Name'
        value={event.eventName}
        onChange={handleInputChange}
      >
      </input>
      <label>Description: </label>
      <input
        name='eventDescription'
        type='text'
        placeholder='Event Descpription'
        value={event.eventDescription}
        onChange={handleInputChange}
      >
      </input>
      <label>Image: </label>
      <input
        name='eventDate'
        type='text'
        placeholder='Event Date'
        value={event.eventDate}
        onChange={handleInputChange}
      >
      </input>
      <button type="submit">Add Event</button>
    </form>

  );
};

EventForm.propTypes = {
  eventFormTitle: PropTypes.string.isRequired,
  setEvents: PropTypes.string,
  firebaseKey: PropTypes.string,
  eventName: PropTypes.string,
  eventDate: PropTypes.string,
  eventDescription: PropTypes.string,
  friendsOnly: PropTypes.boolean,
  uidKey: PropTypes.any,
};

export default EventForm;

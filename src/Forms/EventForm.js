import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { updateEvent, addEvent } from '../helpers/data/EventData';

const EventForm = ({
  eventFormTitle,
  firebaseKey,
  eventName,
  eventDate,
  eventDescription,
  uid,
  user,
}) => {
  const [event, setEvent] = useState({
    eventName: eventName || '',
    eventDate: eventDate || '',
    eventDescription: eventDescription || '',
    firebaseKey: firebaseKey || null,
    uid: uid || user.uid,
  });

  const history = useHistory();

  const handleInputChange = (e) => {
    setEvent((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (event.firebaseKey) {
      updateEvent(event).then((eventArray) => setEvent(eventArray));
      history.push('/myEvents');
    } else {
      addEvent(event).then((eventArray) => setEvent(eventArray));
      history.push('/myEvents');
      setEvent({
        eventName: '',
        eventDate: '',
        eventDescription: '',
        firebaseKey: null,
        categoryKey: '',
        uid: '',
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
  eventFormTitle: PropTypes.string,
  setEvents: PropTypes.string,
  firebaseKey: PropTypes.string,
  eventName: PropTypes.string,
  eventDate: PropTypes.string,
  eventDescription: PropTypes.string,
  friendsOnly: PropTypes.bool,
  uid: PropTypes.string,
  user: PropTypes.any,
};

export default EventForm;

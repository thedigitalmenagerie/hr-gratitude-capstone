import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { updateEvent, addEvent } from '../helpers/data/EventData';
import './FStyles/EventForm.scss';

const EventForm = ({
  eventFormTitle,
  firebaseKey,
  eventName,
  eventDate,
  eventDescription,
  uid,
  user,
  setEvents,
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
      updateEvent(event).then((eventArray) => setEvents(eventArray));
    } else {
      addEvent(event).then((eventArray) => setEvents(eventArray));
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
      <label className="eventNameLabel">Name:</label>
      <input
        className="eventName"
        name='eventName'
        type='text'
        placeholder='Event Name'
        value={event.eventName}
        onChange={handleInputChange}
      >
      </input>
      <label className="eventFormDescriptionLabel">Description: </label>
      <input
        className="eventFormDescription"
        name='eventDescription'
        type='text'
        placeholder='Event Descpription'
        value={event.eventDescription}
        onChange={handleInputChange}
      >
      </input>
      <label className="eventFormDateLabel">Image: </label>
      <input
        className="eventFormDate"
        name='eventDate'
        type='text'
        placeholder='Event Date'
        value={event.eventDate}
        onChange={handleInputChange}
      >
      </input>
      <button className="addEvent" type="submit">Add Event</button>
    </form>

  );
};

EventForm.propTypes = {
  eventFormTitle: PropTypes.string,
  setEvents: PropTypes.func,
  firebaseKey: PropTypes.string,
  eventName: PropTypes.string,
  eventDate: PropTypes.string,
  eventDescription: PropTypes.string,
  friendsOnly: PropTypes.bool,
  uid: PropTypes.string,
  user: PropTypes.any,
};

export default EventForm;

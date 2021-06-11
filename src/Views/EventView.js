import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getEvent } from '../Helpers/Data/EventData';
import EventForm from '../Forms/EventForm';
import EventCards from '../Components/EventCardComponent';
import './VStyles/EventView.scss';

export default function ItemView({
  setUser,
  user,
}) {
  const [events, setEvents] = useState([]);
  const [showAddEventForm, setShowAddEventForm] = useState(false);

  const handleClick = () => {
    setShowAddEventForm((prevState) => !prevState);
  };

  useEffect(() => {
    getEvent(user.uid).then((response) => setEvents(response));
  }, []);
  return (
    <div className="eventView">
      <div className="innerContainer">
        {!showAddEventForm
          ? <div>
              <form action="/" method="get" className="searchEvents">
                <label htmlFor="header-search" className="label"></label>
                <input
                  type="text"
                  id="header-search"
                  placeholder="Search Your Events"
                  name="s"
                  className="input"
                />
                <button className="searchEventsButton" type="submit">Search</button>
              </form>
            <button id="addEvent" onClick={handleClick}>Add Event</button>
            {events.map((eventInfo) => (
          <EventCards
            key={eventInfo.firebaseKey}
            firebaseKey={eventInfo.firebaseKey}
            eventName={eventInfo.eventName}
            eventDate={eventInfo.eventDate}
            eventDescription={eventInfo.eventDescription}
            uid={eventInfo.uid}
            setEvents={setEvents}
            user={user}
            setUser={setUser}
          />
            ))}
            </div>
          : <div>
              <button id="closeForm" onClick={handleClick}>Close Form</button>
              <EventForm
                itemFormTitle="Add Event"
                setEvents={setEvents}
                user={user}
                setUser={setUser}
              />
            </div>
        }
      </div>
    </div>
  );
}

ItemView.propTypes = {
  user: PropTypes.any,
  setUser: PropTypes.func,
};

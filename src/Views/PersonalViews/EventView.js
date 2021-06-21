import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { animations } from 'react-animation';
import { AnimationWrapper } from 'react-hover-animation';
import { getEvent } from '../../helpers/data/EventData';
import EventForm from '../../Forms/EventForm';
import EventCards from '../../Components/PersonalComponents/EventCardComponent';
import './VStyles/EventView.scss';

export default function EventView({
  user,
}) {
  const [events, setEvents] = useState([]);
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState('');

  const handleClick = () => {
    setShowAddEventForm((prevState) => !prevState);
  };

  useEffect(() => {
    setFilteredData(
      events.filter((event) => event.eventName.toLowerCase().includes(search.toLowerCase()))
    );
  }, [search, events]);

  useEffect(() => {
    getEvent(user?.uid).then((response) => setEvents(response));
  }, []);
  return (
    <div className="eventView" style={{ animation: animations.fadeIn }}>
      <div className="innerContainer">
        {!showAddEventForm
          ? <div>
            { filteredData.length === 0
              ? <div className="d-flex flex-column justify-content-center">
                    <h5 className="text-center my-3">No events found with that name!</h5>
                  </div>
              : <div>
                    <div className="d-flex flex-column justify-content-center">
                      <h1 className="text-center my-3">All Events</h1>
                      <div className="form-group mb-4 d-flex justify-content-center">
                        <input type="search" id="search" placeholder="Search by event name..." aria-describedby="button-addon" className="form-control" onChange={(e) => setSearch(e.target.value)}/>
                      </div>
                      <AnimationWrapper><button id="addEvent" onClick={handleClick}>Add Event</button></AnimationWrapper>
                      <div className="eventCardContainer">
                        {filteredData?.map((eventInfo) => (
                          <EventCards
                            key={eventInfo.firebaseKey}
                            {... eventInfo}
                            setEvents={setEvents}
                            user={user}
                            setShowAddEventForm={setShowAddEventForm}
                          />
                        ))}
                      </div>
                  </div>
                </div>
            } </div>
          : <div>
              <AnimationWrapper><button id="closeForm" onClick={handleClick}>Close Form</button></AnimationWrapper>
              <EventForm
                itemFormTitle="Add Event"
                setEvents={setEvents}
                user={user}
                setShowAddEventForm={setShowAddEventForm}
              />
            </div>
        }
      </div>
    </div>
  );
}

EventView.propTypes = {
  user: PropTypes.any,
};

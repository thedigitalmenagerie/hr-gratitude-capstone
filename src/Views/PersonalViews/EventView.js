import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import ClipLoader from 'react-spinners/ClipLoader';
import { animations } from 'react-animation';
import { AnimationWrapper } from 'react-hover-animation';
import Typing from 'react-typing-animation';
import { getEvent } from '../../helpers/data/EventData';
import EventForm from '../../Forms/EventForm';
import EventCards from '../../Components/PersonalComponents/EventCardComponent';
import whiteX from '../../Assets/whiteX.png';
import './VStyles/EventView.scss';

Modal.setAppElement('#root');

export default function EventView({
  user,
}) {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState('');
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    getEvent(user?.uid).then((response) => setEvents(response));
    setLoading(false);
  }, []);

  useEffect(() => {
    setFilteredData(
      events.filter((event) => event.eventName.toLowerCase().includes(search.toLowerCase()))
    );
    setLoading(false);
  }, [search, events]);

  return (
    <div>
      { loading
        ? <div className="loading">
            <Typing><h6 className="">Just a sec.</h6></Typing>
            <ClipLoader color="#ffffff" loading={loading} size={150} className="spinner" />
          </div>
        : <div className="eventView" style={{ animation: animations.fadeIn }}>
            { filteredData.length === 0
              ? <Typing><h6>Add an occasion.</h6></Typing>
              : <div className="innerContainer">
                  { filteredData.length === 0
                    ? <Typing><h6 className="header">Event not found!</h6></Typing>
                    : <div>
                        <div className="searchAndCardContainer">
                        <Typing><h1>Your Events</h1></Typing>
                          <div className="searchBarContainer">
                          <input type="search" id="search" placeholder="Search" aria-describedby="button-addon" className="form-control" onChange={(e) => setSearch(e.target.value)}/>
                        </div>
                        <AnimationWrapper><button id="addEvent" onClick={openModal}>Add Event</button></AnimationWrapper>
                        <div className="eventCardContainer">
                        {filteredData?.map((eventInfo) => (
                          <EventCards
                            key={eventInfo.firebaseKey}
                            {... eventInfo}
                            setEvents={setEvents}
                            user={user}
                          />
                        ))}
                        </div>
                        </div>
                        <div className="formContainer">
                          <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            className="Modal"
                          >
                            <AnimationWrapper><button className="modalClose" onClick={closeModal}><img src={whiteX}/>Close Form</button></AnimationWrapper>
                            <EventForm
                              itemFormTitle="Add Event"
                              setEvents={setEvents}
                              user={user}
                            />
                          </Modal>
                        </div>
                      </div>
                  }
                </div>
            }
          </div>
      }
    </div>
  );
}

EventView.propTypes = {
  user: PropTypes.any,
};

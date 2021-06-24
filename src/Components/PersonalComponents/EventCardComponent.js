import React from 'react';
import {
  Card,
  CardTitle,
  CardText,
} from 'reactstrap';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { AnimationWrapper } from 'react-hover-animation';
import EventForm from '../../Forms/EventForm';
import { deleteEvent } from '../../helpers/data/EventData';
import whiteSolidCircle from '../../Assets/whiteSolidCircle.png';
import greenDelete from '../../Assets/greenDelete.png';
import greenUpdate from '../../Assets/greenUpdate.png';
import whiteX from '../../Assets/whiteX.png';
import './CStyles/EventCardComponent.scss';

Modal.setAppElement('#root');

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
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleClick = (type) => {
    switch (type) {
      case 'delete':
        deleteEvent(firebaseKey, uid)
          .then((eventArray) => setEvents(eventArray));
        break;
      default:
        console.warn('Nothing selected');
    }
  };

  return (
      <Card className= "eventCard" key={firebaseKey} id={uid}>
          <CardTitle tag="h5" className="name"><img className="calenderHole" src={whiteSolidCircle}/>{eventName}<img className="calenderHole" src={whiteSolidCircle}/></CardTitle>
          <CardText className="eventDate">{eventDate}</CardText>
          <CardText className="eventDescription">{eventDescription}</CardText>
          <div className="eventButtonRow">
                <AnimationWrapper><button id="deleteEvent" onClick={() => handleClick('delete')}><img className="deleteEventImg" src={greenDelete}/></button></AnimationWrapper>
                <AnimationWrapper><button id="editEvent" onClick={openModal}><img className="editEventImg" src={greenUpdate}/></button></AnimationWrapper>
                <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={closeModal}
                  className="Modal"
                >
                  <AnimationWrapper><button className="modalClose" onClick={closeModal}><img src={whiteX}/>Close Form</button></AnimationWrapper>
                  <EventForm
                  categoryFormTitle='Edit Event'
                  firebaseKey={firebaseKey}
                  eventDate={eventDate}
                  eventName={eventName}
                  eventDescription={eventDescription}
                  uid={uid}
                  setEvents={setEvents}
                  user={user}
                  setUser={setUser}
                />
                </Modal>
                </div>
      </Card>
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
  uid: PropTypes.string.isRequired,
  setShowAddEventForm: PropTypes.string,
};

export default EventCards;

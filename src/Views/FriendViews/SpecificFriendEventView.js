import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Typing from 'react-typing-animation';
import { animations } from 'react-animation';
import { useParams } from 'react-router-dom';
import { getEvent } from '../../helpers/data/EventData';
import { mergedUserFriendData } from '../../helpers/data/FriendData';
import SpecificFriendEventCards from '../../Components/FriendComponents/SpecificFriendEventCardComponent';
import './VStyles/SpecificFriendEventView.scss';

export default function SpecificFriendEventView({
  user,
  setUser,
}) {
  const [friendsForEvents, setFriendsForEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const { uid } = useParams();
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState('');

  useEffect(() => {
    mergedUserFriendData(friendsForEvents.friendKey).then((response) => setFriendsForEvents(response));
    getEvent(uid).then((response) => setEvents(response));
  }, []);

  useEffect(() => {
    setFilteredData(
      events.filter((event) => event.eventName.toLowerCase().includes(search.toLowerCase()))
    );
  }, [search, events]);

  return (
    <div className="friendEventView" style={{ animation: animations.fadeIn }}>
      { events.length === 0
        ? <Typing><h5 className="text-center my-3">No items found with that name!</h5></Typing>
        : <div className="innerContainer">
          <div className="searchAndCardContainer">
              <Typing><h1 className="text-center my-3">Friend Events</h1></Typing>
              <div className="searchBarContainer">
                <input type="search" id="search" placeholder="Search" aria-describedby="button-addon" className="form-control" onChange={(e) => setSearch(e.target.value)}/>
               </div>
               <div className="eventCardContainer">
               {filteredData?.map((friendEventInfo) => (
              <SpecificFriendEventCards
                key={friendEventInfo.firebaseKey}
                {...friendEventInfo}
                user={user}
                setUser={setUser}
                setFriendsForEvents={setFriendsForEvents}
                friendKey={friendEventInfo.friendKey}
                friendsForEvents={friendsForEvents}
              />
               ))}
               </div>

           </div></div>
      }
            </div>
  );
}

SpecificFriendEventView.propTypes = {
  user: PropTypes.any,
  setUser: PropTypes.func,
  friendKey: PropTypes.string,
};

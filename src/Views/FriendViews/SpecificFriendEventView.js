import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import StackGrid from 'react-stack-grid';
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

  useEffect(() => {
    mergedUserFriendData(friendsForEvents.friendKey).then((response) => setFriendsForEvents(response));
    getEvent(uid).then((response) => setEvents(response));
  }, []);

  return (
    <div className="friendEventView">
      <form action="/" method="get" className="searchFriendsEvents">
        <label htmlFor="header-search"></label>
        <input
          type="text"
          id="header-search"
          placeholder="Search Your Friends' Events"
          name="s"
          className="input"
        />
      </form>
        <StackGrid className="stackGridEvents" gutterHeight={10}>
              {events?.map((friendEventInfo) => (
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
          </StackGrid>
            </div>
  );
}

SpecificFriendEventView.propTypes = {
  user: PropTypes.any,
  setUser: PropTypes.func,
  friendKey: PropTypes.string,
};

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import StackGrid from 'react-stack-grid';
import { getEvent } from '../../helpers/data/EventData';
import { mergedUserFriendData } from '../../helpers/data/FriendData';
import SpecificFriendEventCards from '../../Components/FriendComponents/SpecificFriendEventCardComponent';

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
    <div className="eventView">
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

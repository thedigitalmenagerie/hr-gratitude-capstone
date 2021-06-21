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
    <div className="friendEventView">
      { filteredData.length === 0
        ? <div className="d-flex flex-column justify-content-center">
            <h5 className="text-center my-3">No items found with that name!</h5>
          </div>
        : <div>
            <div className="d-flex flex-column justify-content-center">
              <h1 className="text-center my-3">All Events</h1>
              <div className="form-group mb-4 d-flex justify-content-center">
                <input type="search" id="search" placeholder="Search by event name..." aria-describedby="button-addon" className="form-control" onChange={(e) => setSearch(e.target.value)}/>
              </div>
              <StackGrid className="stackGridEvents" gutterHeight={10}>
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
          </StackGrid>
            </div>
          </div>
      }
            </div>
  );
}

SpecificFriendEventView.propTypes = {
  user: PropTypes.any,
  setUser: PropTypes.func,
  friendKey: PropTypes.string,
};

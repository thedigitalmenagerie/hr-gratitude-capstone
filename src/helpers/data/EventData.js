import axios from 'axios';
import firebaseConfig from '../apiKeys';

const DBURL = firebaseConfig.databaseURL;

const getEvent = (uid) => new Promise((resolve, reject) => {
  axios.get(`${DBURL}/events.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

const getSingleEvent = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${DBURL}/events/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const addEvent = (events, user) => new Promise((resolve, reject) => {
  axios.post(`${DBURL}/events.json`, events)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${DBURL}/events/${response.data.name}.json`, body)
        .then(() => {
          getEvent(user).then((eventArray) => resolve(eventArray));
        });
    }).catch((error) => reject(error));
});

const deleteEvent = (firebaseKey, user) => new Promise((resolve, reject) => {
  axios.delete(`${DBURL}/events/${firebaseKey}.json`)
    .then(() => getSingleEvent(user, firebaseKey).then((eventArray) => resolve(eventArray)))
    .catch((error) => reject(error));
});

const updateEvent = (events, user) => new Promise((resolve, reject) => {
  axios.patch(`${DBURL}/events/${events.firebaseKey}.json`, events)
    .then(() => getEvent(user, events.firebaseKey).then(resolve))
    .catch((error) => reject(error));
});

export {
  getEvent,
  addEvent,
  deleteEvent,
  updateEvent,
};

import axios from 'axios';
import firebaseConfig from '../apiKeys';

const DBURL = firebaseConfig.databaseURL;

const getEvent = () => new Promise((resolve, reject) => {
  axios.get(`${DBURL}/events.json`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

const addEvent = (events) => new Promise((resolve, reject) => {
  axios.post(`${DBURL}/events.json`, events)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${DBURL}/events/${response.data.name}.json`, body)
        .then(() => {
          getEvent().then((eventArray) => resolve(eventArray));
        });
    }).catch((error) => reject(error));
});

const deleteEvent = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${DBURL}/events/${firebaseKey}.json`)
    .then(() => getEvent().then((eventArray) => resolve(eventArray)))
    .catch((error) => reject(error));
});

const updateEvent = (events) => new Promise((resolve, reject) => {
  axios.patch(`${DBURL}/events/${events.firebaseKey}.json`, events)
    .then(() => getEvent().then(resolve))
    .catch((error) => reject(error));
});

export {
  getEvent,
  addEvent,
  deleteEvent,
  updateEvent,
};

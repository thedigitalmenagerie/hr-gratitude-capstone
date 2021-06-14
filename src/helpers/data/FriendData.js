import axios from 'axios';
import firebaseConfig from '../apiKeys';

const DBURL = firebaseConfig.databaseURL;

const getFriend = () => new Promise((resolve, reject) => {
  axios.get(`${DBURL}/friends.json`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

const getUserFriend = () => new Promise((resolve, reject) => {
  axios.get(`${DBURL}/userFriends.json`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

const addFriend = () => new Promise((resolve, reject) => {
  axios.post(`${DBURL}/friends.json`)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${DBURL}/friends/${response.data.name}.json`, body)
        .then(() => {
          getFriend().then((friendArray) => resolve(friendArray));
        });
    }).catch((error) => reject(error));
});

const addUserFriend = () => new Promise((resolve, reject) => {
  axios.post(`${DBURL}/userFriends.json`)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${DBURL}/friends/${response.data.name}.json`, body)
        .then(() => {
          getUserFriend().then((userFriendArray) => resolve(userFriendArray));
        });
    }).catch((error) => reject(error));
});

export {
  getFriend,
  getUserFriend,
  addFriend,
  addUserFriend
};

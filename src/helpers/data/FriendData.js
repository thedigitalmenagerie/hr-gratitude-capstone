import axios from 'axios';
import firebaseConfig from '../apiKeys';

const DBURL = firebaseConfig.databaseURL;

const getFriend = () => new Promise((resolve, reject) => {
  axios.get(`${DBURL}/friends.json`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

const getSpecificFriend = (friend) => new Promise((resolve, reject) => {
  axios.get(`${DBURL}/friends.json?orderBy="uid"&equalTo="${friend.uid}"`)
    .then((response) => resolve(response))
    .catch((err) => reject(err));
});

const getUserFriend = () => new Promise((resolve, reject) => {
  axios.get(`${DBURL}/userFriends.json`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

const getSpecificUserFriend = (userFriend) => new Promise((resolve, reject) => {
  axios.get(`${DBURL}/userFriends.json?orderBy="uid"&equalTo="${userFriend.uidKey}"`)
    .then((response) => resolve(response))
    .catch((err) => reject(err));
});

const addFriend = (friend) => new Promise((resolve, reject) => {
  axios.post(`${DBURL}/friends.json`, friend)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${DBURL}/friends/${response.data.name}.json`, body)
        .then(() => {
          getFriend().then((friendArray) => resolve(friendArray));
        });
    }).catch((error) => reject(error));
});

const addUserFriend = (userFriend) => new Promise((resolve, reject) => {
  axios.post(`${DBURL}/userFriends.json`, userFriend)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${DBURL}/userFriends/${response.data.name}.json`, body)
        .then(() => {
          getUserFriend().then((userFriendArray) => resolve(userFriendArray));
        });
    }).catch((error) => reject(error));
});

const deleteFriend = (firebaseKey, friend) => new Promise((resolve, reject) => {
  axios.delete(`${DBURL}/friends/${firebaseKey}.json`)
    .then(() => getFriend(friend).then((friendArray) => resolve(friendArray)))
    .catch((error) => reject(error));
});

const deleteUserFriend = (firebaseKey, userFriend) => new Promise((resolve, reject) => {
  axios.delete(`${DBURL}/userFriends/${firebaseKey}.json`)
    .then(() => getUserFriend(userFriend).then((userFriendArray) => resolve(userFriendArray)))
    .catch((error) => reject(error));
});

export {
  getFriend,
  getSpecificFriend,
  getUserFriend,
  getSpecificUserFriend,
  addFriend,
  addUserFriend,
  deleteFriend,
  deleteUserFriend,
};

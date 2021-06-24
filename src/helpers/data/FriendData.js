import axios from 'axios';
import firebaseConfig from '../apiKeys';
import { getUser } from './UserData';

const DBURL = firebaseConfig.databaseURL;

const getUserFriend = () => new Promise((resolve, reject) => {
  axios.get(`${DBURL}/userFriends.json`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
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

const deleteUserFriend = (firebaseKey, userFriend) => new Promise((resolve, reject) => {
  axios.delete(`${DBURL}/userFriends/${firebaseKey}.json`)
    .then(() => getUserFriend(userFriend).then((userFriendArray) => resolve(userFriendArray)))
    .catch((error) => reject(error));
});

const mergedUserFriendData = () => new Promise((resolve, reject) => {
  Promise.all([getUser(), getUserFriend()])
    .then(([userArray, userFriendArray]) => {
      resolve(userArray.map((user) => ({
        ...user,
        isFriend: Boolean(userFriendArray.find((friend) => friend.friendKey === user.uid && friend.uidKey !== user.uid)),
      })));
    }).catch((error) => reject(error));
});

export {
  getUserFriend,
  addUserFriend,
  deleteUserFriend,
  mergedUserFriendData,
};

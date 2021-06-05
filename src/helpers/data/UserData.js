import axios from 'axios';
import firebaseConfig from '../apiKeys';

const DBURL = firebaseConfig.databaseURL;

const getUser = () => new Promise((resolve, reject) => {
  axios.get(`${DBURL}/user.json`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

const getSpecificUser = (user) => new Promise((resolve, reject) => {
  axios.get(`${DBURL}/user.json?orderBy="uid"&equalTo="${user.uid}"`)
    .then((response) => resolve(response))
    .catch((err) => reject(err));
});

const addUser = (user) => new Promise((resolve, reject) => {
  axios.post(`${DBURL}/user.json`, user)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${DBURL}/user/${response.data.name}.json`, body)
        .then(() => {
          getUser().then((userArray) => resolve(userArray));
        });
    }).catch((error) => reject(error));
});

export {
  // getCurrentUserUid,
  getUser,
  getSpecificUser,
  addUser
};

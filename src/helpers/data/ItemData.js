import axios from 'axios';
import firebaseConfig from '../apiKeys';

const DBURL = firebaseConfig.databaseURL;

const getItem = (uid) => new Promise((resolve, reject) => {
  axios.get(`${DBURL}/items.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

const addItem = (items, uid) => new Promise((resolve, reject) => {
  axios.post(`${DBURL}/items.json`, items)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${DBURL}/items/${response.data.name}.json`, body)
        .then(() => {
          getItem(uid).then(resolve);
        });
    }).catch((error) => reject(error));
});

const deleteItem = (firebaseKey, uid) => new Promise((resolve, reject) => {
  axios.delete(`${DBURL}/items/${firebaseKey}.json`)
    .then(() => getItem(uid).then((itemArray) => resolve(itemArray)))
    .catch((error) => reject(error));
});

const updateItem = (items, uid) => new Promise((resolve, reject) => {
  axios.patch(`${DBURL}/items/${items.firebaseKey}.json`, items)
    .then(() => getItem(uid).then(resolve))
    .catch((error) => reject(error));
});

export {
  getItem,
  addItem,
  deleteItem,
  updateItem,
};

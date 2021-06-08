import axios from 'axios';
import firebaseConfig from '../apiKeys';

const DBURL = firebaseConfig.databaseURL;

const getItem = () => new Promise((resolve, reject) => {
  axios.get(`${DBURL}/items.json`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

const addItem = (items) => new Promise((resolve, reject) => {
  axios.post(`${DBURL}/items.json`, items)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${DBURL}/items/${response.data.name}.json`, body)
        .then(() => {
          getItem().then((categoryArray) => resolve(categoryArray));
        });
    }).catch((error) => reject(error));
});

const deleteItem = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${DBURL}/items/${firebaseKey}.json`)
    .then(() => getItem().then((itemArray) => resolve(itemArray)))
    .catch((error) => reject(error));
});

const updateItem = (items) => new Promise((resolve, reject) => {
  axios.patch(`${DBURL}/items/${items.firebaseKey}.json`, items)
    .then(() => getItem().then(resolve))
    .catch((error) => reject(error));
});

export {
  getItem,
  addItem,
  deleteItem,
  updateItem,
};

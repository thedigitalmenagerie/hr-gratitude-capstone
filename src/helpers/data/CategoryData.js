import axios from 'axios';
import firebaseConfig from '../apiKeys';

const DBURL = firebaseConfig.databaseURL;

const getCategory = () => new Promise((resolve, reject) => {
  axios.get(`${DBURL}/categories.json`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

const addCategory = (categories) => new Promise((resolve, reject) => {
  axios.post(`${DBURL}/categories.json`, categories)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${DBURL}/categories/${response.data.name}.json`, body)
        .then(() => {
          getCategory().then((categoryArray) => resolve(categoryArray));
        });
    }).catch((error) => reject(error));
});

const deleteCategory = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${DBURL}/categories/${firebaseKey}.json`)
    .then(() => getCategory().then((categoryArray) => resolve(categoryArray)))
    .catch((error) => reject(error));
});

const updateCategory = (categories) => new Promise((resolve, reject) => {
  axios.patch(`${DBURL}/categories/${categories.firebaseKey}.json`, categories)
    .then(() => getCategory().then(resolve))
    .catch((error) => reject(error));
});

export {
  getCategory,
  addCategory,
  deleteCategory,
  updateCategory,
};

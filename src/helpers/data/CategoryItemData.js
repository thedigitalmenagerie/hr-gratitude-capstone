import axios from 'axios';
import firebaseConfig from '../apiKeys';
import { deleteCategory } from './CategoryData';
import { deleteItem } from './ItemData';

const DBURL = firebaseConfig.databaseURL;

const getCategoryItems = (categoryKey) => new Promise((resolve, reject) => {
  axios.get(`${DBURL}/items.json?orderBy="boardId"&equalTo="${categoryKey}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

const deleteCategoryItems = (categoryKey, uid) => new Promise((resolve, reject) => {
  getCategoryItems(categoryKey).then((categoryItemArray) => {
    const deleteItems = categoryItemArray.map((item) => deleteItem(item.firebaseKey));
    Promise.all(deleteItems).then(() => resolve(deleteCategory(categoryKey, uid)));
  }).catch((error) => reject(error));
});

export { getCategoryItems, deleteCategoryItems };

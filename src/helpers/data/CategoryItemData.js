import axios from 'axios';
import firebaseConfig from '../apiKeys';
import { deleteCategory, getSingleCategory } from './CategoryData';
import { deleteItem } from './ItemData';

const DBURL = firebaseConfig.databaseURL;

const getCategoryItems = (categoryKey) => new Promise((resolve, reject) => {
  axios.get(`${DBURL}/items.json?orderBy="categoryKey"&equalTo="${categoryKey}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

const showCategoryItems = (categoryKey) => new Promise((resolve, reject) => {
  const category = getSingleCategory(categoryKey);
  const categoryItem = getCategoryItems(categoryKey);
  Promise.all([category, categoryItem])
    .then(([categoryResponse, categoryItemResponse]) => resolve({ category: categoryResponse, items: categoryItemResponse }))
    .catch((error) => reject(error));
});

const deleteCategoryItems = (firebaseKey, user) => new Promise((resolve, reject) => {
  getCategoryItems(firebaseKey).then((categoryItemArray) => {
    const deleteItems = categoryItemArray.map((items) => deleteItem(items.firebaseKey, user));
    Promise.all(deleteItems).then(() => resolve(deleteCategory(firebaseKey, user)));
  }).catch((error) => reject(error));
});

export { getCategoryItems, showCategoryItems, deleteCategoryItems };

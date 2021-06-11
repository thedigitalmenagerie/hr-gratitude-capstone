import { deleteCategory, getSingleCategory } from './CategoryData';
import { deleteItem } from './ItemData';

const getCategoryItems = (categoryKey) => new Promise((resolve, reject) => {
  const category = getSingleCategory(categoryKey);
  const categoryItem = getCategoryItems(categoryKey);
  Promise.all([category, categoryItem])
    .then(([categoryResponse, categoryItemResponse]) => resolve({ category: categoryResponse, items: categoryItemResponse }))
    .catch((error) => reject(error));
});

const deleteCategoryItems = (firebaseKey, uid) => new Promise((resolve, reject) => {
  getCategoryItems(firebaseKey).then((categoryItemArray) => {
    const deleteItems = categoryItemArray.map((items) => deleteItem(items.firebaseKey, uid));
    Promise.all(deleteItems).then(() => resolve(deleteCategory(firebaseKey, uid)));
  }).catch((error) => reject(error));
});

export { getCategoryItems, deleteCategoryItems };

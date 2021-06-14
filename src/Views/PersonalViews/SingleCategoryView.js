import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import ItemCard from '../../Components/ItemCardComponent';
import { showCategoryItems } from '../../Helpers/Data/CategoryItemData';
import { getSingleCategory } from '../../Helpers/Data/CategoryData';

export default function SingleCategoryView({ user }) {
  const [categoryItems, setCategoryItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const { categoryKey } = useParams();
  useEffect(() => {
    showCategoryItems(categoryKey).then((response) => setCategoryItems(response.items));
    getSingleCategory(user).then((response) => setCategories(response));
  }, []);
  console.warn(categories);
  return (
    <div className="categoryItemView">
        {categoryItems.map((item) => (
          <ItemCard
            key={item.firebaseKey}
            items={categoryItems}
            categoryKey={categoryKey}
            categories={categories}
            user={user}
            {...item}
          />
        ))}
      </div>
  );
}

SingleCategoryView.propTypes = {
  user: PropTypes.any
};

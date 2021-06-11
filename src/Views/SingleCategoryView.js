import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import ItemCard from '../Components/ItemCardComponent';
import { getCategoryItems } from '../Helpers/Data/CategoryItemData';
import { getCategory } from '../Helpers/Data/CategoryData';

export default function SingleCategoryView({ user }) {
  const [categoryItems, setCategoryItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    getCategoryItems(id).then((response) => setCategoryItems(response.items));
    getCategory(user.uid).then((response) => setCategories(response));
  }, []);
  console.warn(categories);
  return (
    <div className="categoryItemView">
        {categoryItems.map((item) => (
          <ItemCard
            key={item.firebaseKey}
            items={categoryItems}
            categoryKey={id}
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

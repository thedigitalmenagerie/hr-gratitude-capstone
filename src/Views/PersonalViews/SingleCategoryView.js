import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import ItemCard from '../../Components/PersonalComponents/ItemCardComponent';
import { showCategoryItems } from '../../helpers/data/CategoryItemData';
import { getCategory } from '../../helpers/data/CategoryData';

export default function SingleCategoryView({
  user,
}) {
  const [categoryItems, setCategoryItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const { categoryKey } = useParams();
  useEffect(() => {
    showCategoryItems(categoryKey).then((response) => setCategoryItems(response.items));
    getCategory(user).then((response) => setCategories(response));
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
            setCategories={setCategories}
            user={user}
            {...item}
          />
        ))}
      </div>
  );
}

SingleCategoryView.propTypes = {
  user: PropTypes.any,
};

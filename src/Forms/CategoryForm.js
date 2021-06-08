import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { updateCategory, addCategory } from '../Helpers/Data/CategoryData';

const CategoryForm = ({
  categoryFormTitle,
  setCategories,
  firebaseKey,
  categoryName,
  categoryImage,
  categoryDescription,
  uidKey,
  friendsOnly
}) => {
  const [category, setCategory] = useState({
    categoryName: categoryName || '',
    categoryImage: categoryImage || '',
    categoryDescription: categoryDescription || '',
    firebaseKey: firebaseKey || null,
    uidKey: uidKey || '',
    friendsOnly: friendsOnly || true,
  });

  const handleInputChange = (e) => {
    setCategory((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (category.firebaseKey) {
      updateCategory(category).then((categoryArray) => setCategories(categoryArray));
    } else {
      addCategory(category).then((categoryArray) => setCategories(categoryArray));

      setCategory({
        categoryName: '',
        categoryImage: '',
        categoryDescription: '',
        firebaseKey: null,
        uidKey: '',
        friendsOnly: true,
      });
    }
  };

  return (
    <form
      id="addCategoryForm"
      autoComplete='off'
      onSubmit={handleSubmit}
    >
      <h3 id="categoryFormTitle">{categoryFormTitle}</h3>
      <label>Name:</label>
      <input
        name='categoryName'
        type='text'
        placeholder='Category Name'
        value={category.categoryName}
        onChange={handleInputChange}
      >
      </input>
      <label>Description: </label>
      <input
        name='categoryDescription'
        type='text'
        placeholder='Category Descpription'
        value={category.categoryDescription}
        onChange={handleInputChange}
      >
      </input>
      <label>Image: </label>
      <input
        name='categoryImage'
        type='text'
        placeholder='Category Image URL'
        value={category.categoryImage}
        onChange={handleInputChange}
      >
      </input>
      <button type="submit">Add Category</button>
    </form>

  );
};

CategoryForm.propTypes = {
  categoryFormTitle: PropTypes.string.isRequired,
  setCategories: PropTypes.string,
  firebaseKey: PropTypes.string,
  categoryName: PropTypes.string,
  categoryImage: PropTypes.string,
  categoryDescription: PropTypes.string,
  friendsOnly: PropTypes.boolean,
  uidKey: PropTypes.string,
  category: PropTypes.any,
};

export default CategoryForm;

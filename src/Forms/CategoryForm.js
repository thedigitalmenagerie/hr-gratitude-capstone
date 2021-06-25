import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormGroup } from 'reactstrap';
import { AnimationWrapper } from 'react-hover-animation';
import { updateCategory, addCategory } from '../helpers/data/CategoryData';
import './FStyles/CategoryForm.scss';

const CategoryForm = ({
  categoryFormTitle,
  firebaseKey,
  categoryName,
  categoryImage,
  categoryDescription,
  uid,
  user,
  friendsOnly,
  setCategories,
}) => {
  const [category, setCategory] = useState({
    categoryName: categoryName || '',
    categoryImage: categoryImage || '',
    categoryDescription: categoryDescription || '',
    firebaseKey: firebaseKey || null,
    uid: uid || user.uid,
    friendsOnly: friendsOnly || false,
  });

  const handleInputChange = (e) => {
    setCategory((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCheckboxChange = (e) => {
    setCategory((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.name === 'friendsOnly' ? e.target.checked : e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (category.firebaseKey) {
      updateCategory(category, uid).then((categoryArray) => setCategories(categoryArray));
    } else {
      addCategory(category, user.uid).then((categoryArray) => setCategories(categoryArray));

      setCategory({
        categoryName: '',
        categoryImage: '',
        categoryDescription: '',
        firebaseKey: null,
        uid: '',
        friendsOnly: false,
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
      <label className="categoryNameLabel">Name:</label>
      <input
        className="category"
        name='categoryName'
        type='text'
        placeholder='Category Name'
        value={category.categoryName}
        onChange={handleInputChange}
      >
      </input>
      <label>Description: </label>
      <input
        className="category"
        name='categoryDescription'
        type='text'
        placeholder='Category Descpription'
        value={category.categoryDescription}
        onChange={handleInputChange}
      >
      </input>
      <label>Image: </label>
      <input
        className="category"
        name='categoryImage'
        type='text'
        placeholder='Category Image URL'
        value={category.categoryImage}
        onChange={handleInputChange}
      >
      </input>
      <FormGroup check id="form-check">
        <label check>Visible To Friends Only:</label>
        <input
          className="category"
          name='friendsOnly'
          type='checkbox'
          checked={category.friendsOnly}
          value={category.friendsOnly}
          onChange={handleCheckboxChange} >
        </input>
      </FormGroup>
      <AnimationWrapper><button className="addCategory" type="submit">Add Category</button></AnimationWrapper>
    </form>
  );
};

CategoryForm.propTypes = {
  categoryFormTitle: PropTypes.string.isRequired,
  setCategories: PropTypes.func,
  firebaseKey: PropTypes.string,
  categoryName: PropTypes.string,
  categoryImage: PropTypes.string,
  categoryDescription: PropTypes.string,
  friendsOnly: PropTypes.bool,
  uid: PropTypes.string,
  user: PropTypes.object,
  category: PropTypes.any,
};

export default CategoryForm;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormGroup } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { updateCategory, addCategory } from '../Helpers/Data/CategoryData';
import './FStyles/CategoryForm.scss';

const CategoryForm = ({
  categoryFormTitle,
  setCategories,
  firebaseKey,
  categoryName,
  categoryImage,
  categoryDescription,
  uid,
  user,
  friendsOnly
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

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (category.firebaseKey) {
      updateCategory(category).then((categoryArray) => setCategories(categoryArray));
      history.push('myCategories');
    } else {
      addCategory(category).then((categoryArray) => setCategories(categoryArray));
      history.push('myCategories');

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
    <div className="categoryFormContainer">
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
      <FormGroup check id="form-check">
        <label check>Visible To Friends Only:</label>
        <input
          name='friendsOnly'
          type='checkbox'
          checked={category.friendsOnly}
          value={category.friendsOnly}
          onChange={handleCheckboxChange} >
        </input>
      </FormGroup>
      <button type="submit">Add Category</button>
    </form>
    </div>
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

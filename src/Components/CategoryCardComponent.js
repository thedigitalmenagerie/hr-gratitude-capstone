import React, { useState } from 'react';
import {
  Card,
  CardImg,
  CardTitle,
  CardText,
} from 'reactstrap';
import PropTypes from 'prop-types';
import CategoryForm from '../Forms/CategoryForm';
import { deleteCategory } from '../Helpers/Data/CategoryData';
import './CStyles/CategoryCardComponent.scss';

const CategoryCards = ({
  setCategories,
  firebaseKey,
  categoryName,
  categoryImage,
  categoryDescription,
  uid,
  friendsOnly,
  user,
  setUser,
}) => {
  const [editingCategories, setEditingCategories] = useState(false);
  const [flip, setFlip] = useState();

  const handleClick = (type) => {
    switch (type) {
      case 'delete':
        deleteCategory(firebaseKey)
          .then((categoryArray) => setCategories(categoryArray));
        break;
      case 'edit':
        setEditingCategories((prevState) => !prevState);
        break;
      case 'flip':
        setFlip((prevState) => !prevState);
        break;
      default:
        console.warn('Nothing selected');
    }
  };

  return (
    <div className="categoryContainer">
        <Card className= "categoryCard" key={firebaseKey} id={uid} flip={flip} flipDirection="horizontal">
          <div className="front" key="front">
          <CardImg className="categoryImg" src={categoryImage} alt="Honey-Rae Swan"/>
          </div>
          <div className="back" key="back">
          <CardTitle tag="h5" className="name">{categoryName}</CardTitle>
              <CardText id="area">{categoryDescription}</CardText>
              <CardText id="area">{friendsOnly}</CardText>
              <div className="buttonContainer">
                <button id="deleteCategory" onClick={() => handleClick('delete')}>Delete Category</button>
                <button id="viewCategoryItems" onClick={() => handleClick('view')}>View Items</button>
                <button id="editCategory" onClick={() => handleClick('edit')}>
                  {editingCategories ? 'Close Form' : 'Edit Category'}
                </button>
              </div>
              <div className="displayEdit">
                {editingCategories && <CategoryForm
                  categoryFormTitle='Edit Category'
                  firebaseKey={firebaseKey}
                  categoryImage={categoryImage}
                  categoryName={categoryName}
                  categoryDescription={categoryDescription}
                  uid={uid}
                  friendsOnly={friendsOnly}
                  setCategories={setCategories}
                  user={user}
                  setUser={setUser}
                />}
              </div>
          </div>
      </Card>
    </div>
  );
};

CategoryCards.propTypes = {
  firebaseKey: PropTypes.string.isRequired,
  setCategories: PropTypes.func,
  user: PropTypes.any,
  setUser: PropTypes.func,
  categoryName: PropTypes.string.isRequired,
  categoryImage: PropTypes.string.isRequired,
  categoryDescription: PropTypes.string.isRequired,
  friendsOnly: PropTypes.bool,
  uid: PropTypes.string.isRequired
};

export default CategoryCards;

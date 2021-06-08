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

const CategoryCards = ({
  setCategories,
  firebaseKey,
  categoryName,
  categoryImage,
  categoryDescription,
  uidKey,
  user,
  setUser,
}) => {
  const [editingCategories, setEditingCategories] = useState(false);

  const handleClick = (type) => {
    switch (type) {
      case 'delete':
        deleteCategory(firebaseKey)
          .then((categoryArray) => setCategories(categoryArray));
        break;
      case 'edit':
        setEditingCategories((prevState) => !prevState);
        break;
      default:
        console.warn('Nothing selected');
    }
  };

  return (
    <div className="categoryContainer">
      <Card className= "categoryLeft" key={firebaseKey}>
        <div className="row no-gutters">
          <div className="col-5">
            <CardImg className="categoryImg" src={categoryImage} alt="Honey-Rae Swan" />
          </div>
          <div className="col-5 right">
              <CardTitle tag="h5" className="name">{categoryName}</CardTitle>
              <CardText id="area">{categoryDescription}</CardText>
              <div>
                <button id="deleteCategory" onClick={() => handleClick('delete')}>Delete Category</button>
                <button id="editCategory" onClick={() => handleClick('edit')}>
                  {editingCategories ? 'Close Form' : 'Edit Category'}
                </button>
              </div>
              <div>
                {editingCategories && <CategoryForm
                  categoryFormTitle='Edit Category'
                  firebaseKey={firebaseKey}
                  categoryImage={categoryImage}
                  categoryName={categoryName}
                  categoryDescription={categoryDescription}
                  uidKey={uidKey}
                  setCategories={setCategories}
                  user={user}
                  setUser={setUser}
                />}
              </div>
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
  uidKey: PropTypes.string.isRequired
};

export default CategoryCards;

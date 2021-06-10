import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getCategory } from '../Helpers/Data/CategoryData';
import CategoryForm from '../Forms/CategoryForm';
import CategoryCards from '../Components/CategoryCardComponent';

export default function CategoryView({
  setUser,
  user,
}) {
  const [categories, setCategories] = useState([]);
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);

  const handleClick = () => {
    setShowAddCategoryForm((prevState) => !prevState);
  };

  useEffect(() => {
    getCategory(user.uid).then((response) => setCategories(response));
  }, []);
  return (
    <div className="categoryView">
      <div className="innerContainer">
        {!showAddCategoryForm
          ? <div>
            <button id="addCategory" onClick={handleClick}>Add Category</button>
            {categories.map((categoryInfo) => (
          <CategoryCards
            key={categoryInfo.firebaseKey}
            firebaseKey={categoryInfo.firebaseKey}
            categoryImage={categoryInfo.categoryImage}
            categoryName={categoryInfo.categoryName}
            categoryDescription={categoryInfo.categoryDescription}
            uid={categoryInfo.uid}
            friendsOnly={categoryInfo.friendsOnly}
            setCategories={setCategories}
            user={user}
            setUser={setUser}
          />
            ))}
            </div>
          : <div>
              <button id="closeForm" onClick={handleClick}>Close Form</button>
              <CategoryForm
                categoryFormTitle="Add Category"
                setCategories={setCategories}
                user={user}
                setUser={setUser}
              />
            </div>
        }
      </div>
    </div>
  );
}

CategoryView.propTypes = {
  user: PropTypes.any,
  setUser: PropTypes.func,
  categories: PropTypes.any,
  setCategories: PropTypes.func,
};

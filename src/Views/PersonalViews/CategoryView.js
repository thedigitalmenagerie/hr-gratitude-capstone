import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StackGrid from 'react-stack-grid';
import CategoryForm from '../../Forms/CategoryForm';
import CategoryCards from '../../Components/CategoryCardComponent';
import './VStyles/CategoryView.scss';

export default function CategoryView({
  setUser,
  user,
  setItems,
  categories,
  setCategories,
}) {
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);

  const handleClick = () => {
    setShowAddCategoryForm((prevState) => !prevState);
  };

  return (
    <div className="categoryView">
      <div className="innerContainer">
        {!showAddCategoryForm
          ? <div>
              <form action="/" method="get" className="searchCategories">
                <label htmlFor="header-search"></label>
                <input
                  type="text"
                  id="header-search"
                  placeholder="Search Your Categories"
                  name="s"
                  className="input"
                />
                <button className="searchCategoriesButton" type="submit">Search</button>
              </form>
              <button id="addCategory" onClick={handleClick}>Add Category</button>
              <StackGrid className="stackGridCategories" gutterHeight={10}>
                  {categories.map((categoryInfo) => (
                  <CategoryCards
                    key={categoryInfo.firebaseKey}
                    {...categoryInfo}
                    setCategories={setCategories}
                    user={user}
                    setUser={setUser}
                    setItems={setItems}
                  />
                  ))}
              </StackGrid>

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
  setItems: PropTypes.func,
};

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StackGrid from 'react-stack-grid';
import CategoryForm from '../../Forms/CategoryForm';
import CategoryCards from '../../Components/PersonalComponents/CategoryCardComponent';
import './VStyles/CategoryView.scss';

export default function CategoryView({
  setUser,
  user,
  categories,
  setCategories,
}) {
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState('');

  const handleClick = () => {
    setShowAddCategoryForm((prevState) => !prevState);
  };

  useEffect(() => {
    setFilteredData(
      categories.filter((category) => category.categoryName.toLowerCase().includes(search.toLowerCase()))
    );
  }, [search, categories]);

  return (
    <div className="categoryView">
        {!showAddCategoryForm
          ? <div className="innerContainer">
              { filteredData.length === 0
                ? <h6 className="header">Category not found!</h6>
                : <div className="searchAndCardContainer">
                      <div className="searchContainer">
                        <h6 className="header">All Categories</h6>
                        <input type="search" id="search" placeholder="Search" aria-describedby="button-addon" className="form-control" onChange={(e) => setSearch(e.target.value)}/>
                        <button id="addCategory" onClick={handleClick}>Add Category</button>
                      </div>
                      <div className="cardContainer">
                        <StackGrid>
                          {filteredData?.map((categoryInfo) => (
                            <CategoryCards
                              key={categoryInfo.firebaseKey}
                              {...categoryInfo}
                              setCategories={setCategories}
                              user={user}
                              setUser={setUser}
                              categories={categories}
                            />
                          ))}
                        </StackGrid>
                      </div>
                    </div>
              }
            </div>
          : <div>
              <button id="closeForm" onClick={handleClick}>Close Form</button>
              <CategoryForm
                categoryFormTitle="Add Category"
                setCategories={setCategories}
                user={user}
                categories={categories}
                setUser={setUser}
                setShowAddCategoryForm={setShowAddCategoryForm}
              />
            </div>
        } </div>
  );
}

CategoryView.propTypes = {
  user: PropTypes.any,
  setUser: PropTypes.func,
  categories: PropTypes.any,
  setCategories: PropTypes.func,
  setShowAddCategoryForm: PropTypes.any,
};

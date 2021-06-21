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
          ? <div>
              { filteredData.length === 0
                ? <div className="d-flex flex-column justify-content-center">
                    <h5 className="text-center my-3">No categories found with that name!</h5>
                  </div>
                : <div>
                    <div className="d-flex flex-column justify-content-center">
                      <h1 className="text-center my-3">All Categories</h1>
                      <div className="form-group mb-4 d-flex justify-content-center">
                        <input type="search" id="search" placeholder="Search by category name..." aria-describedby="button-addon" className="form-control" onChange={(e) => setSearch(e.target.value)}/>
                    </div>
                    <button id="addCategory" onClick={handleClick}>Add Category</button>
                    <StackGrid className="stackGridCategories" gutterHeight={10}>
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
                  </div></div>
              } </div>
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

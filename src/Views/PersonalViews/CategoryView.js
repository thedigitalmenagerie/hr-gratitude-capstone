import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import ClipLoader from 'react-spinners/ClipLoader';
import { animations } from 'react-animation';
import { AnimationWrapper } from 'react-hover-animation';
import Typing from 'react-typing-animation';
import CategoryForm from '../../Forms/CategoryForm';
import CategoryCards from '../../Components/PersonalComponents/CategoryCardComponent';
import whiteX from '../../Assets/whiteX.png';
import './VStyles/CategoryView.scss';

Modal.setAppElement('#root');

export default function CategoryView({
  setUser,
  user,
  categories,
  setCategories,
}) {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState('');
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    setFilteredData(
      categories.filter((category) => category.categoryName.toLowerCase().includes(search.toLowerCase()))
    );
    setLoading(false);
  }, [search, categories]);

  return (
    <div>
      { loading
        ? <div className="loading">
            <Typing><h6 className="">Just a sec.</h6></Typing>
            <ClipLoader color="#b6b34b" loading={loading} size={150} className="spinner" />
          </div>
        : <div id="categoryView" style={{ animation: animations.fadeIn }}>
            { filteredData.length === 0
              ? <div>
                <Typing><h6>Add an category.</h6></Typing>
                <AnimationWrapper><button className="addCategory" onClick={openModal}>Add Category</button></AnimationWrapper>
              </div>
              : <div className="innerContainer">
                  { filteredData.length === 0
                    ? <Typing><h6 className="header">Category not found!</h6></Typing>
                    : <div className="searchAndCardContainer">
                        <div className="searchContainer">
                        <Typing><h1 className="header">Your Categories</h1></Typing>
                          <input type="search" id="categorySearch" placeholder="Search" aria-describedby="button-addon" className="form-control" onChange={(e) => setSearch(e.target.value)}/>
                          <AnimationWrapper><button className="addCategory" onClick={openModal}>Add Category</button></AnimationWrapper>
                        </div>
                        <div className="cardContainer">
                          {filteredData.map((categoryInfo) => (
                            <CategoryCards
                            key={categoryInfo.firebaseKey}
                            {...categoryInfo}
                            setCategories={setCategories}
                            user={user}
                            setUser={setUser}
                            categories={categories}
                            />
                          ))}
                        </div>
                        <div>
                        <Modal
                          isOpen={modalIsOpen}
                          onRequestClose={closeModal}
                          className="Modal"
                        >
                          <AnimationWrapper><button className="modalClose" onClick={closeModal}><img src={whiteX}/>Close Form</button></AnimationWrapper>
                          <div className="formContainer"></div>
                          <CategoryForm
                            categoryFormTitle="Add Category"
                            setCategories={setCategories}
                            user={user}
                            categories={categories}
                            setUser={setUser}
                          />
                        </Modal>
                        </div>
                      </div>
                  }
                </div>
            }
           </div>
      }
    </div>
  );
}

CategoryView.propTypes = {
  user: PropTypes.any,
  setUser: PropTypes.func,
  categories: PropTypes.any,
  setCategories: PropTypes.func,
  setShowAddCategoryForm: PropTypes.any,
};

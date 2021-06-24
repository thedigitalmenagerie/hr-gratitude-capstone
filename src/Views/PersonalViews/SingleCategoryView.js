import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import ClipLoader from 'react-spinners/ClipLoader';
import { useParams } from 'react-router-dom';
import Typing from 'react-typing-animation';
import { animations } from 'react-animation';
import { AnimationWrapper } from 'react-hover-animation';
import ItemCard from '../../Components/PersonalComponents/ItemCardComponent';
import { showCategoryItems } from '../../helpers/data/CategoryItemData';
import { getCategory } from '../../helpers/data/CategoryData';
import ItemForm from '../../Forms/ItemForm';
import whiteX from '../../Assets/whiteX.png';
import './VStyles/SingleCategoryView.scss';

export default function SingleCategoryView({
  user,
}) {
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [categoryItems, setCategoryItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const { categoryKey } = useParams();
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState('');

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    showCategoryItems(categoryKey).then((response) => setCategoryItems(response.items));
    getCategory(user).then((response) => setCategories(response));
    setLoading(false);
  }, []);

  useEffect(() => {
    setFilteredData(
      categoryItems.filter((categoryItem) => categoryItem.itemName.toLowerCase().includes(search.toLowerCase()))
    );
    setLoading(false);
  }, [search, categoryItems]);

  return (
    <div>
      { loading
        ? <div className="loading">
            <Typing><h6 className="">Just a sec.</h6></Typing>
            <ClipLoader color="#b6b34b" loading={loading} size={150} className="spinner" />
          </div>
        : <div className="categoryItemView" style={{ animation: animations.fadeIn }}>
                { categoryItems.length === 0
                  ? <div className="d-flex flex-column justify-content-center">
                  <Typing><h5 className="text-center my-3">No items found with that name!</h5></Typing>
                  <AnimationWrapper><button id="addItem" onClick={openModal}>Add Item</button></AnimationWrapper>
                  <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        className="Modal"
                      >
                        <AnimationWrapper><button className="modalClose" onClick={closeModal}><img src={whiteX}/>Close Form</button></AnimationWrapper>
                        <ItemForm
                        itemFormTitle="Add Item"
                        setItems={setCategoryItems}
                        user={user}
                        items={categoryItems}
                        categories={categories}
                        setCategories={setCategories}
                        />
                      </Modal>
                </div>
                  : <div className="innerContainer">
                    <div className="searchAndCardContainer">
                      <input type="search" id="categoryItemSearch" placeholder="Search" aria-describedby="button-addon" className="form-control" onChange={(e) => setSearch(e.target.value)}/>
                    </div>
                    <div className="cardContainer">
                      {filteredData.map((item) => (
                        <ItemCard
                          key={item.firebaseKey}
                          items={categoryItems}
                          categoryKey={categoryKey}
                          categories={categories}
                          setCategories={setCategories}
                          setItems={setCategoryItems}
                          user={user}
                          {...item}
                        />
                      ))}
                    </div>

                </div>
          }
      </div>
    }</div>
  );
}

SingleCategoryView.propTypes = {
  user: PropTypes.any,
};

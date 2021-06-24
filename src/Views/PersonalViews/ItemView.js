import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import ClipLoader from 'react-spinners/ClipLoader';
import { animations } from 'react-animation';
import { AnimationWrapper } from 'react-hover-animation';
import Typing from 'react-typing-animation';
import ItemForm from '../../Forms/ItemForm';
import ItemCards from '../../Components/PersonalComponents/ItemCardComponent';
import { getItem } from '../../helpers/data/ItemData';
import whiteX from '../../Assets/whiteX.png';
import './VStyles/ItemView.scss';

Modal.setAppElement('#root');

export default function ItemView({
  user,
  setUser,
  categories,
}) {
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const [filteredData, setFilteredData] = useState('');

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    setFilteredData(
      items.filter((item) => item.itemName.toLowerCase().includes(search.toLowerCase()))
    );
    setLoading(false);
  }, [search, items]);

  useEffect(() => {
    getItem(user?.uid).then((response) => setItems(response));
    console.warn(categories);
    setLoading(false);
  }, []);

  return (
    <div style={{ animation: animations.fadeIn }}>
      { loading
        ? <div className="loading">
            <Typing><h6 className="">Just a sec.</h6></Typing>
            <ClipLoader color="#b6b34b" loading={loading} size={150} className="spinner" />
          </div>
        : <div className="itemView">
            { items.length === 0
              ? <Typing><h6>Add items to your wishlist.</h6></Typing>
              : <div className="innerContainer">
                  { items.length === 0
                    ? <Typing><h6 className="">No items found with that name!</h6></Typing>
                    : <div className="searchAndCardContainer">
                        <div className="searchContainer">
                        <Typing><h1 className="">Your Items</h1></Typing>
                        <input type="search" id="itemSearch" placeholder="Search" aria-describedby="button-addon" className="form-control" onChange={(e) => setSearch(e.target.value)}/>
                          <AnimationWrapper><button id="addItem" onClick={openModal}>Add Item</button></AnimationWrapper>
                          </div>
                          <div className="cardContainer">
                            {filteredData?.map((itemInfo) => (
                              <ItemCards
                                key={itemInfo.firebaseKey}
                                {...itemInfo}
                                setItems={setItems}
                                setUser={setUser}
                                user={user}
                                categories={categories}
                              />
                            ))}
                          </div>
                      <div className="formContainer">
                      <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        className="Modal"
                      >
                        <AnimationWrapper><button className="modalClose" onClick={closeModal}><img src={whiteX}/>Close Form</button></AnimationWrapper>
                        <ItemForm
                        itemFormTitle="Add Item"
                        setItems={setItems}
                        user={user}
                        setUser={setUser}
                        categories={categories}
                        />
                      </Modal>
                      </div>
                    </div>
                  }</div>
            }
         </div>
      }
    </div>
  );
}

ItemView.propTypes = {
  user: PropTypes.any,
  setUser: PropTypes.func,
  categories: PropTypes.array,
  setIsOpen: PropTypes.func,
};

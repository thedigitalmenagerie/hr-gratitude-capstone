import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StackGrid from 'react-stack-grid';
import { AnimationWrapper } from 'react-hover-animation';
import ItemForm from '../../Forms/ItemForm';
import ItemCards from '../../Components/PersonalComponents/ItemCardComponent';
import { getItem } from '../../helpers/data/ItemData';
import './VStyles/ItemView.scss';

export default function ItemView({
  user,
  setUser,
  categories,
}) {
  const [items, setItems] = useState([]);
  const [showAddItemForm, setShowAddItemForm] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState('');

  const handleClick = () => {
    setShowAddItemForm((prevState) => !prevState);
    console.warn(categories);
  };

  useEffect(() => {
    setFilteredData(
      items.filter((item) => item.itemName.toLowerCase().includes(search.toLowerCase()))
    );
  }, [search, items]);

  useEffect(() => {
    getItem(user?.uid).then((response) => setItems(response));
  }, []);

  return (
    <div className="itemView">
    <div className="innerContainer">
      {!showAddItemForm
        ? <div>
          { filteredData.length === 0
            ? <div className="d-flex flex-column justify-content-center">
                  <h5 className="text-center my-3">No items found with that name!</h5>
                </div>
            : <div>
                  <div className="d-flex flex-column justify-content-center">
                    <h1 className="text-center my-3">All Items</h1>
                    <div className="form-group mb-4 d-flex justify-content-center">
                      <input type="search" id="search" placeholder="Search by item name..." aria-describedby="button-addon" className="form-control" onChange={(e) => setSearch(e.target.value)}/>
                    </div>
                    <AnimationWrapper><button id="addItem" onClick={handleClick}>Add Item</button></AnimationWrapper>
                    <StackGrid className="stackGridItems">
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
                    </StackGrid>
                </div>
              </div>
          } </div>
        : <div>
        <button id="closeForm" onClick={handleClick}>Close Form</button>
        <ItemForm
          itemFormTitle="Add Item"
          setItems={setItems}
          user={user}
          setUser={setUser}
          categories={categories}
          setShowAddItemForm={setShowAddItemForm}
        />
      </div>
      }
    </div>
  </div>
  );
}

ItemView.propTypes = {
  user: PropTypes.any,
  setUser: PropTypes.func,
  categories: PropTypes.array,
  setShowAddItemForm: PropTypes.any,
};

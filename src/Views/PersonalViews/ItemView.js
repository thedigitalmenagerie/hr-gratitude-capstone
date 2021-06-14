import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StackGrid from 'react-stack-grid';
import ItemForm from '../../Forms/ItemForm';
import ItemCards from '../../Components/ItemCardComponent';
import './VStyles/ItemView.scss';

export default function ItemView({
  user,
  setUser,
  items,
  setItems,
  categories,
}) {
  const [showAddItemForm, setShowAddItemForm] = useState(false);

  const handleClick = () => {
    setShowAddItemForm((prevState) => !prevState);
    console.warn(categories);
  };

  return (
    <div className="itemView">
      <div className="innerContainer">
        {!showAddItemForm
          ? <div>
              <form action="/" method="get" className="searchItems">
                <label htmlFor="header-search"></label>
                <input
                  type="text"
                  id="header-search"
                  placeholder="Search Your Items"
                  name="s"
                  className="input"
                />
                <button className="searchItemsButton" type="submit">Search</button>
              </form>
            <button id="addItem" onClick={handleClick}>Add Item</button>
            <StackGrid className="stackGridItems">
              {items.map((itemInfo) => (
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
          : <div>
              <button id="closeForm" onClick={handleClick}>Close Form</button>
              <ItemForm
                itemFormTitle="Add Item"
                setItems={setItems}
                user={user}
                setUser={setUser}
                categories={categories}
              />
            </div>
        }
      </div>
    </div>
  );
}

ItemView.propTypes = {
  items: PropTypes.array,
  user: PropTypes.any,
  setUser: PropTypes.func,
  categories: PropTypes.array,
  setItems: PropTypes.func,
};

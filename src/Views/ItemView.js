import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getItem } from '../Helpers/Data/ItemData';
import ItemForm from '../Forms/ItemForm';
import ItemCards from '../Components/ItemCardComponent';

export default function ItemView({
  setUser,
  user,
  categories,
}) {
  const [items, setItems] = useState([]);
  const [showAddItemForm, setShowAddItemForm] = useState(false);

  const handleClick = () => {
    setShowAddItemForm((prevState) => !prevState);
  };

  useEffect(() => {
    getItem(user.uid).then((response) => setItems(response));
  }, []);
  return (
    <div className="itemView">
      <div className="innerContainer">
        {!showAddItemForm
          ? <div>
            <button id="addItem" onClick={handleClick}>Add Item</button>
            {items.map((itemInfo) => (
          <ItemCards
            key={itemInfo.firebaseKey}
            firebaseKey={itemInfo.firebaseKey}
            itemImage={itemInfo.itemImage}
            itemName={itemInfo.itemName}
            itemDescription={itemInfo.itemDescription}
            price={itemInfo.price}
            where={itemInfo.where}
            used={itemInfo.used}
            purchased={itemInfo.purchased}
            uid={itemInfo.uid}
            categories={categories}
            categoryKey={itemInfo.categoryKey}
            friendsOnly={itemInfo.friendsOnly}
            setItems={setItems}
            user={user}
            setUser={setUser}
          />
            ))}
            </div>
          : <div>
              <button id="closeForm" onClick={handleClick}>Close Form</button>
              <ItemForm
                itemFormTitle="Add Item"
                setItems={setItems}
                user={user}
                setUser={setUser}
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
  categories: PropTypes.any,
};

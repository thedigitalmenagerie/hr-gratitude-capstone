import React, { useState } from 'react';
import {
  Card,
  CardImg,
  CardTitle,
  CardText,
} from 'reactstrap';
import PropTypes from 'prop-types';
import ItemForm from '../../Forms/ItemForm';
import { deleteItem } from '../../helpers/data/ItemData';
import './CStyles/ItemCardComponent.scss';

const ItemCards = ({
  setItems,
  firebaseKey,
  itemName,
  itemImage,
  itemDescription,
  price,
  where,
  used,
  purchased,
  uid,
  categoryKey,
  friendsOnly,
  user,
  setUser,
  categoryName,
  categories,
}) => {
  const [editingItems, setEditingItems] = useState(false);
  const [flip, setFlip] = useState();

  const handleClick = (type) => {
    switch (type) {
      case 'delete':
        deleteItem(firebaseKey)
          .then((itemArray) => setItems(itemArray));
        break;
      case 'edit':
        setEditingItems((prevState) => !prevState);
        break;
      case 'flip':
        setFlip((prevState) => !prevState);
        break;
      default:
        console.warn('Nothing selected');
    }
  };

  return (
    <div className="itemContainer">
            <Card className= "itemCard" key={firebaseKey} id={uid} flip={flip} flipDirection="horizontal">
          <div className="front" key="front">
          <CardImg className="itemImg" src={itemImage} alt="Honey-Rae Swan" />
          </div>
          <div className="back" key="back">
          <CardTitle tag="h5" className="name">{itemName}</CardTitle>
              <CardText id="area">{itemDescription}</CardText>
              <CardText id="area">{price}</CardText>
              <CardText id="area">{categories.categoryName}</CardText>
              <div>
                <button id="deleteItem" onClick={() => handleClick('delete')}>Delete Item</button>
                <button id="editItem" onClick={() => handleClick('edit')}>
                  {editingItems ? 'Close Form' : 'Edit Item'}
                </button>
              </div>
              <div>
                {editingItems && <ItemForm
                  itemFormTitle='Edit Item'
                  firebaseKey={firebaseKey}
                  itemImage={itemImage}
                  itemName={itemName}
                  itemDescription={itemDescription}
                  price={price}
                  where={where}
                  used={used}
                  purchased={purchased}
                  uid={uid}
                  categoryName={categoryName}
                  categoryKey={categoryKey}
                  friendsOnly={friendsOnly}
                  setItems={setItems}
                  user={user}
                  setUser={setUser}
                  categories={categories}
                />}
              </div>
          </div>
      </Card>
    </div>

  );
};

ItemCards.propTypes = {
  setItems: PropTypes.any,
  firebaseKey: PropTypes.string,
  itemName: PropTypes.string,
  itemImage: PropTypes.string,
  itemDescription: PropTypes.string,
  price: PropTypes.string,
  where: PropTypes.string,
  used: PropTypes.bool,
  purchased: PropTypes.bool,
  uid: PropTypes.string,
  categoryName: PropTypes.string,
  categoryKey: PropTypes.string,
  friendsOnly: PropTypes.bool,
  user: PropTypes.any,
  setUser: PropTypes.any,
  categories: PropTypes.array,
};

export default ItemCards;

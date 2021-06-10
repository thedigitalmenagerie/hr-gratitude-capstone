import React, { useState } from 'react';
import {
  Card,
  CardImg,
  CardTitle,
  CardText,
} from 'reactstrap';
import PropTypes from 'prop-types';
import ItemForm from '../Forms/ItemForm';
import { deleteItem } from '../Helpers/Data/ItemData';

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
}) => {
  const [editingItems, setEditingItems] = useState(false);

  const handleClick = (type) => {
    switch (type) {
      case 'delete':
        deleteItem(firebaseKey)
          .then((itemArray) => setItems(itemArray));
        break;
      case 'edit':
        setEditingItems((prevState) => !prevState);
        break;
      default:
        console.warn('Nothing selected');
    }
  };

  return (
    <div className="itemContainer">
      <Card className= "itemLeft" key={firebaseKey} id={uid}>
        <div className="row no-gutters">
          <div className="col-5">
            <CardImg className="itemImg" src={itemImage} alt="Honey-Rae Swan" />
          </div>
          <div className="col-5 right">
              <CardTitle tag="h5" className="name">{itemName}</CardTitle>
              <CardText id="area">{itemDescription}</CardText>
              <CardText id="area">{price}</CardText>
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
                  categoryKey={categoryKey}
                  friendsOnly={friendsOnly}
                  setItems={setItems}
                  user={user}
                  setUser={setUser}
                />}
              </div>
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
  used: PropTypes.boolean,
  purchased: PropTypes.boolean,
  uid: PropTypes.string,
  categoryKey: PropTypes.string,
  friendsOnly: PropTypes.boolean,
  user: PropTypes.any,
  setUser: PropTypes.any,
};

export default ItemCards;

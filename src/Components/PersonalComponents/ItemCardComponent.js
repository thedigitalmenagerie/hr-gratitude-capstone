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
import greenPrice from '../../Assets/greenPrice.png';
import greenDelete from '../../Assets/greenDelete.png';
import greenUpdate from '../../Assets/greenUpdate.png';
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

  const handleClick = (type) => {
    switch (type) {
      case 'delete':
        deleteItem(firebaseKey, uid)
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
            <Card className= "itemCard" key={firebaseKey} id={uid}>
          <CardImg className="itemImg" src={itemImage} alt="Honey-Rae Swan" />
          <CardTitle tag="h5" className="itemName">{itemName}</CardTitle>
              <CardText id="area">{itemDescription}</CardText>
              <CardText id="price"><img className="greenPrice" src={greenPrice}/>{price}</CardText>
              <CardText id="area">{categories.categoryName}</CardText>
              <div>
                <button id="deleteItem" onClick={() => handleClick('delete')}><img className="greenDelete" src={greenDelete}/></button>
                <button id="editItem" onClick={() => handleClick('edit')}>
                  {editingItems ? 'Close Form' : <img className="greenUpdate" src={greenUpdate}/>}
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

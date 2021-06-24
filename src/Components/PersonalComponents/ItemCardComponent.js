import React from 'react';
import {
  Card,
  CardImg,
  CardTitle,
  CardText,
} from 'reactstrap';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { AnimationWrapper } from 'react-hover-animation';
import ItemForm from '../../Forms/ItemForm';
import { deleteItem } from '../../helpers/data/ItemData';
import greenPrice from '../../Assets/greenPrice.png';
import greenDelete from '../../Assets/greenDelete.png';
import greenUpdate from '../../Assets/greenUpdate.png';
import whiteX from '../../Assets/whiteX.png';
import './CStyles/ItemCardComponent.scss';

Modal.setAppElement('#root');

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
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleClick = (type) => {
    switch (type) {
      case 'delete':
        deleteItem(firebaseKey, uid)
          .then((itemArray) => setItems(itemArray));
        break;
      default:
        console.warn('Nothing selected');
    }
  };

  return (
            <Card className= "itemCard" key={firebaseKey} id={uid}>
          <CardImg className="itemImg" src={itemImage} alt="Honey-Rae Swan" />
          <CardTitle tag="h5" className="itemName">{itemName}</CardTitle>
              <CardText id="area">{itemDescription}</CardText>
              <CardText id="price"><a href={where} target="_blank" rel="noopener noreferrer"><img className="greenPrice" src={greenPrice}/></a>{price}</CardText>
              <CardText id="area">{categories.categoryName}</CardText>
              <div className="buttonContainer row">
                <AnimationWrapper><button id="deleteItem" onClick={() => handleClick('delete')}><img className="greenDelete" src={greenDelete}/></button></AnimationWrapper>
                <AnimationWrapper><button id="editItem" onClick={openModal}><img className="greenUpdate" src={greenUpdate}/></button></AnimationWrapper>
              </div>
              <div>
              <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={closeModal}
                  className="Modal"
                >
                  <AnimationWrapper><button className="modalClose" onClick={closeModal}><img src={whiteX}/>Close Form</button></AnimationWrapper>
                  <ItemForm
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
                />
                </Modal>
              </div>
      </Card>
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

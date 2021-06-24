import React from 'react';
import { useHistory } from 'react-router-dom';
import Modal from 'react-modal';
import {
  Card,
  CardImg,
  CardTitle,
  CardText,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { AnimationWrapper } from 'react-hover-animation';
import CategoryForm from '../../Forms/CategoryForm';
import { deleteCategoryItems } from '../../helpers/data/CategoryItemData';
import './CStyles/CategoryCardComponent.scss';
import greenView from '../../Assets/greenView.png';
import greenDelete from '../../Assets/greenDelete.png';
import greenUpdate from '../../Assets/greenUpdate.png';
import whiteX from '../../Assets/whiteX.png';

Modal.setAppElement('#root');

const CategoryCards = ({
  setCategories,
  firebaseKey,
  categoryName,
  categoryImage,
  categoryDescription,
  uid,
  friendsOnly,
  user,
}) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const history = useHistory();

  const handleClick = (type) => {
    switch (type) {
      case 'delete':
        deleteCategoryItems(firebaseKey, uid)
          .then((categoryArray) => setCategories(categoryArray));
        break;
      case 'view':
        history.push(`/myCategories/${firebaseKey}`);
        break;
      default:
        console.warn('Nothing selected');
    }
  };

  return (
        <Card className= "categoryCard" key={firebaseKey} id={uid}>
          <CardImg className="categoryImg" src={categoryImage} alt="Honey-Rae Swan"/>
          <CardTitle tag="h5" className="categoryName">{categoryName}</CardTitle>
              <CardText id="area">{categoryDescription}</CardText>
              <CardText id="area">{friendsOnly}</CardText>
              <div className="buttonContainer">
                <AnimationWrapper><button id="deleteCategory" onClick={() => handleClick('delete')}><img className="buttonCategoryImage" src={greenDelete}/></button></AnimationWrapper>
                <AnimationWrapper><button id="viewCategory" onClick={() => handleClick('view')}><img className="buttonCategoryImage" src={greenView}/></button></AnimationWrapper>
                <AnimationWrapper><button id="editCategory" onClick={openModal}><img className="buttonCategoryImage" src={greenUpdate}/></button></AnimationWrapper>
              </div>
              <div className="displayEdit">
                <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={closeModal}
                  className="Modal"
                >
                  <AnimationWrapper><button className="modalClose" onClick={closeModal}><img src={whiteX}/>Close Form</button></AnimationWrapper>
                  <CategoryForm
                  categoryFormTitle='Edit Category'
                  firebaseKey={firebaseKey}
                  categoryImage={categoryImage}
                  categoryName={categoryName}
                  categoryDescription={categoryDescription}
                  uid={uid}
                  friendsOnly={friendsOnly}
                  setCategories={setCategories}
                  user={user}
                />
                </Modal>
              </div>
      </Card>
  );
};

CategoryCards.propTypes = {
  firebaseKey: PropTypes.string.isRequired,
  setCategories: PropTypes.func,
  user: PropTypes.any,
  categoryName: PropTypes.string.isRequired,
  categoryImage: PropTypes.string.isRequired,
  categoryDescription: PropTypes.string.isRequired,
  friendsOnly: PropTypes.bool,
  uid: PropTypes.string.isRequired
};

export default CategoryCards;

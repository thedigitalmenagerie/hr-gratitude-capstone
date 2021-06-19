import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Card,
  CardImg,
  CardTitle,
  CardText,
} from 'reactstrap';
import PropTypes from 'prop-types';
import greenView from '../../Assets/greenView.png';
import './CStyles/SpecificFriendCategoryCardComponent.scss';

const SpecificFriendCategoryCards = ({
  firebaseKey,
  categoryName,
  categoryImage,
  categoryDescription,
  uid,
  friendsOnly,
  user,
  categoryKey,
}) => {
  const history = useHistory();

  const handleClick = (type) => {
    switch (type) {
      case 'view':
        // history.push(`/myCategories/${firebaseKey}`);
        history.push(`/friendView/${firebaseKey}/Categories/${uid}/CategoryItems/${categoryKey}`);
        break;
      default:
        console.warn('Nothing selected');
    }
  };

  return (
    <div className="categoryContainer">
            { uid !== user?.uid
              ? <Card className= "categoryCard" key={firebaseKey} id={uid} flipDirection="horizontal">
                  <CardImg className="categoryImg" src={categoryImage} alt="Honey-Rae Swan"/>
                  <CardTitle tag="h5" className="categoryName">{categoryName}</CardTitle>
                  <CardText id="area">{categoryDescription}</CardText>
                  <CardText id="area">{friendsOnly}</CardText>
                  <div className="buttonContainer">
                    <button id="viewCategoryItems" onClick={() => handleClick('view')}><img className="greenView" src={greenView}/></button>
                  </div>
                </Card>
              : <div></div>
            }
            </div>
  );
};

SpecificFriendCategoryCards.propTypes = {
  firebaseKey: PropTypes.string.isRequired,
  setCategories: PropTypes.func,
  user: PropTypes.any,
  categoryName: PropTypes.string.isRequired,
  categoryImage: PropTypes.string.isRequired,
  categoryDescription: PropTypes.string.isRequired,
  friendsOnly: PropTypes.bool,
  uid: PropTypes.string.isRequired,
  categoryKey: PropTypes.string
};

export default SpecificFriendCategoryCards;

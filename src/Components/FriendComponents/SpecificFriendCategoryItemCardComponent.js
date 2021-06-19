// import React from 'react';
// import {
//   Card,
//   CardImg,
//   CardTitle,
//   CardText,
// } from 'reactstrap';
// import PropTypes from 'prop-types';
// import greenPrice from '../../Assets/greenPrice.png';

// const SpecificFriendItemCards = ({
//   firebaseKey,
//   itemName,
//   itemImage,
//   itemDescription,
//   price,
//   used,
//   where,
//   uid,
//   user,
//   categoryKey
// }) => {
//   const handleClick = (type) => {
//     switch (type) {
//       case 'purchase':
//         // history.push(`/myCategories/${firebaseKey}`);
//         break;
//       default:
//         console.warn('Nothing selected');
//     }
//   };

//   return (
//     <div className="itemsContainer">
//             { uid !== user?.uid
//               ? <Card className= "itemCard" key={firebaseKey} id={categoryKey} flipDirection="horizontal">
//               <div className="front" key="front">
//               <CardImg className="itemImg" src={itemImage} alt="Honey-Rae Swan" />
//               </div>
//               <div className="back" key="back">
//               <CardTitle tag="h5" className="name">{itemName}</CardTitle>
//                   <CardText id="area">{itemDescription}</CardText>
//                   { used === true
//                     ? <div>Can be used</div>
//                     : <div>New Only</div>
//                   }
//                   <CardText id="area">{used}</CardText>
//                   <button id="purchaseItem" onClick={() => handleClick('purchase')}><a href={where} target="_blank" rel="noopener noreferrer"><img className="greenPrice" src={greenPrice} /></a>{price}</button>
//               </div>
//           </Card>
//               : console.warn('Nothing')
//             }
//             </div>
//   );
// };

// SpecificFriendItemCards.propTypes = {
//   firebaseKey: PropTypes.string.isRequired,
//   user: PropTypes.any,
//   itemName: PropTypes.string.isRequired,
//   itemImage: PropTypes.string.isRequired,
//   itemDescription: PropTypes.string.isRequired,
//   price: PropTypes.string,
//   used: PropTypes.bool,
//   where: PropTypes.string,
//   uid: PropTypes.string.isRequired,
//   categoryKey: PropTypes.string,
// };

// export default SpecificFriendItemCards;

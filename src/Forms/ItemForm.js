import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Input } from 'reactstrap';
import { updateItem, addItem } from '../helpers/data/ItemData';
import './FStyles/ItemForm.scss';

const ItemForm = ({
  itemFormTitle,
  firebaseKey,
  itemName,
  itemImage,
  itemDescription,
  price,
  where,
  used,
  purchased,
  uid,
  user,
  categoryKey,
  friendsOnly,
  categories,
  setItems,
}) => {
  const [item, setItem] = useState({
    itemName: itemName || '',
    itemImage: itemImage || '',
    itemDescription: itemDescription || '',
    price: price || '',
    where: where || '',
    used: used || false,
    purchased: purchased || false,
    firebaseKey: firebaseKey || null,
    uid: uid || user.uid,
    categoryKey: categoryKey || '',
    friendsOnly: friendsOnly || false,
  });

  const handleInputChange = (e) => {
    setItem((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCheckboxChange = (e) => {
    setItem((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.name === 'used' || e.target.name === 'friendsOnly' ? e.target.checked : e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (item.firebaseKey) {
      updateItem(item, uid).then((itemArray) => setItems(itemArray));
    } else {
      addItem(item, user.uid).then((itemArray) => setItems(itemArray));

      setItem({
        itemName: '',
        itemImage: '',
        itemDescription: '',
        price: '',
        where: '',
        used: false,
        purchased: false,
        firebaseKey: null,
        uid: '',
        categoryKey: '',
        friendsOnly: false,
      });
    }
  };

  return (
    <form
      id="addItemForm"
      autoComplete='off'
      onSubmit={handleSubmit}
    >
      <h3 id="itemFormTitle">{itemFormTitle}</h3>
      <label className="itemNameLabel">Name:</label>
      <input
        className="item"
        name='itemName'
        type='text'
        placeholder='Item Name'
        value={item.itemName}
        onChange={handleInputChange}
      >
      </input>
      <label>Description: </label>
      <input
        className="item"
        name='itemDescription'
        type='text'
        placeholder='Item Description'
        value={item.itemDescription}
        onChange={handleInputChange}
      >
      </input>
      <label>Image: </label>
      <input
        className="item"
        name='itemImage'
        type='text'
        placeholder='Item Image URL'
        value={item.itemImage}
        onChange={handleInputChange}
      >
      </input>
      <labe>Category:</labe>
      <Input
          className="item"
          type="select"
          name="categoryKey"
          placeholder="Category"
          id="exampleSelect"
          onChange={handleInputChange}
        >
          {categories?.map((category) => (
            <option key={category.firebaseKey} value={category.firebaseKey}>
              {category.categoryName}
            </option>
          ))}
        </Input>
      <label>Price:</label>
      <input
              className="item"
        name='price'
        type='text'
        placeholder='Price'
        value={item.price}
        onChange={handleInputChange}
      >
      </input>
      <label>Purchase Here (or where the steal is!):</label>
      <input
        className="item"
        name='where'
        type='text'
        placeholder='Purchase URL'
        value={item.where}
        onChange={handleInputChange}
      >
      </input>
      <FormGroup check id="form-check">
        <label check>Used:</label>
        <input
          name='used'
          type='checkbox'
          checked={item.used}
          value={item.used}
          onChange={handleCheckboxChange}
        >
        </input>
      </FormGroup>
      <FormGroup check id="form-check">
        <label check>Visible To Friends Only:</label>
        <input
          name='friendsOnly'
          type='checkbox'
          checked={item.friendsOnly}
          value={item.friendsOnly}
          onChange={handleCheckboxChange} >
        </input>
      </FormGroup>

      <button className="addItem" type="submit">Add Item</button>
    </form>

  );
};

ItemForm.propTypes = {
  itemFormTitle: PropTypes.string.isRequired,
  setItems: PropTypes.func,
  firebaseKey: PropTypes.string,
  itemName: PropTypes.string,
  itemImage: PropTypes.string,
  itemDescription: PropTypes.string,
  price: PropTypes.string,
  where: PropTypes.string,
  used: PropTypes.bool,
  purchased: PropTypes.bool,
  uid: PropTypes.string,
  categoryKey: PropTypes.string,
  friendsOnly: PropTypes.bool,
  user: PropTypes.any,
  categories: PropTypes.array,
  categoryName: PropTypes.any,
  categoryImage: PropTypes.any,
  categoryDescription: PropTypes.any,
};

export default ItemForm;

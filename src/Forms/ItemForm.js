import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Input } from 'reactstrap';
import { updateItem, addItem } from '../Helpers/Data/ItemData';

const ItemForm = ({
  itemFormTitle,
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
  user,
  categoryKey,
  friendsOnly,
  categories,
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
    friendsOnly: friendsOnly || true,
  });

  const handleInputChange = (e) => {
    setItem((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (item.firebaseKey) {
      updateItem(item).then((itemArray) => setItems(itemArray));
      history.push('myItems');
    } else {
      addItem(item).then((itemArray) => setItems(itemArray));
      history.push('myItems');

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
        friendsOnly: true,
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
      <label>Name:</label>
      <input
        name='itemName'
        type='text'
        placeholder='Item Name'
        value={item.itemName}
        onChange={handleInputChange}
      >
      </input>
      <label>Description: </label>
      <input
        name='itemDescription'
        type='text'
        placeholder='Item Description'
        value={item.itemDescription}
        onChange={handleInputChange}
      >
      </input>
      <label>Image: </label>
      <input
        name='itemImage'
        type='text'
        placeholder='Item Image URL'
        value={item.itemImage}
        onChange={handleInputChange}
      >
      </input>
      <Input
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
        name='price'
        type='text'
        placeholder='Price'
        value={item.price}
        onChange={handleInputChange}
      >
      </input>
      <label>Purchase Here (or where the steal is!):</label>
      <input
        name='where'
        type='text'
        placeholder='Purchase URL'
        value={item.where}
        onChange={handleInputChange}
      >
      </input>
      <label>Used:</label>
        <input
          name='used'
          type='checkbox'
          checked={item.used}
          onChange={handleInputChange}
        >
        </input>
      <label>Purchased:</label>
        <input
          name='purchased'
          type='checkbox'
          checked={item.purchased}
          onChange={handleInputChange} >
        </input>
      <button type="submit">Add Item</button>
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

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import StackGrid from 'react-stack-grid';
import ItemCard from '../../Components/PersonalComponents/ItemCardComponent';
import { showCategoryItems } from '../../helpers/data/CategoryItemData';
import { getCategory } from '../../helpers/data/CategoryData';
import './VStyles/SingleCategoryView.scss';

export default function SingleCategoryView({
  user,
}) {
  const [categoryItems, setCategoryItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const { categoryKey } = useParams();
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState('');

  useEffect(() => {
    showCategoryItems(categoryKey).then((response) => setCategoryItems(response.items));
    getCategory(user).then((response) => setCategories(response));
  }, []);

  useEffect(() => {
    setFilteredData(
      categoryItems.filter((categoryItem) => categoryItem.itemName.toLowerCase().includes(search.toLowerCase()))
    );
  }, [search, categoryItems]);

  return (
    <div className="categoryItemView">
                { filteredData.length === 0
                  ? <div className="d-flex flex-column justify-content-center">
                  <h5 className="text-center my-3">No items found with that name!</h5>
                </div>
                  : <div>
                  <div className="d-flex flex-column justify-content-center">
                    <h1 className="text-center my-3">All Items</h1>
                    <div className="form-group mb-4 d-flex justify-content-center">
                      <input type="search" id="search" placeholder="Search by item name..." aria-describedby="button-addon" className="form-control" onChange={(e) => setSearch(e.target.value)}/>
                    </div>
                    <StackGrid>
        {filteredData.map((item) => (
          <ItemCard
            key={item.firebaseKey}
            items={categoryItems}
            categoryKey={categoryKey}
            categories={categories}
            setCategories={setCategories}
            user={user}
            {...item}
          />
        ))}</StackGrid>
                </div>
              </div>
          }
      </div>
  );
}

SingleCategoryView.propTypes = {
  user: PropTypes.any,
};

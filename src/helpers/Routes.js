import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import HomeView from '../Views/HomeView';
import UsersView from '../Views/PersonalViews/UsersView';
import CategoryView from '../Views/PersonalViews/CategoryView';
import ItemView from '../Views/PersonalViews/ItemView';
import EventView from '../Views/PersonalViews/EventView';
import SingleCategoryView from '../Views/PersonalViews/SingleCategoryView';
import FriendView from '../Views/PersonalViews/FriendView';
import SingleFriendView from '../Views/FriendViews/SpecificFriendView';

const PrivateRoute = ({
  component: Component,
  user,
  ...rest
}) => {
  const routeChecker = (taco) => (user
    ? (<Component {...taco} user={user}/>)
    : (<Redirect to={{ pathname: '/', state: { from: taco.location } }} />));
  return <Route {...rest} render={(props) => (routeChecker(props))} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
  user: PropTypes.any,
  setUser: PropTypes.func,
};

export default function Routes({
  user,
  setUser,
  categories,
  setCategories,
  items,
  setItems,
}) {
  return (
    <div>
      <Switch>
        <Route exact path='/'
        component={() => <HomeView
        user={user}
        setUser={setUser}
        />}
        user={user}
        setUser={setUser}
        />
        <Route exact path='/myEvents'
        component={() => <EventView
        user={user}
        setUser={setUser}
        />}
        user={user}
        setUser={setUser}
        />
        <Route exact path='/myCategories'
        component={() => <CategoryView
        user={user}
        setUser={setUser}
        categories={categories}
        setCategories={setCategories}
        />}
        user={user}
        setUser={setUser}
        />
        <Route exact path='/myItems'
        component={() => <ItemView
        user={user}
        setUser={setUser}
        categories={categories}
        setCategories={setCategories}
        items={items}
        setItems={setItems}
        />}
        user={user}
        setUser={setUser}
        />
        <Route
          path='/myCategories/:categoryKey'
          user={user}
          component={() => <SingleCategoryView user={user} setUser={setUser}/>}
        />
        <Route exact path='/friendView'
        component={() => <FriendView
        user={user}
        setUser={setUser}
        />}
        user={user}
        setUser={setUser}
        />
        <Route
          path='/friendView/:firebaseKey'
          user={user}
          component={() => <SingleFriendView user={user} setUser={setUser}/>}
        />
        <Route exact path='/userView'
        component={() => <UsersView
        user={user}
        setUser={setUser}
        />}
        user={user}
        setUser={setUser}
        />
      </Switch>
    </div>
  );
}

Routes.propTypes = {
  user: PropTypes.any,
  setUser: PropTypes.func,
  categories: PropTypes.array,
  setCategories: PropTypes.func,
  items: PropTypes.array,
  setItems: PropTypes.func,
};

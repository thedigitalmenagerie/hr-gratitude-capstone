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
import SpecificFriendCategoryView from '../Views/FriendViews/SpecificFriendCategoryView';
import SingleFriendCategoryItemView from '../Views/FriendViews/SpecificFriendSingleCategoryView';
import SpecificFriendItemView from '../Views/FriendViews/SpecificFriendItemView';
import SpecificFriendEventView from '../Views/FriendViews/SpecificFriendEventView';

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
        />}
        user={user}
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
        />}
        user={user}
        setUser={setUser}
        />
        <Route
          exact path='/myCategories/:categoryKey'
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
          exact path='/friendView/:firebaseKey'
          user={user}
          component={() => <SingleFriendView user={user} setUser={setUser}/>}
        />
        <Route
          exact path='/friendView/:firebaseKey/Categories/:uid/'
          user={user}
          component={() => <SpecificFriendCategoryView user={user} setUser={setUser} categories={categories} setCategories={setCategories}/>}
        />
        <Route
          exact path='/friendView/:firebaseKey/Categories/:uid/CategoryItems/:categoryKey/'
          user={user}
          component={() => <SingleFriendCategoryItemView user={user} setUser={setUser}/>}
        />
        <Route
          exact path='/friendView/:firebaseKey/Items/:uid/'
          user={user}
          component={() => <SpecificFriendItemView user={user} setUser={setUser}/>}
        />
        <Route
          exact path='/friendView/:firebaseKey/Events/:uid/'
          user={user}
          component={() => <SpecificFriendEventView user={user} setUser={setUser}/>}
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
  events: PropTypes.array,
  setEvents: PropTypes.func,
};

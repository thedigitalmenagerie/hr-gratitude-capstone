import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import HomeView from '../Views/HomeView';
import UsersView from '../Views/UsersView';

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
        />
        <Route exact path='/userView'
        component={() => <UsersView
        user={user}
        setUser={setUser}
        />}
        user={user}
        />
      </Switch>
    </div>
  );
}

Routes.propTypes = {
  user: PropTypes.any,
  setUser: PropTypes.func,
};

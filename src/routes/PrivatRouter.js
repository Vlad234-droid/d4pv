import React from 'react';
import { Route, Redirect } from 'react-router-dom';
//import { useDispatch, useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isloggedIn = false;

  const CurrentComponent = isloggedIn ? <Component /> : <Redirect to="/sign-in/" />;

  return <Route {...rest} render={(props) => CurrentComponent} />;
};

export default PrivateRoute;

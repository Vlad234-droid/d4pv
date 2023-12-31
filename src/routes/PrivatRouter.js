import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
//import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../core/profile/profileSlice';
import LoaderPage from '../pages/LoaderPage';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const { getProfile } = bindActionCreators(actions, dispatch);

  useEffect(() => {
    if (!user.data) {
      getProfile().then((data) => {
        console.log('getProfile', data);
      });
    }
  }, []);

  console.log('userrrrr', user);

  // const CurrentComponent = !user.isloggedIn ? <Component /> : <Redirect to="/sign-in/" />;
  // const CurrentComponent =
  //   user.isloggedIn === null ? <LoaderPage /> : user.isloggedIn ? <Component /> : <Redirect to="/sign-in/" />;
  const CurrentComponent =
    user.isloggedIn === null ? (
      <LoaderPage />
    ) : !user.isloggedIn ? (
      <Redirect to="/sign-in/" />
    ) : !user.data ? (
      <LoaderPage />
    ) : (
      <Component />
    );

  return <Route {...rest} render={(props) => CurrentComponent} />;
};

export default PrivateRoute;

import React from 'react';
import { Route } from 'react-router-dom';
import CoreRouter from './CoreRouter';
import PrivateRoute from './PrivatRouter';
import ForgotPassword from '../pages/ForgotPassword';
import SignUp from '../pages/SignUp';

const LoginPage = lazyWithPreload(() => import('../pages/Login'));

const routes = () => {
  return (
    <React.Suspense fallback="">
      <CoreRouter>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/sign-in/" component={LoginPage} />
        <Route exact path="/forgotPassword/" component={ForgotPassword} />
        <Route exact path="/sign-up/" component={SignUp} />
        {/* <PrivateRoute exact path='/replies/' component={Login} /> */}
      </CoreRouter>
    </React.Suspense>
  );
};

//TODO Lazy
function lazyWithPreload(factory) {
  const Component = React.lazy(factory);
  Component.preload = factory;
  return Component;
}

export default routes;

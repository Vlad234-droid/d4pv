import React from 'react';
import { Route } from 'react-router-dom';
import CoreRouter from './CoreRouter';
import PrivateRoute from './PrivatRouter';
import ForgotPassword from '../pages/ForgotPassword';
import SignUp from '../pages/SignUp';
// import Counter from '../features/counter/Counter';
import SignUpToProject from '../pages/SignUpToProject';
import Profile from '../pages/Profile';
import EmailVerified from '../pages/EmailVerified';
import ResetPassword from '../pages/ResetPassword';

import AdminUsersConfigurations from '../pages/AdminUsersConfigurations';
import AdminCompaniesConfigurations from '../pages/AdminCompaniesConfigurations';
import AdminCompanyInfoConf from '../pages/AdminCompanyInfoConf';
import AdminAddCompanyConfigurations from '../pages/AdminAddCompanyConfigurations';

const LoginPage = lazyWithPreload(() => import('../pages/Login'));

const routes = () => {
  return (
    <React.Suspense fallback="">
      <CoreRouter>
        <PrivateRoute exact path="/" component={Profile} />
        <Route exact path="/sign-up/" component={SignUp} />
        <Route exact path="/sign-in/" component={LoginPage} />
        <Route exact path="/forgot-password/" component={ForgotPassword} />
        <Route exact path="/accounts/invite/:id" component={SignUpToProject} />
        <Route exact path="/email-verified/:id" component={EmailVerified} />
        <Route exact path="/reset-password/:id" component={ResetPassword} />
        {/* <Route exact path="/test" component={Counter} /> */}
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/admin-users-conf" component={AdminUsersConfigurations} />
        <PrivateRoute exact path="/admin-companies-conf/" component={AdminCompaniesConfigurations} />
        <PrivateRoute exact path="/admin-add-company-conf" component={AdminAddCompanyConfigurations} />
        <PrivateRoute exact path="/admin-company-info-conf/:id" component={AdminCompanyInfoConf} />

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

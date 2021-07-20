import React from 'react';
import { Route } from 'react-router-dom';
import CoreRouter from './CoreRouter';
import PrivateRoute from './PrivatRouter';
import ForgotPassword from '../pages/ForgotPassword';
import SignUp from '../pages/SignUp';
// import Counter from '../features/counter/Counter';
import UserProfile from '../pages/UserProfile';
import SignUpToProject from '../pages/SignUpToProject';
import AdminProfile from '../pages/AdminProfile';

import AdminUsersConfigurations from '../pages/AdminUsersConfigurations';
import AdminCompaniesConfigurations from '../pages/AdminCompaniesConfigurations';
import AdminCompanyInfoConf from '../pages/AdminCompanyInfoConf';
import AdminAddCompanyConfigurations from '../pages/AdminAddCompanyConfigurations';

const LoginPage = lazyWithPreload(() => import('../pages/Login'));

const routes = () => {
  return (
    <React.Suspense fallback="">
      <CoreRouter>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/sign-up/" component={SignUp} />
        <Route exact path="/sign-in/" component={LoginPage} />
        <Route exact path="/forgot-assword/" component={ForgotPassword} />
        <Route exact path="/accounts/invite/:id" component={SignUpToProject} />
        {/* <Route exact path="/test" component={Counter} /> */}
        <Route exact path="/profile" component={UserProfile} />
        <Route exact path="/admin-profile" component={AdminProfile} />
        <Route exact path="/admin-users-conf" component={AdminUsersConfigurations} />
        <Route exact path="/admin-companies-conf" component={AdminCompaniesConfigurations} />
        <Route exact path="/admin-add-company-conf" component={AdminAddCompanyConfigurations} />
        <Route exact path="/admin-company-info-conf/:id" component={AdminCompanyInfoConf} />

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

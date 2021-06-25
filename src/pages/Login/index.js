import React, { useState, useEffect } from 'react';

import Layout from '../../components/LayoutGuest/Layout';

import './style.scss';

const LoginPage = (props) => {
  return (
    <Layout isLogged={false} mode="login" className="login-page">
      <h1>Hello login</h1>
    </Layout>
  );
};

export default LoginPage;

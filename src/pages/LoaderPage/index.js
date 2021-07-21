import React from 'react';
import Layout from '../../components/LayoutGuest/Layout';

import style from './style.module.scss';

const LoaderPage = () => {
  return (
    <Layout isLogged={false} mode="login" className="login-page">
      <div className={style.wrapper}>
        <h1>Loading...</h1>
      </div>
    </Layout>
  );
};

export default LoaderPage;

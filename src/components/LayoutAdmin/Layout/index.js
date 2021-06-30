import React from 'react';
import Header from '../Header';
import { Layout } from 'antd';

const LayoutAdmin = ({ children, className }) => {
  return (
    <div className={`app-dashboard ${className}`}>
      <Header />
      <Layout.Content className="main-content">
        <div className="dashboard-wrapper">{children}</div>
      </Layout.Content>
    </div>
  );
};

export default LayoutAdmin;

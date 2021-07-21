import React from 'react';
import Header from '../../Header';
import { Layout } from 'antd';
import './style.scss';
import { useSelector } from 'react-redux';

const LayoutBoth = ({ children, className }) => {
  const data = useSelector((state) => state?.profile?.data);

  return (
    <div className={`app-dashboard ${className}`}>
      <Header data={data} />
      <Layout.Content className="main-content">
        <div className="dashboard-wrapper">{children}</div>
      </Layout.Content>
    </div>
  );
};

export default LayoutBoth;

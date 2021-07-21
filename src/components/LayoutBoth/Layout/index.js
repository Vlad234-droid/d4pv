import React from 'react';
import HeaderOwner from '../HeaderOwner';
import HeaderUser from '../HeaderUser';
import { Layout } from 'antd';
import './style.scss';
import { useSelector } from 'react-redux';

const LayoutBoth = ({ children, className }) => {
  const data = useSelector((state) => state?.profile?.data);

  return (
    <div className={`app-dashboard ${className}`}>
      {data && data.role.split('.')[1] === 'OWNER' ? <HeaderOwner /> : <HeaderUser />}
      <Layout.Content className="main-content">
        <div className="dashboard-wrapper">{children}</div>
      </Layout.Content>
    </div>
  );
};

export default LayoutBoth;

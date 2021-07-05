import React, { useState, useCallback } from 'react';
import LayoutAdmin from '../../components/LayoutAdmin/Layout';
import { BackLeftSVG } from '../../components/icons';
import './style.scss';
import { Tabs } from 'antd';
import { TapPaneConfig } from './config';
import UsersTable from '../../components/PageConfigurations/UsersTable';
import CompaniesTable from '../../components/PageConfigurations/CompaniesTable';

const { TabPane } = Tabs;

const AdminConfigurations = () => {
  const [currentTub, setCurrentTub] = useState('1');
  function callback(key) {
    setCurrentTub(() => key);
  }

  const renderItemsTabs = useCallback(
    (currentTub) => {
      switch (currentTub) {
        case '1':
          return <UsersTable />;

        case '2':
          return <CompaniesTable />;

        default:
          return currentTub;
      }
    },
    [currentTub],
  );

  return (
    <LayoutAdmin className="admin_configurations">
      <div className="wrapper">
        <div className="container_info">
          <div className="back">
            <div className="SVG_back" onClick={() => {}}>
              <BackLeftSVG />
            </div>
            <p>back</p>
          </div>
          <h2 className="configurations">Configurations</h2>
          <div className="containers_tabs_info_block">
            <div className="tabs_block">
              <Tabs defaultActiveKey={currentTub} onChange={callback} tabPosition="left" className="navigation_tabs">
                {TapPaneConfig.map((item) => (
                  <TabPane
                    key={item.key}
                    tab={
                      <span className="inner_tab">
                        <div>{item.picture}</div>
                        <p>{item.text}</p>
                      </span>
                    }
                    key={item.key}
                  />
                ))}
              </Tabs>
            </div>
            <div className="info_from_tab">{renderItemsTabs(currentTub)}</div>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default AdminConfigurations;

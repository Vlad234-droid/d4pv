import React, { useState, useEffect } from 'react';
import Header from '../../Header';
import { BackLeftSVG } from '../../icons';
import { Tabs } from 'antd';
import { TapPaneConfig } from './config';
import { Layout } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import './style.scss';

const { TabPane } = Tabs;

const LayoutConfiguration = ({ children, className }) => {
  const history = useHistory();
  const location = useLocation();
  const [currentTub, setCurrentTub] = useState('1');

  useEffect(() => {
    if (location.pathname.includes('user')) setCurrentTub(() => '1');
    if (location.pathname.includes('compan')) setCurrentTub(() => '2');
  }, [location.pathname]);

  function callback(key) {
    switch (key) {
      case '1':
        return history.push('/admin-users-conf');

      case '2':
        return history.push('/admin-companies-conf');

      default:
        return key;
    }
  }

  return (
    <div className={`app-dashboard admin_configurations ${className}`}>
      <Header />
      <Layout.Content className="main-content">
        <div className="dashboard-wrapper">
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
                  <Tabs activeKey={currentTub} onChange={callback} tabPosition="left" className="navigation_tabs">
                    {TapPaneConfig.map((item) => (
                      <TabPane
                        key={item.key}
                        tab={
                          <span className="inner_tab">
                            <div>{item.picture}</div>
                            <p>{item.text}</p>
                          </span>
                        }
                      />
                    ))}
                  </Tabs>
                </div>
                {/* <div className="info_from_tab">{renderItemsTabs(currentTub)}</div> */}
                <div className="info_from_tab">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </Layout.Content>
    </div>
  );
};

export default LayoutConfiguration;

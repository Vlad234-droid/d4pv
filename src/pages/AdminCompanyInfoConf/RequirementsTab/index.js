import React, { useState, useCallback } from 'react';
import { Tabs } from 'antd';
import './style.scss';
import MapRequirements from './MapRequirements';

import { config } from './config';
const { TabPane } = Tabs;

const RequirementsTab = () => {
  const [keyTab, setKeyTab] = useState('PropertyInformation');
  const callback = (key) => setKeyTab(() => key);

  const defineText = useCallback(() => {
    let text = '';
    config.forEach((item) => {
      if (item.key === keyTab) {
        text = item.tab;
      }
    });
    return text;
  }, [keyTab]);

  return (
    <div className="inner_requirements_tab_container">
      <div className="requirements_tab_block">
        <Tabs
          tabPosition="left"
          className="requirements_tab"
          onChange={callback}
          defaultActiveKey="PropertyInformation">
          {config.map((item) => (
            <TabPane tab={item.tab} key={item.key} />
          ))}
        </Tabs>
      </div>
      <div className="tabs_content">
        <MapRequirements keyTab={keyTab} text={defineText()} />
      </div>
    </div>
  );
};

export default RequirementsTab;

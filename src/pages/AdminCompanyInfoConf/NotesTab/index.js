import React, { useState } from 'react';
import { Tabs } from 'antd';
import './style.scss';
import SitePlanTab from './SitePlanTab';
import SolarAttachmentPlan from './SolarAttachmentPlan';
import { config } from './config';
const { TabPane } = Tabs;

const NotesTab = () => {
  const [keyTab, setKeyTab] = useState('1');
  const callback = (key) => setKeyTab(() => key);

  const checkForRenderTabs = () => {
    switch (keyTab) {
      case '1':
        return <SitePlanTab />;
      case '2':
        return <SolarAttachmentPlan />;
    }
  };
  return (
    <div className="inner_notes_tab_container">
      <div className="notes_tab_block">
        <Tabs tabPosition="left" className="notes_tab" onChange={callback} defaultActiveKey="1">
          {config.map((item) => (
            <TabPane tab={item.tab} key={item.key} />
          ))}
        </Tabs>
      </div>
      <div className="tabs_content">{checkForRenderTabs()}</div>
    </div>
  );
};

export default NotesTab;

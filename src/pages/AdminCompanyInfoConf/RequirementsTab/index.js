import React, { useState } from 'react';
import { Tabs } from 'antd';
import './style.scss';
import SitePlanTab from './SitePlanTab';
import SolarAttachmentPlan from './SolarAttachmentPlan';
import LineDiagramTab from './LineDiagramTab';
import AssemblyDetailsTab from './AssemblyDetailsTab';
import { config } from './config';
const { TabPane } = Tabs;

const RequirementsTab = () => {
  const [keyTab, setKeyTab] = useState('1');
  const callback = (key) => setKeyTab(() => key);

  const checkForRenderTabs = () => {
    switch (keyTab) {
      case '1':
        return <SitePlanTab />;
      case '2':
        return <SolarAttachmentPlan />;
      case '3':
        return <LineDiagramTab />;
      case '4':
        return <AssemblyDetailsTab />;
    }
  };
  return (
    <div className="inner_requirements_tab_container">
      <div className="requirements_tab_block">
        <Tabs tabPosition="left" className="requirements_tab" onChange={callback} defaultActiveKey="1">
          {config.map((item) => (
            <TabPane tab={item.tab} key={item.key} />
          ))}
        </Tabs>
      </div>
      <div className="tabs_content">{checkForRenderTabs()}</div>
    </div>
  );
};

export default RequirementsTab;

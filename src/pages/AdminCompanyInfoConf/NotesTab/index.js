import React, { useState, useCallback } from 'react';
import { Tabs } from 'antd';
import './style.scss';
import config from './config';
import MapNotes from './MapNotes';
const { TabPane } = Tabs;

const NotesTab = () => {
  const [keyTab, setKeyTab] = useState('SitePlan');
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
    <div className="inner_notes_tab_container">
      <div className="notes_tab_block">
        <Tabs tabPosition="left" className="notes_tab" onChange={callback} defaultActiveKey="SitePlan">
          {config.map((item) => (
            <TabPane tab={item.tab} key={item.key} />
          ))}
        </Tabs>
      </div>
      <div className="tabs_content">
        <MapNotes keyTab={keyTab} text={defineText()} />
      </div>
    </div>
  );
};

export default NotesTab;

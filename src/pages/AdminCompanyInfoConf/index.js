import React, { useState } from 'react';
import { ArrowLeftBigSVG, EditCompanySVG } from '../../components/icons';
import './style.scss';
import LayoutConfiguration from '../../components/LayoutConfiguration/Layout';
import { Link } from 'react-router-dom';
import { Tabs } from 'antd';
import GeneralInformationTab from './GeneralInformationTab';
import PreferencesTab from './PreferencesTab';
import NotesTab from './NotesTab';
import RequirementsTab from './RequirementsTab';

const { TabPane } = Tabs;

const AdminCompanyInfoConf = () => {
  const [editMode, setEditMode] = useState(false);
  const [activeTabsKey, setActiveTabsKey] = useState('1');
  const [testArray, setTestArray] = useState({});
  const callback = (key) => setActiveTabsKey(() => key);

  const config = [
    {
      tab: 'General Information',
      key: '1',
      clasname: 'general_info tab',
      component: (
        <GeneralInformationTab
          setTestArray={setTestArray}
          editMode={editMode}
          testArray={testArray}
          setEditMode={setEditMode}
        />
      ),
    },
    {
      tab: 'Notes',
      key: '2',
      clasname: 'notes tab',
      component: <NotesTab />,
    },
    {
      tab: 'Requirements',
      key: '3',
      clasname: 'requirements tab',
      component: <RequirementsTab />,
    },
    {
      tab: 'Preferences',
      key: '4',
      clasname: 'preferences tab',
      component: <PreferencesTab />,
    },
  ];

  return (
    <LayoutConfiguration>
      <div className="container_edit__company">
        {!editMode && activeTabsKey === '1' && (
          <div className="switch_mode" onClick={() => setEditMode(() => true)}>
            <div>
              <EditCompanySVG />
            </div>
          </div>
        )}

        <div className="head_block">
          <Link to="/admin-companies-conf">
            <div className="arrow_left">
              <ArrowLeftBigSVG />
            </div>
          </Link>

          <div>
            <h2>{!editMode ? testArray.compname : 'Edit Contractor Company'}</h2>
          </div>
        </div>
        {!editMode && (
          <div className="tabs_companies">
            <Tabs activetabskey={activeTabsKey} onChange={callback} defaultActiveKey={activeTabsKey}>
              {config.map((item) => (
                <TabPane tab={item.tab} key={item.key} className={item.clasname}>
                  {item.component}
                </TabPane>
              ))}
            </Tabs>
          </div>
        )}
      </div>
      {editMode && (
        <GeneralInformationTab
          setTestArray={setTestArray}
          editMode={editMode}
          testArray={testArray}
          setEditMode={setEditMode}
        />
      )}
    </LayoutConfiguration>
  );
};

export default AdminCompanyInfoConf;

import React, { useState, useMemo } from 'react';
import { ArrowLeftBigSVG, EditCompanySVG } from '../../components/icons';
import './style.scss';
import LayoutConfiguration from '../../components/LayoutConfiguration/Layout';
import { Link } from 'react-router-dom';
import { Tabs } from 'antd';
import GeneralInformation from './GeneralInformation';
import PreferencesTab from './PreferencesTab';

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
        <GeneralInformation
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
      component: <div>Notes</div>,
    },
    {
      tab: 'Requirements',
      key: '3',
      clasname: 'requirements tab',
      component: <div>Requirements</div>,
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
      <div className="container_add__company">
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
            <Tabs activetabskey="1" onChange={callback}>
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
        <GeneralInformation
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

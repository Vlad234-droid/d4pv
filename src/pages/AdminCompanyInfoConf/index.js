import React, { useState, useEffect } from 'react';
import { ArrowLeftBigSVG, EditCompanySVG } from '../../components/icons';
import './style.scss';
import LayoutConfiguration from '../../components/LayoutConfiguration/Layout';
import { Tabs, Skeleton } from 'antd';
import GeneralInformationTab from './GeneralInformationTab';
import PreferencesTab from './PreferencesTab';
import NotesTab from './NotesTab';
import RequirementsTab from './RequirementsTab';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../core/companies/companiesSlice';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const { TabPane } = Tabs;

const AdminCompanyInfoConf = () => {
  const [editMode, setEditMode] = useState(false);
  const [activeTabsKey, setActiveTabsKey] = useState('1');
  const callback = (key) => setActiveTabsKey(() => key);
  const dispatch = useDispatch();
  const { getCompanieData, clearCompanyData } = bindActionCreators(actions, dispatch);
  const { id } = useParams();
  // const [dataSource, setDataSource] = useState(null);
  const [tableLoading, setTableLoading] = useState(false);

  const dataSource = useSelector((state) => state.companies.companieData);

  useEffect(() => {
    clearCompanyData();
    getCompanieData(id);
    // getConfCompanies().then((data) => {
    //   const dataFiltered = data.payload.filter((item) => item.id === id);
    //   setPageInfo(dataFiltered[0]);
    //   setTableLoading(() => false);
    // });
  }, [id]);

  const config = [
    {
      tab: 'General Information',
      key: '1',
      clasname: 'general_info tab',
      component: dataSource !== null && (
        <GeneralInformationTab editMode={editMode} setEditMode={setEditMode} dataSource={dataSource} />
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
      {!dataSource ? (
        <>
          <Skeleton active />
          <Skeleton active />
        </>
      ) : (
        <>
          <div className="container_edit__company">
            {!editMode && activeTabsKey === '1' && (
              <div className="switch_mode" onClick={() => setEditMode(() => true)}>
                <div>
                  <EditCompanySVG />
                </div>
              </div>
            )}

            <div className="head_block">
              {editMode ? (
                <button
                  onClick={() => {
                    setEditMode(false);
                  }}>
                  <div className="arrow_left">
                    <ArrowLeftBigSVG />
                  </div>
                </button>
              ) : (
                <Link to="/admin-companies-conf">
                  <div className="arrow_left">
                    <ArrowLeftBigSVG />
                  </div>
                </Link>
              )}

              <div>
                <h2>{!editMode ? dataSource !== null && dataSource.name : 'Edit Contractor Company'}</h2>
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

          {dataSource !== null && editMode && (
            <GeneralInformationTab editMode={editMode} setEditMode={setEditMode} dataSource={dataSource} />
          )}
        </>
      )}
    </LayoutConfiguration>
  );
};

export default AdminCompanyInfoConf;

import React, { useState, useEffect } from 'react';
import { Table, Skeleton } from 'antd';
import { EditSVG, DeleteSVG } from '../../../components/icons';
import ModalEditUser from '../ModalEditUser';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { actions } from '../../../core/configurations/configurationsSlice';

import './style.scss';
const TableOfUsers = ({ searchValue, setShowDeleteUser }) => {
  const dispatch = useDispatch();
  const { getMembersOfOrganisation } = bindActionCreators(actions, dispatch);
  const [showEditUser, setShowEditUser] = useState(false);
  const [currRecordRow, setCurrRecordRow] = useState(null);
  const [tableLoading, setTableLoading] = useState(false);
  const [dataSource, setDataSource] = useState(null);
  const [copyOfDataSource, setCopyOfDataSource] = useState(null);

  const [columns, setColumns] = useState([
    {
      title: 'Name',
      dataIndex: 'first_name',
      key: 'first_name',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      className: 'roles',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      className: 'email',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record, index) => {
        return (
          <div className="actions_block">
            <div
              onClick={(e) => {
                //console.log('e', e.target.dataset.action);
                //console.log('record', record);
                //console.log('index', index);
                setCurrRecordRow(() => record);
                setShowEditUser(() => true);
              }}>
              <EditSVG />
            </div>
            <div
              onClick={(e) => {
                //console.log('e', e.target.dataset.action);
                //console.log('record', record);
                //console.log('index', index);
                setShowDeleteUser(() => true);
              }}>
              <DeleteSVG />
            </div>
          </div>
        );
      },
    },
  ]);

  const onChange = (prop) => {
    console.log('helo', prop);
  };
  useEffect(() => {
    setTableLoading(() => true);
    getMembersOfOrganisation().then((data) => {
      setPageInfo(data.payload);
      setTableLoading(() => false);
    });
  }, []);

  const getProperRole = (role) =>
    role.split('.')[1] === 'MEMBER' ? 'User' : role.split('.')[1] === 'OWNER' && 'Admin';

  const setPageInfo = (data) => {
    const newData = [];
    data.forEach((item) => {
      newData.push({
        key: item.id,
        first_name: (
          <div className="wrapper_name">
            <div className="wrapper_img">
              {item.image?.length ? (
                <img src={item.image} alt="Logo" />
              ) : (
                <div className="noimage sm">
                  {item.first_name[0]}
                  {item.last_name[0]}
                </div>
              )}
            </div>
            <h3 className="name">{item.first_name}</h3>
          </div>
        ),
        role: getProperRole(item.role),
        email: item.email,
      });
    });
    setDataSource(() => newData);
    setCopyOfDataSource(() => newData);
  };

  useEffect(() => {
    if (dataSource !== null) {
      if (searchValue.length > 2) {
        const newData = [];
        dataSource.forEach((item) => {
          if (item.first_name.props.children[1].props.children.toLowerCase().includes(searchValue.toLowerCase())) {
            newData.push(item);
            setDataSource(() => newData);
          }
        });
      } else if (searchValue.length === 0 && searchValue.trim() === '') {
        if (copyOfDataSource !== null) {
          setDataSource(() => copyOfDataSource);
        }
      }
    }
  }, [searchValue]);

  return (
    <>
      {dataSource === null ? (
        <>
          <Skeleton active />
          <Skeleton active />
        </>
      ) : (
        <>
          <Table
            className="table_users"
            loading={tableLoading}
            dataSource={dataSource}
            columns={columns}
            onChange={onChange}
            pagination={false}
            rowClassName={(record) => {
              return record.onCheck ? 'onCheck' : '';
            }}
          />
          {currRecordRow !== null && (
            <ModalEditUser
              setCurrRecordRow={setCurrRecordRow}
              record={currRecordRow}
              showEditUser={showEditUser}
              setShowEditUser={setShowEditUser}
            />
          )}
        </>
      )}
    </>
  );
};

export default TableOfUsers;

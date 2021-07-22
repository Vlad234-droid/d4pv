import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { EditSVG, DeleteSVG } from '../../../components/icons';
import ModalEditUser from '../ModalEditUser';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { actions } from '../../../core/configurations/configurationsSlice';

import './style.scss';
const TableOfUsers = ({ setShowDeleteUser }) => {
  const dispatch = useDispatch();
  const { getMembersOfOrganisation } = bindActionCreators(actions, dispatch);
  const [showEditUser, setShowEditUser] = useState(false);
  const [currRecordRow, setCurrRecordRow] = useState({});
  const [tableLoading, setTableLoading] = useState(false);
  // const [dataSource, setDataSource] = useState([
  //   {
  //     key: 4,
  //     name: (
  //       <div className="wrapper_name">
  //         <div className="wrapper_img">
  //           <img
  //             src="https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
  //             alt="Logo"
  //           />
  //         </div>
  //         <h3 className="name">Victor</h3>
  //       </div>
  //     ),
  //     role: 'admin',
  //     email: 'victor@gmail.com',
  //     onCheck: true,
  //   },
  // ]);
  const [dataSource, setDataSource] = useState([]);

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
                setCurrRecordRow(() => ({
                  ...record,
                }));
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
    getMembersOfOrganisation().then((data) => {
      setPageInfo(data.payload);
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
              <img
                src="https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                alt="Logo"
              />
            </div>
            <h3 className="name">{item.first_name}</h3>
          </div>
        ),
        role: getProperRole(item.role),
        email: item.email,
      });
    });
    setDataSource(() => newData);
  };

  return (
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
      <ModalEditUser record={currRecordRow} showEditUser={showEditUser} setShowEditUser={setShowEditUser} />
    </>
  );
};

export default TableOfUsers;

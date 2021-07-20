import React, { useState } from 'react';
import { Table } from 'antd';
import { EditSVG, DeleteSVG } from '../../../components/icons';
import ModalEditUser from '../ModalEditUser';

import './style.scss';
const TableOfUsers = ({ setShowDeleteUser }) => {
  const [showEditUser, setShowEditUser] = useState(false);
  const [currRecordRow, setCurrRecordRow] = useState({});
  const [tableLoading, setTableLoading] = useState(false);
  const [dataSource, setDataSource] = useState([
    {
      key: 1,
      name: (
        <div className="wrapper_name">
          <div className="wrapper_img">
            <img
              src="https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt="Logo"
            />
          </div>
          <h3 className="name">Vlad</h3>
        </div>
      ),
      role: 'admin',
      email: 'vladikvladvita2@gmail.com',
    },
    {
      key: 2,
      name: (
        <div className="wrapper_name">
          <div className="wrapper_img">
            <img
              src="https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt="Logo"
            />
          </div>
          <h3 className="name">Dima</h3>
        </div>
      ),
      role: 'super admin',
      email: 'scooterok@gmail.com',
    },
    {
      key: 3,
      name: (
        <div className="wrapper_name">
          <div className="wrapper_img">
            <img
              src="https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt="Logo"
            />
          </div>
          <h3 className="name">Rav</h3>
        </div>
      ),
      role: 'super admin',
      email: 'rav@gmail.com',
    },
    {
      key: 4,
      name: (
        <div className="wrapper_name">
          <div className="wrapper_img">
            <img
              src="https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt="Logo"
            />
          </div>
          <h3 className="name">Victor</h3>
        </div>
      ),
      role: 'admin',
      email: 'victor@gmail.com',
      conf: 'confirmitation',
      onCheck: true,
    },
  ]);

  const [columns, setColumns] = useState([
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
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

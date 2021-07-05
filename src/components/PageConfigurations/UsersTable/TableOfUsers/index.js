import React, { useState } from 'react';
import { Table } from 'antd';
import { EditSVG, DeleteSVG } from '../../../icons';

import './style.scss';
const TableOfUsers = ({ setShowDeleteUser }) => {
  const [tableLoading, setTableLoading] = useState(false);
  const [dataSource, setDataSource] = useState([
    {
      key: 1,
      name: (
        <div className="wrapper_name">
          <div className="wrapper_img">
            <img
              src="https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt="Photo"
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
              alt="Photo"
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
              alt="Photo"
            />
          </div>
          <h3 className="name">Rav</h3>
        </div>
      ),
      role: 'super admin',
      email: 'rav@gmail.com',
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
          <div
            className="actions_block"
            onChange={(e) => {
              console.log('e div', e);
            }}>
            <div
              onClick={(e) => {
                console.log('e', e.target.dataset.action);
                console.log('record', record);
                console.log('index', index);
              }}>
              <EditSVG />
            </div>
            <div
              onClick={(e) => {
                console.log('e', e.target.dataset.action);
                console.log('record', record);
                console.log('index', index);
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
    <Table
      className="table_users"
      loading={tableLoading}
      dataSource={dataSource}
      columns={columns}
      onChange={onChange}
      pagination={false}
    />
  );
};

export default TableOfUsers;

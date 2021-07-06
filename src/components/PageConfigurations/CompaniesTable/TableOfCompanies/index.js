import React, { useState } from 'react';
import { Table } from 'antd';
import { EditSVG, DeleteSVG } from '../../../icons';
import './style.scss';

const TableOfCompanies = ({ setShowDeleteCompany }) => {
  const [tableLoading, setTableLoading] = useState(false);
  const [dataSource, setDataSource] = useState([
    {
      key: 1,
      logo: (
        <div className="logo">
          <img
            src="https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            alt="logo"
          />
        </div>
      ),
      company_name: 'SunPower by Test',
      company_phone: '+46328746',
      address: 'Lviv Leniana 49 SunPower by Test SunPower by Test',
    },
    {
      key: 2,
      logo: (
        <div className="logo">
          <img
            src="https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            alt="logo"
          />
        </div>
      ),
      company_name: 'SunPower by Kamtech Solar',
      company_phone: '+243123412',
      address: 'Kyiv lomonosova 678',
    },
    {
      key: 3,
      logo: (
        <div className="logo">
          <img
            src="https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            alt="logo"
          />
        </div>
      ),
      company_name: 'Sun Royale shine ',
      company_phone: '+467839',
      address: 'The center of City',
    },
  ]);

  const [columns, setColumns] = useState([
    {
      title: 'Logo',
      dataIndex: 'logo',
      key: 'logo',
    },
    {
      title: 'Company Name',
      dataIndex: 'company_name',
      key: 'company_name',
      className: 'company_name',
    },
    {
      title: 'Company Phone',
      dataIndex: 'company_phone',
      key: 'company_phone',
      className: 'company_phone',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      className: 'address',
    },
    {
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
                setShowDeleteCompany(() => true);
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
      className="table_companies"
      loading={tableLoading}
      dataSource={dataSource}
      columns={columns}
      onChange={onChange}
      pagination={false}
      ellipsis={true}
      expandable={true}
    />
  );
};

export default TableOfCompanies;

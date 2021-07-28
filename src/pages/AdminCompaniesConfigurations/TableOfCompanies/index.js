import React, { useState, useEffect } from 'react';
import { Table, Skeleton } from 'antd';
import { EditSVG, DeleteSVG } from '../../../components/icons';
import './style.scss';
import { useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { actions } from '../../../core/configurations/configurationsSlice';

import noLogo from '../../../assets/img/no-comany-logo.svg';

const TableOfCompanies = ({ searchValue, setShowDeleteCompany, setDeleteCompanyId, deleteCompanyId }) => {
  const dispatch = useDispatch();
  const { getConfCompanies } = bindActionCreators(actions, dispatch);

  const [tableLoading, setTableLoading] = useState(false);
  const history = useHistory();
  const [dataSource, setDataSource] = useState(null);
  const [copyOfDataSource, setCopyOfDataSource] = useState(null);

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
                history.push(`/admin-company-info-conf/${record.key}`);
              }}>
              <EditSVG />
            </div>
            <div
              onClick={(e) => {
                console.log('record', record);
                setShowDeleteCompany(() => true);
                setDeleteCompanyId(() => record.key);
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
    getConfCompanies().then((data) => {
      setPageInfo(data.payload);
      setTableLoading(() => false);
    });
  }, [deleteCompanyId]);

  const setPageInfo = (data) => {
    const newData = [];
    data.forEach((item) => {
      newData.push({
        key: item.id,
        logo: (
          <div className="logo">
            <img src={item.image?.length ? item.image : noLogo} alt="logo" />
          </div>
        ),
        company_name: item.name,
        company_phone: item.phone,
        address: `${item.address.address_line1} ${item.address.city} ${item.address.state} `,
      });
    });
    setDataSource(() => newData);
    setCopyOfDataSource(() => newData);
  };

  useEffect(() => {
    if (dataSource !== null) {
      if (searchValue.length >= 1) {
        const newData = [];
        dataSource.forEach((item) => {
          if (item.company_name.toLowerCase().trim().replace(/\s/g, '').includes(searchValue.toLowerCase())) {
            newData.push(item);
          }
        });
        setDataSource(() => newData);
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
      )}
    </>
  );
};

export default TableOfCompanies;

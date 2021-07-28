import React, { useState, useEffect } from 'react';
import { Table, Skeleton } from 'antd';
import { EditSVG, DeleteSVG } from '../../../components/icons';
import ModalEditUser from '../ModalEditUser';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import ModalDeleteUser from '../ModalDeleteUser';
import { actions } from '../../../core/configurations/configurationsSlice';
import './style.scss';
import { ArrowRight, ArrowLeftDisabled } from '../../../components/icons';

const TableOfUsers = ({ searchValue }) => {
  const dispatch = useDispatch();
  const { getMembersOfOrganisation } = bindActionCreators(actions, dispatch);
  const [showEditUser, setShowEditUser] = useState(false);
  const [showDeleteUser, setShowDeleteUser] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [currRecordRow, setCurrRecordRow] = useState(null);
  const [tableLoading, setTableLoading] = useState(false);
  const [dataSource, setDataSource] = useState(null);
  const [copyOfDataSource, setCopyOfDataSource] = useState(null);
  const [tableLength, setTableLength] = useState(null);

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
      title: ' ',
      dataIndex: 'actions',
      key: 'actions',
      className: 'actions_btns',
      render: (_, record, index) => {
        return (
          <div className="actions_block">
            <div
              onClick={() => {
                //console.log('e', e.target.dataset.action);
                //console.log('record', record.key);
                //console.log('index', index);
                setActiveId(record.key);
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
                setActiveId(record.key);
                setShowDeleteUser(() => true);
              }}>
              <DeleteSVG />
            </div>
          </div>
        );
      },
    },
  ]);

  const updateUsersList = () => {
    setTableLoading(() => true);
    getMembersOfOrganisation().then((data) => {
      setPageInfo(data.payload);
      setTableLoading(() => false);
    });
  };

  const onChange = (prop) => {
    console.log('helo', prop);
  };

  useEffect(() => {
    setTableLoading(() => true);
    getMembersOfOrganisation().then((data) => {
      setTableLength(() => data.payload.length);
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
        fn: item.first_name,
        ln: item.last_name,
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
          if (item.first_name.props.children[1].props.children.toLowerCase().includes(searchValue.toLowerCase())) {
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

  const itemRender = (current, type, originalElement) => {
    if (type === 'prev') {
      return (
        <div>
          <ArrowLeftDisabled />
        </div>
      );
    }
    if (type === 'next') {
      return (
        <div>
          <ArrowRight />
        </div>
      );
    }
    return originalElement;
  };

  // const onChangePag = (currentActive = 1) => {
  //   console.log('currentActive', currentActive);
  //   const x2 = currentActive * 10;
  //   const remainder = tableLength - x2;
  //   console.log('remainder', remainder);
  //   if (remainder > 0) return true;
  //   return false;
  // };

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
            pagination={{
              className: `ant-pagination ant-table-pagination ant-table-pagination-center ${
                tableLength !== null && tableLength > 10 && 'showPagination'
              }`,
              itemRender: itemRender,
              defaultPageSize: 10,
              pageSize: 10,
              position: ['bottomCenter'],
              showQuickJumper: false,
              showSizeChanger: false,
            }}
          />
          <ModalDeleteUser
            showDeleteUser={showDeleteUser}
            setShowDeleteUser={setShowDeleteUser}
            activeId={activeId}
            updateUsersList={updateUsersList}
          />
          {currRecordRow !== null && (
            <ModalEditUser
              setCurrRecordRow={setCurrRecordRow}
              record={currRecordRow}
              showEditUser={showEditUser}
              setShowEditUser={setShowEditUser}
              updateUsersList={updateUsersList}
            />
          )}
        </>
      )}
    </>
  );
};

export default TableOfUsers;

import React, { useState, useEffect } from 'react';
import { Table, Skeleton } from 'antd';
import { EditSVG, DeleteSVG } from '../../../components/icons';
import ModalEditUser from '../ModalEditUser';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import ModalDeleteUser from '../ModalDeleteUser';
import { actions } from '../../../core/configurations/configurationsSlice';
import './style.scss';
import { ArrowRight, ArrowLeftDisabled, IconUser } from '../../../components/icons';
import { useSelector } from 'react-redux';
import { actions as visActions } from '../../../core/visualization/visualizationSlice';

const TableOfUsers = ({ searchValue, toggle }) => {
  const dispatch = useDispatch();
  const { getMembersOfOrganisation, getInvitesOfOrganisation } = bindActionCreators(actions, dispatch);
  const { blurModal } = bindActionCreators(visActions, dispatch);
  const [showEditUser, setShowEditUser] = useState(false);
  const [showDeleteUser, setShowDeleteUser] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [currRecordRow, setCurrRecordRow] = useState(null);
  const [tableLoading, setTableLoading] = useState(false);
  const [dataSource, setDataSource] = useState(null);
  const [filterSource, setFilterSource] = useState(null);
  const [copyOfDataSource, setCopyOfDataSource] = useState(null);
  const [tableLength, setTableLength] = useState(null);
  const id = useSelector((state) => state?.profile?.data?.id);

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
      render: (test, record, index) => {
        return record.key === id ? (
          <div></div>
        ) : (
          <div className="actions_block">
            {!record.invite && (
              <div
                onClick={() => {
                  //console.log('e', e.target.dataset.action);
                  //console.log('record', record.key);
                  //console.log('index', index);
                  setActiveId(record.key);
                  setCurrRecordRow(record);
                  blurModal(true);
                  setShowEditUser(() => true);
                }}>
                <EditSVG />
              </div>
            )}
            <div
              onClick={(e) => {
                //console.log('e', e.target.dataset.action);
                //console.log('record', record);
                //console.log('index', index);
                setCurrRecordRow(record);
                setActiveId(record.key);
                blurModal(true);
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
      console.log('data', data);
      let result = data.payload;
      getInvitesOfOrganisation().then((invites) => {
        invites.payload.map((item) => {
          item.first_name = '';
          item.image = null;
          item.last_name = '';
          item.invite = true;
          result.push(item);
          return item;
        });
        setTableLength(() => result.length);
        setPageInfo(result);
        setTableLoading(() => false);
      });
    });
  };

  const onChange = (prop) => {
    console.log('helo', prop);
  };

  useEffect(() => {
    setTableLoading(() => true);
    getMembersOfOrganisation().then((data) => {
      let result = data.payload;
      getInvitesOfOrganisation().then((invites) => {
        invites.payload.map((item) => {
          item.first_name = '';
          item.image = null;
          item.last_name = '';
          item.invite = true;
          result.push(item);
          return item;
        });
        setTableLength(() => result.length);
        setPageInfo(result);
        setTableLoading(() => false);
      });
    });
  }, [toggle]);

  const capitalizeLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getProperRole = (role) =>
    role.split('.')[1] === 'MEMBER' ? 'User' : role.split('.')[1] === 'OWNER' && 'Admin';

  const setPageInfo = (data) => {
    const newData = [];
    console.log('data', data);
    data.forEach((item) => {
      newData.push({
        key: item.id,
        first_name: (
          <div className="wrapper_name">
            <div className="wrapper_img">
              {item.invite ? (
                <div className="inviteimage">
                  <IconUser />
                </div>
              ) : item.image?.length ? (
                <img src={item.image} alt="Logo" />
              ) : (
                <div className="noimage sm">
                  {item.first_name[0]}
                  {item.last_name[0]}
                </div>
              )}
            </div>
            <h3 className="name invited">
              {item.invite
                ? 'waiting for confirmation…'
                : `${capitalizeLetter(item.first_name)} ${capitalizeLetter(item.last_name)}`}
            </h3>
          </div>
        ),
        role: item.invite ? '' : getProperRole(item.role),
        email: item.email,
        fn: item.first_name,
        ln: item.last_name,
        invite: item.invite,
        image: item.image,
      });
    });
    setDataSource(() => newData);
    setFilterSource(() => newData);
    setCopyOfDataSource(() => newData);
  };

  useEffect(() => {
    if (dataSource !== null) {
      if (searchValue.trim().length > 0) {
        const newData = dataSource.filter(
          (item) =>
            item.fn.toLowerCase().includes(searchValue.toLowerCase()) ||
            item.email.toLowerCase().includes(searchValue.toLowerCase()),
        );
        setFilterSource(() => newData);
      } else {
        setFilterSource(() => dataSource);
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
            dataSource={filterSource}
            columns={columns}
            onChange={onChange}
            pagination={false}
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
          {currRecordRow !== null && (
            <ModalDeleteUser
              currRecordRow={currRecordRow}
              showDeleteUser={showDeleteUser}
              setShowDeleteUser={setShowDeleteUser}
              activeId={activeId}
              updateUsersList={updateUsersList}
              setTableLength={setTableLength}
            />
          )}

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

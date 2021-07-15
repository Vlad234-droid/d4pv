import React, { useState } from 'react';
import { Form, Button, Input, Row, Col } from 'antd';
import './style.scss';
import { SearchSVG, CloseSVG } from '../../components/icons';
import ModalAddUser from './ModalAddUser';
import ModalDeleteUser from './ModalDeleteUser';
import TableOfUsers from './TableOfUsers';
import LayoutConfiguration from '../../components/LayoutConfiguration/Layout';

const AdminUsersConfigurations = () => {
  const [form] = Form.useForm();
  const [showAddUser, setShowAddUser] = useState(false);
  const [showDeleteUser, setShowDeleteUser] = useState(false);
  const [serchToggle, setSearchToggle] = useState(false);

  const onFinish = (values) => {
    console.log('values', values);
  };

  const suffixSearch = (
    <div
      style={{ cursor: 'pointer', zIndex: '1000' }}
      data-suffix="suffix"
      onClick={(e) => {
        console.log('log from suffix', e.currentTarget);
      }}>
      {!serchToggle ? (
        <SearchSVG />
      ) : (
        <CloseSVG
          onClick={(e) => {
            console.log('log from suffix', e.currentTarget);
            setSearchToggle(false);
          }}
        />
      )}
    </div>
  );

  return (
    <LayoutConfiguration>
      <div className="block_users" id="block_users">
        <ModalAddUser showAddUser={showAddUser} setShowAddUser={setShowAddUser} />
        <ModalDeleteUser showDeleteUser={showDeleteUser} setShowDeleteUser={setShowDeleteUser} />
        <div className="title_users">
          <h2>Users</h2>
        </div>
        <div className="form_to_add">
          <Form form={form} className="create_user" onFinish={onFinish}>
            <Row>
              <Col span={4}>
                <Button
                  type="primary"
                  className="save_link"
                  style={{ height: '40px' }}
                  onClick={() => setShowAddUser(() => true)}>
                  Add User
                </Button>
              </Col>
              <Col span={serchToggle ? 18 : 8} offset={serchToggle ? 2 : 12}>
                <Form.Item name="search" className="input_link" onClick={() => setSearchToggle((prev) => !prev)}>
                  <Input
                    placeholder="Search"
                    suffix={suffixSearch}
                    onBlur={() => setSearchToggle(() => false)}
                    onClick={(e) => console.log('e from click', e)}
                    onFocus={(e) => {
                      console.log('e from blur', e.currentTarget);
                      setSearchToggle((prev) => !prev);
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
        <div>
          <TableOfUsers setShowDeleteUser={setShowDeleteUser} />
        </div>
      </div>
    </LayoutConfiguration>
  );
};
export default AdminUsersConfigurations;

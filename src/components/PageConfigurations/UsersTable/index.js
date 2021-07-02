import React, { useState } from 'react';
import { Form, Button, Input, Row, Col } from 'antd';
import './style.scss';
import { SearchSVG } from '../../icons';
import ModalAddUser from './ModalAddUser';
import ModalDeleteUser from './ModalDeleteUser';
import TableOfUsers from './TableOfUsers';

const UsersTable = () => {
  const [form] = Form.useForm();
  const [showAddUser, setShowAddUser] = useState(false);
  const [showDeleteUser, setShowDeleteUser] = useState(false);

  const onFinish = (values) => {
    console.log('values', values);
  };

  const suffixSearch = (
    <div>
      <SearchSVG />
    </div>
  );

  return (
    <div className="block_users" id="block_users">
      <ModalAddUser showAddUser={showAddUser} setShowAddUser={setShowAddUser} />
      <ModalDeleteUser showDeleteUser={showDeleteUser} setShowDeleteUser={setShowDeleteUser} />
      {/*<button onClick={() => setShowDeleteUser(() => true)}>Delete User</button>*/}
      <div className="title_users">
        <h2>Users</h2>
      </div>
      <div className="form_to_add">
        <Form form={form} className="create_user" onFinish={onFinish}>
          <Row>
            <Col span={4}>
              <Button
                type="primary"
                htmlType="submit"
                className="save_link"
                style={{ height: '40px' }}
                onClick={() => setShowAddUser(() => true)}>
                Add User
              </Button>
            </Col>
            <Col span={8} offset={12}>
              <Form.Item name="search" className="input_link">
                <Input placeholder="Search" suffix={suffixSearch} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <div>
        <TableOfUsers />
      </div>
    </div>
  );
};
export default UsersTable;

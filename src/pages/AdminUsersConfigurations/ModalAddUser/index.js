import React from 'react';
import { Modal, Form, Input, Button, Col, Row, Radio } from 'antd';
import './style.scss';
import { CloseIconSVG } from '../../../components/icons';

const ModalAddUser = ({ showAddUser, setShowAddUser }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('values', values);
    setShowAddUser(() => false);
  };

  return (
    <Modal
      visible={showAddUser}
      closeIcon={<CloseIconSVG />}
      onCancel={() => {
        setShowAddUser(() => false);
      }}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}
      getContainer={() => document.getElementById('block_users')}
      width={544}
      className="modal_createUser">
      <Form
        name="user_create"
        layout="vertical"
        form={form}
        requiredMark={true}
        onFinish={onFinish}
        initialValues={{
          option__user__admin: 'admin',
        }}>
        <h2>Add User</h2>
        <Col span={24}>
          <Form.Item
            name="email"
            className="email"
            label="User Email"
            rules={[
              {
                required: true,
                message: 'Type your email',
              },
            ]}>
            <Input />
          </Form.Item>
        </Col>

        <div className="checkBox">
          <Form.Item name="option__user__admin">
            <Radio.Group>
              <Row gutter={192}>
                <Col span={5}>
                  <Radio value="user" name="user">
                    <Button type="button">User</Button>
                  </Radio>
                </Col>
                <Col span={5}>
                  <Radio value="admin" name="admin">
                    <Button type="primary">Admin</Button>
                  </Radio>
                </Col>
              </Row>
            </Radio.Group>
          </Form.Item>
        </div>

        <Form.Item className="submit__cancel_user">
          <Row gutter={16}>
            <Col span={9}>
              <Button
                type="button"
                onClick={() => {
                  setShowAddUser(() => false);
                }}>
                Cancel
              </Button>
            </Col>
            <Col span={15}>
              <Button type="primary" htmlType="submit">
                Confirm
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default ModalAddUser;

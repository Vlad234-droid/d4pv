import React from 'react';
import { Modal, Form, Input, Button, Col, Row, Radio, notification } from 'antd';
import './style.scss';
import { CloseIconSVG } from '../../../components/icons';
import { actions } from '../../../core/configurations/configurationsSlice';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';

const ModalAddUser = ({ showAddUser, setShowAddUser }) => {
  const dispatch = useDispatch();
  const { inViteMemberToOrganisation } = bindActionCreators(actions, dispatch);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('values,', values);
    inViteMemberToOrganisation({
      email: values.email,
      role: values.role,
    }).then((data) => {
      const type = data.error ? 'error' : 'success';
      return notification[type]({
        message: data.error ? data.error.message : 'The invitation was successfully sent',
        description: data.error ? 'Please try again! ' : '',
        duration: 3.5,
      });
    });
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
          role: 2,
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
                message: 'Email is required',
              },
              {
                type: 'email',
                message: 'Please input your Email',
              },
            ]}>
            <Input />
          </Form.Item>
        </Col>

        <div className="checkBox">
          <Form.Item name="role">
            <Radio.Group>
              <Row gutter={192}>
                <Col span={5}>
                  <Radio value={2} name="user">
                    <Button type="button">User</Button>
                  </Radio>
                </Col>
                <Col span={5}>
                  <Radio value={1} name="admin">
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

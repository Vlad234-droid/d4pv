import React from 'react';
import { CloseIconSVG } from '../../../icons';
import { Modal, Form, Input, Button, Col, Row, Radio } from 'antd';
import './style.scss';

const ModalDeleteUser = ({ showDeleteUser, setShowDeleteUser }) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('values', values);
  };
  return (
    <Modal
      visible={showDeleteUser}
      closeIcon={<CloseIconSVG />}
      onCancel={() => {
        setShowDeleteUser(() => false);
      }}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}
      getContainer={() => document.getElementById('block_users')}
      width={544}
      className="modal_deleteUser">
      <Form name="user_delete" layout="vertical" form={form} requiredMark={true} onFinish={onFinish}>
        <h2>Delete User</h2>

        <p>Are you sure you want to delete this user?</p>

        <Form.Item className="submit__cancel_delete_user">
          <Row gutter={16}>
            <Col span={9}>
              <Button
                type="button"
                onClick={() => {
                  setShowDeleteUser(() => false);
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
export default ModalDeleteUser;

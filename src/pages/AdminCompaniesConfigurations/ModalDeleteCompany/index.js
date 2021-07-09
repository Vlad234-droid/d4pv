import React from 'react';
import { CloseIconSVG } from '../../../components/icons';
import { Modal, Form, Button, Col, Row } from 'antd';
import './style.scss';

const ModalDeleteCompany = ({ showDeleteCompany, setShowDeleteCompany }) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('values', values);
  };
  return (
    <Modal
      visible={showDeleteCompany}
      closeIcon={<CloseIconSVG />}
      onCancel={() => {
        setShowDeleteCompany(() => false);
      }}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}
      getContainer={() => document.getElementById('block_companies')}
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
                  setShowDeleteCompany(() => false);
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
export default ModalDeleteCompany;

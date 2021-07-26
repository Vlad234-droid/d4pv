import React, { useState } from 'react';
import { CloseIconSVG } from '../../../components/icons';
import { Modal, Form, Button, Col, Row, notification } from 'antd';
import { actions } from '../../../core/companies/companiesSlice';
import './style.scss';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

const ModalDeleteCompany = ({ showDeleteCompany, setShowDeleteCompany, deleteCompanyId, setDeleteCompanyId }) => {
  const [loading, setloading] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { deleteCompany } = bindActionCreators(actions, dispatch);

  const onFinish = () => {
    setloading(true);
    deleteCompany(deleteCompanyId).then((data) => {
      notification[data.error ? 'error' : 'success']({
        message: data.error ? 'An Error Occurred, Please Try Again' : 'Company has been deleted successfully',
        duration: 3.5,
      });
      setShowDeleteCompany(() => false);
      setDeleteCompanyId(null);
      setloading(false);
    });
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
              <Button type="primary" htmlType="submit" loading={loading}>
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

import React, { useEffect, useState } from 'react';
import { CloseIconSVG } from '../../../components/icons';
import { Modal, Form, Button, Col, Row, notification } from 'antd';
import { actions } from '../../../core/configurations/configurationsSlice';

import './style.scss';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

const ModalDeleteUser = ({ showDeleteUser, setShowDeleteUser, activeId, updateUsersList }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { removeMembersOfOrganisation, getMembersOfOrganisation } = bindActionCreators(actions, dispatch);
  const onFinish = (values) => {
    setLoading(true);
    removeMembersOfOrganisation(activeId).then((data) => {
      if (!data.error) {
        notification.success({
          description: 'User has been deleted',
          duration: 3.5,
        });
        setShowDeleteUser(false);
        setLoading(false);
        updateUsersList();
      }
    });
  };

  useEffect(() => {
    console.log('activeId', activeId);
  }, [activeId]);

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
export default ModalDeleteUser;

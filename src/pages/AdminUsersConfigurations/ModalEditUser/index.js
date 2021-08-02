import React, { useState } from 'react';
import { Modal, Form, Button, Col, Row, Radio, notification } from 'antd';
import './style.scss';
import { CloseIconSVG } from '../../../components/icons';
import { actions } from '../../../core/configurations/configurationsSlice';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as visActions } from '../../../core/visualization/visualizationSlice';

const ModalEditUser = ({ setCurrRecordRow, record, showEditUser, setShowEditUser, updateUsersList }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { updateMemberToOrganisation } = bindActionCreators(actions, dispatch);
  const { blurModal } = bindActionCreators(visActions, dispatch);

  const onFinish = (values) => {
    setLoading(true);
    updateMemberToOrganisation({
      account_id: record.key,
      body: values,
    }).then((data) => {
      if (!data.error) {
        notification.success({
          description: 'User has been updated',
          duration: 3.5,
        });
        updateUsersList();
        setLoading(false);
        setCurrRecordRow(() => null);
      }
    });
    blurModal(false);
    setShowEditUser(() => false);
  };

  return (
    <Modal
      visible={showEditUser}
      closeIcon={<CloseIconSVG />}
      onCancel={() => {
        setShowEditUser(() => false);
        blurModal(false);
        setCurrRecordRow(() => null);
      }}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}
      width={544}
      className="modal_editUser">
      <Form
        name="edit_human"
        layout="vertical"
        form={form}
        requiredMark={true}
        onFinish={onFinish}
        initialValues={{
          role: record.role === 'Admin' ? 1 : 2,
        }}>
        <h2>Edit User</h2>
        <Col span={24}>
          <Form.Item className="exept">
            <div className="block_info">
              <div className="direction">
                <div className="wrapper_img">
                  {record.image ? (
                    <img src={record.image} alt="logo" />
                  ) : (
                    <div className="noimage sm">
                      {record.fn[0]}
                      {record.ln[0]}
                    </div>
                  )}
                </div>
                <div className="infos">
                  <h3>{record?.name?.props?.children[1]?.props?.children}</h3>
                  <h3>{record.email}</h3>
                </div>
              </div>
            </div>
          </Form.Item>
        </Col>

        <div className="checkBox">
          <Form.Item name="role">
            <Radio.Group>
              <Row gutter={192}>
                <Col span={5}>
                  <Radio value={2} name="user">
                    <Button type="button" className="user_btn">
                      Regular User
                    </Button>
                  </Radio>
                </Col>
                <Col span={5} className="col-exp">
                  <Radio value={1} name="admin">
                    <Button type="primary" className="admin_btn">
                      Admin
                    </Button>
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
                  setShowEditUser(() => false);
                  setCurrRecordRow(() => null);
                  blurModal(false);
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
export default ModalEditUser;

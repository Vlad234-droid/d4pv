import React from 'react';
import { Modal, Form, Button, Col, Row, Radio } from 'antd';
import './style.scss';
import { CloseIconSVG } from '../../../components/icons';

const ModalEditUser = ({ setCurrRecordRow, record, showEditUser, setShowEditUser }) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('values', values);
    setCurrRecordRow(() => null);
    //setShowEditUser(() => false);
  };

  return (
    <Modal
      visible={showEditUser}
      closeIcon={<CloseIconSVG />}
      onCancel={() => {
        setShowEditUser(() => false);
        setCurrRecordRow(() => null);
      }}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}
      getContainer={() => document.querySelector('.table_users')}
      width={544}
      className="modal_editUser">
      <Form
        name="edit_human"
        layout="vertical"
        form={form}
        requiredMark={true}
        onFinish={onFinish}
        initialValues={{
          option__user__admin: record.role === 'Admin' ? 'admin' : 'user',
        }}>
        <h2>Edit User</h2>
        <Col span={24}>
          <Form.Item className="exept">
            <div className="block_info">
              <div className="direction">
                <div className="wrapper_img">
                  <img src={record?.name?.props?.children[0]?.props?.children?.props?.src} alt="logo" />
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
          <Form.Item name="option__user__admin">
            <Radio.Group>
              <Row gutter={192}>
                <Col span={5}>
                  <Radio value="user" name="user">
                    <Button type="button" className="user_btn">
                      Regular User
                    </Button>
                  </Radio>
                </Col>
                <Col span={5} className="col-exp">
                  <Radio value="admin" name="admin">
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
export default ModalEditUser;

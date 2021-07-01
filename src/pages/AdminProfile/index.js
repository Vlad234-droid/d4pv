import React, { useState } from 'react';
import LayoutAdmin from '../../components/LayoutAdmin/Layout';
import './style.scss';
import { BackLeftSVG, SVG_Reload, SVG_delete } from '../../components/icons';
import { Form, Input, Button, Row, Col } from 'antd';
import { ShowPassword } from '../../components/icons';

const AdminProfile = () => {
  const [form] = Form.useForm();
  const [showFormPassword, setShowFormPassword] = useState(false);

  const [showPassFirst, setShowPassFirst] = useState(false);
  const [showPassSecond, setShowPassSecond] = useState(false);
  const [showPassThird, setShowPassThird] = useState(false);

  const [valueFirstPass, setValueFirstPass] = useState('');
  const [valueSecondPass, setValueSecondPass] = useState('');
  const [valueThirdPass, setValueThirdPass] = useState('');

  const onFinishHandler = (values) => {
    console.log('values', values);
    form.resetFields();
  };

  const onFinishHandlerOrganization = (values) => {
    console.log('values', values);
    form.resetFields();
  };

  const onFinishPasswordHandler = (values) => {
    console.log('values password', values);
  };

  const suffixFirst = (
    <div className="showPassFirst" onClick={() => setShowPassFirst((prev) => !prev)}>
      <ShowPassword />
    </div>
  );
  const suffixSecond = (
    <div className="showPassSecond" onClick={() => setShowPassSecond((prev) => !prev)}>
      <ShowPassword />
    </div>
  );
  const suffixThird = (
    <div className="showPassThird" onClick={() => setShowPassThird((prev) => !prev)}>
      <ShowPassword />
    </div>
  );

  return (
    <LayoutAdmin className={`admin_profile ${showFormPassword && 'allow_over'}`}>
      <div className="wrapper">
        <div className="container_info">
          <div className="back">
            <div className="SVG_back" onClick={() => {}}>
              <BackLeftSVG />
            </div>
            <p>back</p>
          </div>
          <h2>Profile</h2>
          <div className="forms_container">
            <div className="form_profile">
              <div className="information">
                <h2>Profile information</h2>
              </div>
              <div className="blocks_wrapper">
                <div className="selfi_wrapper">
                  <div className="centeredIMG">
                    <div className="selfi">
                      <img
                        src="https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                        alt=""
                      />
                    </div>
                  </div>

                  <div className="change">
                    <div className="SVG_reload">
                      <SVG_Reload />
                      <p>Change</p>
                    </div>
                  </div>
                  <div className="delete">
                    <div className="SVG_delete">
                      <SVG_delete />
                      <p>Delete</p>
                    </div>
                  </div>
                </div>
                <div className="form_password">
                  <Form className="form_FL_name" form={form} layout="vertical" onFinish={onFinishHandler}>
                    <Col span={24} style={{ minHeight: '50px !important' }}>
                      <Form.Item label="First Name" name="firstName">
                        <Input placeholder="Goward" type="text" />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item label="Last Name" name="lastName">
                        <Input placeholder="Cooper" type="text" />
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item label="Email" name="email">
                        <Input placeholder="test@mail.com" />
                      </Form.Item>
                    </Col>

                    <Form.Item>
                      <Button type="primary" htmlType="submit" className="btn_save_prof">
                        Save
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </div>

            <div className="wraper_2_blocks">
              <div className="organisation">
                <h2>Organization information</h2>
                <Form
                  className="form_profile_admin"
                  form={form}
                  layout="vertical"
                  onFinish={onFinishHandlerOrganization}>
                  <Col span={24}>
                    <Form.Item label="Organization Name" name="OrgName">
                      <Input placeholder="Type your organization name" type="text" />
                    </Form.Item>
                  </Col>
                  <Col span={10} style={{ marginTop: '37px' }}>
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Save
                      </Button>
                    </Form.Item>
                  </Col>
                </Form>
              </div>
              <div className={`change_password_block ${showFormPassword && 'full_form'}`}>
                <h2>Change Password</h2>
                {!showFormPassword ? (
                  <span onClick={() => setShowFormPassword(() => true)}>Change</span>
                ) : (
                  <Form
                    className="change_password_form"
                    form={form}
                    layout="vertical"
                    onFinish={onFinishPasswordHandler}>
                    <Col span={24}>
                      <Form.Item label="Current Password" name="old_password" className="passwordFirst">
                        <Input
                          suffix={suffixFirst}
                          value={valueFirstPass}
                          type={showPassFirst ? 'text' : 'password'}
                          placeholder="Create your password"
                          className="passwordFirst"
                          onChange={(e) => setValueFirstPass(() => e.target.value)}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item label="Password" name="new_password" className="new_password">
                        <Input
                          suffix={suffixSecond}
                          value={valueSecondPass}
                          type={showPassSecond ? 'text' : 'password'}
                          placeholder="Create your password"
                          className="new_password"
                          onChange={(e) => setValueSecondPass(() => e.target.value)}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        label="Repeat New Password"
                        name="new_password_approved"
                        className="new_password_approved"
                        dependencies={['new_password']}
                        rules={[
                          {
                            required: true,
                            message: 'Please confirm your password!',
                          },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (!value || getFieldValue('new_password') === value) {
                                return Promise.resolve();
                              }

                              return Promise.reject(new Error('Incorrect password'));
                            },
                          }),
                        ]}>
                        <Input
                          suffix={suffixThird}
                          value={valueThirdPass}
                          type={showPassThird ? 'text' : 'password'}
                          placeholder="Repeat your password"
                          className="passwordApproved"
                          onChange={(e) => setValueThirdPass(() => e.target.value)}
                        />
                      </Form.Item>
                    </Col>
                    <Row gutter={16} style={{ marginTop: '41.1px' }}>
                      <Col span={11}>
                        <Form.Item>
                          <Button type="default" htmlType="submit" onClick={() => setShowFormPassword(() => false)}>
                            Cancel
                          </Button>
                        </Form.Item>
                      </Col>
                      <Col span={13}>
                        <Form.Item>
                          <Button type="primary" htmlType="submit">
                            Confirm
                          </Button>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
};
export default AdminProfile;

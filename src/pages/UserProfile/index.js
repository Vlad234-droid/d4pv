import React, { useState, useEffect } from 'react';
import Layout from '../../components/LayoutDashboard/Layout';
import './style.scss';
import { BackLeftSVG, SVGReload, SVGDelete } from '../../components/icons';
import { Form, Input, Button, Row, Col } from 'antd';
import { ShowPassword, CloseToShowPassword } from '../../components/icons';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { actions } from '../../core/profile/profileSlice';
import UploadImg from './UploadImg';

const UserProfile = () => {
  const dispatch = useDispatch();
  const [formProfileInformation] = Form.useForm();
  const [formPassword] = Form.useForm();
  const [showFormPassword, setShowFormPassword] = useState(false);

  const [showPassFirst, setShowPassFirst] = useState(false);
  const [showPassSecond, setShowPassSecond] = useState(false);
  const [showPassThird, setShowPassThird] = useState(false);

  const [valueFirstPass, setValueFirstPass] = useState('');
  const [valueSecondPass, setValueSecondPass] = useState('');
  const [valueThirdPass, setValueThirdPass] = useState('');

  const [logoUrl, setLogoUrl] = useState(null);
  const [editCompanyLogo, setEditCompanyLogo] = useState(false);

  const onFinishHandler = (values) => {
    console.log('values', values);
    formProfileInformation.resetFields();
  };

  const onFinishPasswordHandler = (values) => {
    console.log('values password', values);
    formPassword.resetFields();
  };

  const { getProfile } = bindActionCreators(actions, dispatch);

  useEffect(() => {
    getProfile();
  }, []);

  const PasswordFormChange = () => {
    return (
      <Form
        name="change_password_form"
        className="change_password_form"
        form={formProfileInformation}
        layout="vertical"
        onFinish={onFinishPasswordHandler}>
        <Col span={24}>
          <Form.Item
            label="Current Password"
            name="old_password"
            className="passwordFirst"
            rules={[
              {
                required: true,
                message: 'Current password is required!',
              },
            ]}>
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
          <Form.Item
            label="Password"
            name="new_password"
            className="new_password"
            rules={[
              {
                required: true,
                message: 'New password is required!',
              },
            ]}>
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
              <Button type="default" onClick={() => setShowFormPassword(() => false)}>
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
    );
  };

  const suffixFirst = (
    <div className="showPassFirst" onClick={() => setShowPassFirst((prev) => !prev)}>
      {!showPassFirst ? <ShowPassword /> : <CloseToShowPassword />}
    </div>
  );
  const suffixSecond = (
    <div className="showPassSecond" onClick={() => setShowPassSecond((prev) => !prev)}>
      {!showPassSecond ? <ShowPassword /> : <CloseToShowPassword />}
    </div>
  );
  const suffixThird = (
    <div className="showPassThird" onClick={() => setShowPassThird((prev) => !prev)}>
      {!showPassThird ? <ShowPassword /> : <CloseToShowPassword />}
    </div>
  );

  return (
    <Layout className="user_profile">
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
                <div className="form_password">
                  <Form
                    name="form_FL_name"
                    className="form_FL_name"
                    form={formPassword}
                    layout="vertical"
                    onFinish={onFinishHandler}>
                    <Row gutter={20}>
                      <Col span={7}>
                        <Form.Item name="logo">
                          <UploadImg
                            form={formProfileInformation}
                            logoUrl={logoUrl}
                            setLogoUrl={setLogoUrl}
                            editCompanyLogo={editCompanyLogo}
                            setEditCompanyLogo={setEditCompanyLogo}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={17}>
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
                          <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                              {
                                type: 'email',
                                message: 'Please input your Email!',
                              },
                              {
                                required: true,
                                message: 'Email is required!',
                              },
                            ]}>
                            <Input placeholder="test@mail.com" />
                          </Form.Item>
                        </Col>
                        <Col span={24}>
                          <Form.Item>
                            <Button type="primary" htmlType="submit" className="btn_save_prof">
                              Save
                            </Button>
                          </Form.Item>
                        </Col>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </div>
            </div>

            <div className={`change_password_block ${showFormPassword && 'full_form'}`}>
              <h2>Change Password</h2>
              {!showFormPassword ? (
                <span onClick={() => setShowFormPassword(() => true)}>Change</span>
              ) : (
                <PasswordFormChange />
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default UserProfile;

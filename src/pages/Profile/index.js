import React, { useState, useEffect } from 'react';
import LayoutBoth from '../../components/LayoutBoth/Layout';
import './style.scss';
import { BackLeftSVG } from '../../components/icons';
import { Form, Input, Button, Row, Col, Skeleton, notification } from 'antd';
import { ShowPassword, CloseToShowPassword } from '../../components/icons';
import UploadImg from './UploadImg';
import { actions, getRole } from '../../core/profile/profileSlice';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const AdminProfile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [formProfileInfo] = Form.useForm();
  const [formOrganization] = Form.useForm();
  const [formPassword] = Form.useForm();
  const [showFormPassword, setShowFormPassword] = useState(false);
  const [loadingHandler, setLoadingHandler] = useState(false);
  const [loadingOrganization, setLoadingOrganization] = useState(false);

  const [updatedRole, setUpdatedRole] = useState(null);

  const [showPassFirst, setShowPassFirst] = useState(false);
  const [showPassSecond, setShowPassSecond] = useState(false);
  const [showPassThird, setShowPassThird] = useState(false);

  const [valueFirstPass, setValueFirstPass] = useState('');
  const [valueSecondPass, setValueSecondPass] = useState('');
  const [valueThirdPass, setValueThirdPass] = useState('');

  const [loadingPassword, setLoadingPassword] = useState(false);

  const { getProfile, updateProfile, update, updateOrganisation, changePassword } = bindActionCreators(
    actions,
    dispatch,
  );

  const { data } = useSelector((state) => state.profile);

  const onFinishHandler = (values) => {
    const body = {};
    for (let item in values) {
      if (values[item] === undefined) continue;
      body[item] = values[item];
    }
    setLoadingHandler(true);
    updateProfile(body).then((data) => {
      setLoadingHandler(false);
      if (!data.error) {
        notification.success({
          description: 'Information has been updated',
          duration: 3.5,
        });
      }
    });
    update(body);
  };

  const onFinishHandlerOrganization = (values) => {
    const body = {
      first_name: data.first_name,
      last_name: data.last_name,
      organisation: values.organisation,
    };
    setLoadingOrganization(true);
    updateProfile(body).then((data) => {
      if (!data.error) {
        notification.success({
          description: 'Information has been updated',
          duration: 3.5,
        });
      }
      setLoadingOrganization(false);
    });
    updateOrganisation(values.organisation);
  };

  const onFinishPasswordHandler = (values) => {
    setLoadingPassword(() => true);
    const body = {
      password: values.old_password,
      new_password: values.new_password_approved,
    };
    changePassword(body).then((data) => {
      notification[data.error ? 'error' : 'success']({
        message: data.error ? 'The password is incorrect. Try again' : 'Your password has been changed successfully',
        duration: 3.5,
      });
    });
    setLoadingPassword(() => false);

    formPassword.resetFields();
  };

  useEffect(() => {
    getProfile().then((data) => {
      if (!data.error) {
        const role = data.payload?.role.split('.');
        const [_, last] = role;
        setUpdatedRole(() => {
          if (last === 'OWNER') return true;
          return false;
        });
      }
    });
  }, []);

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
    <LayoutBoth className={`admin_profile ${showFormPassword && 'allow_over'}`}>
      <div className="wrapper">
        <div className="container_info">
          <div className="back">
            <div
              className="SVG_back"
              onClick={() => {
                history.goBack();
              }}>
              <BackLeftSVG />
            </div>
            <p>back</p>
          </div>
          <h2>Profile</h2>
          {!data ? (
            <>
              <Skeleton active />
              <Skeleton active />
            </>
          ) : (
            <div className="forms_container">
              <div className="form_profile">
                <div className="information">
                  <h2>Profile information</h2>
                </div>
                <div className="blocks_wrapper">
                  <div className="form_password">
                    <Form
                      className="form_FL_name"
                      initialValues={{
                        first_name: data.first_name,
                        last_name: data.last_name,
                        email: data.email,
                      }}
                      form={formProfileInfo}
                      layout="vertical"
                      onFinish={onFinishHandler}>
                      <Row gutter={20}>
                        <Col span={7} style={{ paddingLeft: '0px' }}>
                          <Form.Item name="logo">
                            <UploadImg />
                          </Form.Item>
                        </Col>
                        <Col span={17}>
                          <Col span={24} style={{ minHeight: '50px !important' }}>
                            <Form.Item label="First Name" name="first_name">
                              <Input placeholder="Goward" type="text" />
                            </Form.Item>
                          </Col>
                          <Col span={24}>
                            <Form.Item label="Last Name" name="last_name">
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
                                  message: 'Please input your Email',
                                },
                                {
                                  required: true,
                                  message: 'Email is required',
                                },
                              ]}>
                              <Input placeholder="test@mail.com" />
                            </Form.Item>
                          </Col>
                          <Col span={24}>
                            <Form.Item>
                              <Button
                                type="primary"
                                htmlType="submit"
                                className="btn_save_prof"
                                loading={loadingHandler}>
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

              <div className="wraper_2_blocks">
                {updatedRole !== null && updatedRole && (
                  <div className="organisation">
                    <h2>Organization information</h2>
                    <Form
                      className="form_profile_admin"
                      form={formOrganization}
                      layout="vertical"
                      onFinish={onFinishHandlerOrganization}
                      initialValues={{
                        organisation: data?.organisation?.name,
                      }}>
                      <Col span={24}>
                        <Form.Item
                          label="Organization Name"
                          name="organisation"
                          rules={[
                            {
                              required: true,
                              message: 'Input organization name!',
                            },
                          ]}>
                          <Input placeholder="Type your organization name" type="text" />
                        </Form.Item>
                      </Col>
                      <Col span={10} style={{ marginTop: '37px' }}>
                        <Form.Item>
                          <Button type="primary" htmlType="submit" loading={loadingOrganization}>
                            Save
                          </Button>
                        </Form.Item>
                      </Col>
                    </Form>
                  </div>
                )}

                <div className={`change_password_block ${showFormPassword && 'full_form'}`}>
                  <h2>Change Password</h2>
                  {!showFormPassword ? (
                    <span onClick={() => setShowFormPassword(() => true)}>Change</span>
                  ) : (
                    <Form
                      className="change_password_form"
                      form={formPassword}
                      layout="vertical"
                      onFinish={onFinishPasswordHandler}>
                      <Col span={24}>
                        <Form.Item
                          label="Current Password"
                          name="old_password"
                          className="passwordFirst"
                          rules={[{ required: true, message: 'Please input your current password' }]}>
                          <Input
                            suffix={suffixFirst}
                            value={valueFirstPass}
                            type={showPassFirst ? 'text' : 'password'}
                            placeholder="Current Password"
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
                              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                              message:
                                'Invalid password. Valid password must be at least 8 characters long and contain both lower and uppercase characters and at least one number',
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
                              message: 'Please confirm your password',
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
                            <Button type="primary" htmlType="submit" loading={loadingPassword}>
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
          )}
        </div>
      </div>
    </LayoutBoth>
  );
};
export default AdminProfile;

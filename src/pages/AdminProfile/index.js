import React, { useState, useEffect } from 'react';
import LayoutAdmin from '../../components/LayoutAdmin/Layout';
import './style.scss';
import { BackLeftSVG } from '../../components/icons';
import { Form, Input, Button, Row, Col, Skeleton } from 'antd';
import { ShowPassword, CloseToShowPassword } from '../../components/icons';
import UploadImg from './UploadImg';
import { actions } from '../../core/profile/profileSlice';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import lockr from 'lockr';

const AdminProfile = () => {
  const dispatch = useDispatch();
  const [info, setInfo] = useState({});
  const [formProfileInfo] = Form.useForm();
  const [formOrganization] = Form.useForm();
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

  const { getProfile, updateProfile, update, updateOrganisation } = bindActionCreators(actions, dispatch);

  const { data } = useSelector((state) => state.profile);

  const onFinishHandler = (values) => {
    const body = {};
    for (let item in values) {
      if (values[item] === undefined) continue;
      body[item] = values[item];
    }
    updateProfile(body);
    update(body);
  };

  const onFinishHandlerOrganization = (values) => {
    updateProfile(values);
    updateOrganisation(values.organisation);
  };

  const onFinishPasswordHandler = (values) => {
    console.log('values password', values);
    formPassword.resetFields();
  };

  useEffect(() => {
    getProfile();
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
                        <Col span={7}>
                          <Form.Item name="logo">
                            <UploadImg
                              form={formProfileInfo}
                              logoUrl={logoUrl}
                              setLogoUrl={setLogoUrl}
                              editCompanyLogo={editCompanyLogo}
                              setEditCompanyLogo={setEditCompanyLogo}
                            />
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

              <div className="wraper_2_blocks">
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
                      form={formPassword}
                      layout="vertical"
                      onFinish={onFinishPasswordHandler}>
                      <Col span={24}>
                        <Form.Item
                          label="Current Password"
                          name="old_password"
                          className="passwordFirst"
                          rules={[{ required: true, message: 'Please input your current password!' }]}>
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
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </LayoutAdmin>
  );
};
export default AdminProfile;

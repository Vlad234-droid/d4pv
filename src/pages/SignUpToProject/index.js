import React, { useState } from 'react';
import Layout from '../../components/LayoutGuest/Layout';
import { Form, Input, Button, Row, Col } from 'antd';
import './style.scss';
import { Logo4PV } from '../../components/icons';
import { ShowPassword, CloseToShowPassword } from '../../components/icons';

const SignUpToProject = () => {
  const [valueFirstPass, setValueFirstPass] = useState('');
  const [valueSecondPass, setValueSecondPass] = useState('');
  const [showPassFirst, setShowPassFirst] = useState(false);
  const [showPassSecond, setShowPassSecond] = useState(false);
  const [form] = Form.useForm();
  const onFinishHandler = (values) => {
    console.log('values', values);
    form.resetFields();
  };
  const suffixFirst = (
    <div className="showPassFirst" onClick={() => setShowPassFirst((prev) => !prev)}>
      {!showPassFirst ? <ShowPassword /> : <CloseToShowPassword />}
    </div>
  );
  const suffixSecond = (
    <div className="showPassFirst" onClick={() => setShowPassSecond((prev) => !prev)}>
      {!showPassSecond ? <ShowPassword /> : <CloseToShowPassword />}
    </div>
  );
  return (
    <Layout isLogged={false} mode="login" className="login-page">
      <div className="wrapper">
        <div className="block_sign_up_toProject">
          <div className="block_wrapper">
            <div className="logo4pv">
              <Logo4PV />
            </div>
            <div className="goSolar">
              <h2>Sign Up to GO Solar</h2>
            </div>
            <Form className="form_sign_up" form={form} layout="vertical" onFinish={onFinishHandler}>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item label="First Name" name="firstName">
                    <Input placeholder="Add your first name" type="text" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Last Name" name="lastName">
                    <Input placeholder="Add your last name" type="text" />
                  </Form.Item>
                </Col>
              </Row>
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
                  <Input placeholder="Type your email" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Password"
                  name="passwordFirst"
                  className="passwordFirst"
                  rules={[
                    { min: 6, message: 'Password must be at least 6 characters!' },
                    { required: true, message: 'Please input your password!' },
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
                  label="Repeat Password"
                  name="password"
                  className="passwordApproved"
                  dependencies={['passwordFirst']}
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('passwordFirst') === value) {
                          return Promise.resolve();
                        }

                        return Promise.reject(new Error('Incorrect password'));
                      },
                    }),
                  ]}>
                  <Input
                    suffix={suffixSecond}
                    value={valueSecondPass}
                    type={showPassSecond ? 'text' : 'password'}
                    placeholder="Repeat your password"
                    className="passwordApproved"
                    onChange={(e) => setValueSecondPass(() => e.target.value)}
                  />
                </Form.Item>
              </Col>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Sign Up
                </Button>
              </Form.Item>
              <p className="policy">
                By clicking Sign Up I accept <span> Terms and Conditions</span> and confirm that I have read
                <span> Privacy Policy</span>
              </p>
            </Form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignUpToProject;

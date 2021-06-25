import React, { useState } from 'react';
import Layout from '../../components/LayoutGuest/Layout';
import { Form, Input, Button, Row, Col } from 'antd';
import './style.scss';
import { Logo4PV } from '../../components/icons';
import { Link } from 'react-router-dom';
import { ShowPassword } from '../../components/icons';

const LoginPage = (props) => {
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
      <ShowPassword />
    </div>
  );
  const suffixSecond = (
    <div className="showPassFirst" onClick={() => setShowPassSecond((prev) => !prev)}>
      <ShowPassword />
    </div>
  );
  return (
    <Layout isLogged={false} mode="login" className="login-page">
      <div className="wrapper">
        <div className="block_sign_up">
          <div className="block_wrapper">
            <div className="logo4pv">
              <Logo4PV />
            </div>
            <div className="up_in">
              <h2>Sign Up</h2>
              <h2>
                <Link to="/sign-in">Sign In</Link>
              </h2>
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
                <Form.Item label="Email" name="email">
                  <Input placeholder="Type your email" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Password"
                  name="passwordFirst"
                  rules={[
                    { min: 8, message: 'Password must be at least 8 characters!' },
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
                  rules={[
                    { min: 8, message: 'Password must be at least 8 characters!' },
                    { required: true, message: 'Please input your password!' },
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
                {/* <div className="showPassApproved">
                  <ShowPassword />
                </div> */}
              </Col>
              <Col span={24}>
                <Form.Item label="Organization Name" name="OrgName">
                  <Input placeholder="Type your organization name" type="text" />
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

export default LoginPage;

import React, { useState } from 'react';
import Layout from '../../components/LayoutGuest/Layout';
import { Form, Input, Button } from 'antd';
import './style.scss';
import { Logo4PV } from '../../components/icons';
import { Link } from 'react-router-dom';

const LoginPage = (props) => {
  const [form] = Form.useForm();
  const onFinishHandler = (values) => {
    console.log('values', values);
    form.resetFields();
  };
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
            <Form className="form-sign_up" form={form} layout="vertical" onFinish={onFinishHandler}>
              <Form.Item label="Email" name="email">
                <Input placeholder="Add your email" />
              </Form.Item>
              <Form.Item label="Password" name="password">
                <Input placeholder="Type your password" type="password" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;

import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import Layout from '../../components/LayoutGuest/Layout';
import { Logo4PV } from '../../components/icons';
import { Link, useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { actions } from '../../core/account/accountSlice';
import { useDispatch, useSelector } from 'react-redux';

import './style.scss';

const LoginPage = () => {
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const [form] = Form.useForm();
  const { logInAcc } = bindActionCreators(actions, dispatch);

  const onFinishHandler = ({ email, password }) => {
    setLoader(true);
    logInAcc({
      username: email,
      password,
    }).then((data) => {
      setLoader(false);
      if (data.error) {
        notification.error({
          message: data.error.message,
          description: 'Wrong login or password',
          duration: 3.5,
        });
        return;
      }
      history.push('/profile');
    });
  };
  return (
    <Layout isLogged={false} mode="login" className="login-page">
      <div className="wrapper">
        <div className="fl">
          <div className="form_login_block">
            <div className="logo4pv">
              <Logo4PV />
            </div>
            <div className="in_up">
              <h2>Sign In</h2>
              <h2>
                <Link to="/sign-up">Sign Up</Link>
              </h2>
            </div>
            <Form className="form-sign_in" form={form} layout="vertical" onFinish={onFinishHandler}>
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
                <Input placeholder="Add your email" />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { min: 8, message: 'Password must be at least 8 characters' },
                  { required: true, message: 'Please input your password' },
                ]}>
                <Input placeholder="Type your password" type="password" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loader}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
            <h3 className="forgot_pass">
              <Link to="/forgot-password/">Forgot your password?</Link>
            </h3>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;

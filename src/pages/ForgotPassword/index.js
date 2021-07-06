import React, { useState, useEffect } from 'react';
import Layout from '../../components/LayoutGuest/Layout';
import { Form, Input, Button } from 'antd';
import './style.scss';
import { Logo4PV } from '../../components/icons';
import { Link } from 'react-router-dom';

const ForgotPassword = (props) => {
  const [thanks, setThanks] = useState(false);
  const [form] = Form.useForm();
  const onFinish = (values) => {
    setThanks(() => true);
    console.log('values', values);
    form.resetFields();
  };

  useEffect(() => {
    return () => setThanks(() => false);
  }, []);
  return (
    <Layout isLogged={false} mode="login" className="login-page">
      <div className="wrapper">
        <div className="fl_recover">
          <div className="wrapp_form_back">
            <div className={`form_reset_block ${thanks && 'thanks'}`}>
              <div className="logo4pv">
                <Logo4PV />
              </div>
              {!thanks ? (
                <>
                  <div className="rec_pas">
                    <h2>Recover Password</h2>
                  </div>
                  <Form className="form-sign_in" form={form} layout="vertical" onFinish={onFinish}>
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
                    <Form.Item>
                      <Button htmlType="submit" type="primary">
                        Recover Password
                      </Button>
                    </Form.Item>
                  </Form>
                </>
              ) : (
                <>
                  <h2 className="thank-you">Thank you</h2>
                  <p className="link_email">If you have an account, we will email you link to reset password </p>
                  <Button type="primary">
                    <Link to="/" onClick={() => setThanks(() => false)}>
                      Back to Sign In
                    </Link>
                  </Button>
                </>
              )}
            </div>
            {!thanks && (
              <h3 className="back">
                <Link to="/">Back to sign in</Link>
              </h3>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;

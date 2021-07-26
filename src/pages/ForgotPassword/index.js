import React, { useState } from 'react';
import Layout from '../../components/LayoutGuest/Layout';
import { Form, Input, Button, notification } from 'antd';
import './style.scss';
import { Logo4PV } from '../../components/icons';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { actions } from '../../core/account/accountSlice';
import { useSelector, useDispatch } from 'react-redux';

const ForgotPassword = () => {
  const [thanks, setThanks] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { resetPassword } = bindActionCreators(actions, dispatch);
  const { passwordStatus } = useSelector((state) => state.account);

  const onFinish = ({ email }) => {
    resetPassword({
      email,
    }).then((data) => {
      if (data?.error?.message) {
        return notification.error({
          message: 'Notification Title',
          description: data.error.message,
          duration: 3.5,
        });
      } else {
        setThanks(() => true);
      }
    });
    form.resetFields();
  };

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
                  <Form className="form-resetPassword" form={form} layout="vertical" onFinish={onFinish}>
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
                      <Input placeholder="Type your email" />
                    </Form.Item>
                    <Form.Item>
                      <Button htmlType="submit" type="primary" style={{ marginTop: '5px' }}>
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

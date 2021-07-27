import React, { useState } from 'react';
import Layout from '../../components/LayoutGuest/Layout';
import { Form, Input, Button, notification } from 'antd';
import './style.scss';
import { Logo4PV } from '../../components/icons';
import { useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { actions } from '../../core/account/accountSlice';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ShowPassword, CloseToShowPassword } from '../../components/icons';

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { changeToNewPassword } = bindActionCreators(actions, dispatch);
  const { id } = useParams();

  const [valueSecondPass, setValueSecondPass] = useState('');
  const [valueThirdPass, setValueThirdPass] = useState('');

  const [showPassSecond, setShowPassSecond] = useState(false);
  const [showPassThird, setShowPassThird] = useState(false);

  const onFinish = ({ new_password }) => {
    setLoading(() => true);
    changeToNewPassword({
      hash: id,
      new_password,
    }).then((data) => {
      if (data?.error?.message) {
        return notification.error({
          description: data.error.message,
          duration: 3.5,
        });
      }
      if (!data.error) {
        notification.success({
          description: 'Password has been changed successfully',
          duration: 3.5,
        });
        history.push('/sign-in');
      }
    });
    setLoading(() => false);
  };

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
    <Layout isLogged={false} mode="login" className="login-page">
      <div className="wrapper">
        <div className="fl_recover">
          <div className="wrapp_form_back">
            <div className={`form_reset_block `}>
              <div className="logo4pv">
                <Logo4PV />
              </div>
              <div className="rec_pas">
                <h2>Reset Password</h2>
              </div>
              <Form className="form-resetPassword_hash" layout="vertical" onFinish={onFinish}>
                <Form.Item
                  label="Password"
                  name="password"
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
                <Form.Item
                  label="Repeat New Password"
                  name="new_password"
                  className="new_password_approved"
                  dependencies={['password']}
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your password',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
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
                <Form.Item>
                  <Button htmlType="submit" type="primary" style={{ marginTop: '5px' }} loading={loading}>
                    Reset Password
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResetPassword;

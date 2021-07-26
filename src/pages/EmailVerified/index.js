import React, { useState, useEffect } from 'react';
import Layout from '../../components/LayoutGuest/Layout';
import { Button, notification } from 'antd';
import './style.scss';
import { Logo4PV } from '../../components/icons';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { actions } from '../../core/account/accountSlice';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { LoaderSVG } from '../../components/icons';

const EmailVerified = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { verifyEmail } = bindActionCreators(actions, dispatch);
  const { id } = useParams();

  useEffect(() => {
    verifyEmail({
      hash: id,
    }).then((data) => {
      console.log('data from email', data);
      if (!data.error) setLoading(() => false);
      if (data.error) {
        notification.error({
          description: data.error.message,
        });
      }
    });
  }, []);

  return (
    <Layout isLogged={false} mode="login" className="login-page verify_email">
      <div className="wrapper">
        <div className="fl_recover">
          <div className="wrapp_form_back">
            <div className={`form_reset_block ${loading && 'load'}`}>
              <div className="logo4pv">
                <Logo4PV />
              </div>
              {loading ? (
                <div className="wrapper_spinner">
                  <LoaderSVG />
                </div>
              ) : (
                <>
                  <h2 className="thank-you">Thank you</h2>
                  <p className="link_email">Your email has been successfully verified</p>
                  <Button type="primary">
                    <Link to="/">Back to Sign In</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmailVerified;

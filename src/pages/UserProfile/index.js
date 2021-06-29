import React from 'react';
import Layout from '../../components/LayoutDashboard/Layout';
import './style.scss';
import { BackLeftSVG, SVG_Reload, SVG_delete } from '../../components/icons';

const UserProfile = () => {
  return (
    <Layout className="user_profile">
      <div className="wrapper">
        <div className="container_info">
          <div className="back">
            <div className="SVG_back" onClick={() => {}}>
              <BackLeftSVG />
            </div>
            <p>back</p>
          </div>
          <h2>Profile</h2>
          <div className="forms_container">
            <div className="form_profile">
              <div className="information">
                <h2>Profile information</h2>
              </div>
              <div className="blocks_wrapper">
                <div className="selfi_wrapper">
                  <div className="selfi">
                    <img
                      src="https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                      alt=""
                    />
                  </div>
                  <div className="change">
                    <div className="SVG_reload">
                      <SVG_Reload />
                      <p>Change</p>
                    </div>
                  </div>
                  <div className="delete">
                    <div className="SVG_delete">
                      <SVG_delete />
                      <p>Delete</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="form_password">form_password</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default UserProfile;

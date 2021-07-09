import React from 'react';
import './style.scss';
import { Question, ProfileDropDown, Logo4PV } from '../../../components/icons';

const Header = () => {
  return (
    <header>
      <div className="header_wrapper">
        <div className="logo">
          <div>
            <Logo4PV />
          </div>
        </div>
        <div className="block">
          <div className="solar">
            <h2>Go Solar</h2>
          </div>
          <div className="corner_container">
            <div className="question">
              <Question />
            </div>

            <div className="photo_drop">
              <div className="user_photo">
                <img
                  src="https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                  alt="photoOfUser"
                />
              </div>
              <div className="drop">
                <ProfileDropDown />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;

import React, { useState } from 'react';
import './style.scss';
import { Question, ProfileDropDown, Logo4PV, Pinion, QuestionOpen, SearchSVG } from '../icons';
import { Form, Input, Button, Col, Menu, Dropdown } from 'antd';
import { Link } from 'react-router-dom';

const menuProfile = (
  <Menu>
    <Menu.Item key="1">
      <h4>
        <Link to="/profile">View Profile</Link>
      </h4>
    </Menu.Item>
    <Menu.Item key="2">
      <h4>Sign Out</h4>
    </Menu.Item>
  </Menu>
);

const Header = ({ data }) => {
  const [questionOpen, setQuestionOpen] = useState(false);
  const suffix = (
    <div className="siffix_search_drop" style={{ cursor: 'pointer' }}>
      <SearchSVG />
    </div>
  );
  const [form] = Form.useForm();
  const onFinishHandler = (values) => {
    console.log('values', values);
    form.resetFields();
  };
  return (
    <header className="admin_header">
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
            {data && data.role.split('.')[1] === 'OWNER' && (
              <Link to="/admin-users-conf/" className="pinion">
                <Pinion />
              </Link>
            )}
            <Dropdown
              overlay={
                <div className="dropDown_block_question">
                  <Form className="search" form={form} layout="vertical" onFinish={onFinishHandler}>
                    <Col span={24}>
                      <Form.Item name="search_drop" className="search_drop">
                        <Input suffix={suffix} type="text" className="search_drop_input" />
                      </Form.Item>
                    </Col>
                  </Form>
                  <Menu>
                    <Menu.Item key="1">
                      <h4>How to create Project</h4>
                    </Menu.Item>
                    <Menu.Item key="2">
                      <h4>How to create project</h4>
                    </Menu.Item>
                  </Menu>
                  <h3 className="ticket">Add Ticket</h3>
                </div>
              }
              placement="bottomCenter"
              trigger={['click']}
              getPopupContainer={() => document.querySelector('.corner_container')}
              overlayClassName="dropMenuQuestion"
              visible={questionOpen}
              onVisibleChange={() => setQuestionOpen((prev) => !prev)}>
              <Button>
                <div className="question">{!questionOpen ? <Question /> : <QuestionOpen />}</div>
              </Button>
            </Dropdown>
            <Dropdown
              overlay={menuProfile}
              placement="bottomCenter"
              trigger={['click']}
              getPopupContainer={() => document.querySelector('.corner_container')}
              overlayClassName="dropMenuProfile">
              <Button>
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
              </Button>
            </Dropdown>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
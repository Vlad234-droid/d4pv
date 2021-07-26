import React, { useState } from 'react';
import { Form, Button, Input, Row, Col } from 'antd';
import './style.scss';
import { SearchSVG, CloseSVG } from '../../components/icons';
import ModalAddUser from './ModalAddUser';
import TableOfUsers from './TableOfUsers';
import LayoutConfiguration from '../../components/LayoutConfiguration/Layout';

const AdminUsersConfigurations = () => {
  const [form] = Form.useForm();
  const [searchValue, setSearchValue] = useState('');
  const [showAddUser, setShowAddUser] = useState(false);
  const [serchToggle, setSearchToggle] = useState(null);

  const onFinish = (values) => {
    console.log('values', values);
  };

  const SuffixSearch = <div className="suffix-search">{!serchToggle ? <SearchSVG /> : <CloseSVG />}</div>;

  return (
    <LayoutConfiguration>
      <div className="block_users" id="block_users">
        <ModalAddUser showAddUser={showAddUser} setShowAddUser={setShowAddUser} />
        <div className="title_users">
          <h2>Users</h2>
        </div>
        <div className="form_to_add">
          <Row>
            <Col span={4}>
              <Button
                type="primary"
                className="save_link"
                style={{ height: '40px' }}
                onClick={() => setShowAddUser(() => true)}>
                Add User
              </Button>
            </Col>
            <Col span={serchToggle ? 18 : 8} offset={serchToggle ? 2 : 12}>
              <div className="input_link">
                {SuffixSearch}
                <Input
                  placeholder="Search"
                  value={searchValue}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\s/g, '');

                    setSearchValue(value);
                  }}
                  onBlur={() => {
                    setSearchToggle(() => false);
                  }}
                  onFocus={(e) => {
                    setSearchToggle(true);
                  }}
                />
              </div>
            </Col>
          </Row>
        </div>
        <div>
          <TableOfUsers searchValue={searchValue} />
        </div>
      </div>
    </LayoutConfiguration>
  );
};
export default AdminUsersConfigurations;

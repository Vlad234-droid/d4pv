import React, { useState } from 'react';
import { Form, Button, Input, Row, Col } from 'antd';
import './style.scss';
import { SearchSVG, CloseSVG } from '../../components/icons';
import ModalAddUser from './ModalAddUser';
import TableOfUsers from './TableOfUsers';
import LayoutConfiguration from '../../components/LayoutConfiguration/Layout';
import { actions } from '../../core/visualization/visualizationSlice';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';

const AdminUsersConfigurations = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [searchValue, setSearchValue] = useState('');
  const [showAddUser, setShowAddUser] = useState(false);
  const [serchToggle, setSearchToggle] = useState(null);

  const { blurModal } = bindActionCreators(actions, dispatch);

  const onFinish = (values) => {
    console.log('values', values);
  };

  const SuffixSearch = <div className="suffix-search">{!serchToggle ? <SearchSVG /> : <CloseSVG />}</div>;

  return (
    <LayoutConfiguration>
      <div className="block_users" id="block_users">
        <ModalAddUser showAddUser={showAddUser} setShowAddUser={setShowAddUser} blurModal={blurModal} />
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
                onClick={() => {
                  blurModal(true);
                  setShowAddUser(() => true);
                }}>
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
                    // let value = e.target.value.replace(/\s/g, '');
                    let value = e.target.value;
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

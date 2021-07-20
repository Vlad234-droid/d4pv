import React, { useState } from 'react';
import { Form, Button, Input, Row, Col } from 'antd';
import './style.scss';
import { SearchSVG, CloseSVG } from '../../components/icons';
import ModalDeleteCompany from './ModalDeleteCompany';
import TableOfCompanies from './TableOfCompanies';
import LayoutConfiguration from '../../components/LayoutConfiguration/Layout';
import { useHistory } from 'react-router-dom';

const AdminCompaniesConfigurations = () => {
  const [form] = Form.useForm();
  const [showDeleteCompany, setShowDeleteCompany] = useState(false);
  const [serchToggle, setSearchToggle] = useState(false);
  const history = useHistory();
  const onFinish = (values) => {
    console.log('values', values);
  };

  const suffixSearch = (
    <div
      style={{ cursor: 'pointer', zIndex: '1000' }}
      data-suffix="suffix"
      onClick={(e) => {
        console.log('log from suffix', e.currentTarget);
      }}>
      {!serchToggle ? (
        <SearchSVG />
      ) : (
        <CloseSVG
          onClick={(e) => {
            console.log('log from suffix', e.currentTarget);
            setSearchToggle(false);
          }}
        />
      )}
    </div>
  );

  return (
    <LayoutConfiguration>
      <div className="block_companies" id="block_companies">
        <ModalDeleteCompany showDeleteCompany={showDeleteCompany} setShowDeleteCompany={setShowDeleteCompany} />

        <div className="title_users">
          <h2>Saved Companies</h2>
        </div>
        <div className="form_to_add">
          <Form form={form} className="create_user" onFinish={onFinish}>
            <Row>
              <Col span={4}>
                <Button
                  type="primary"
                  className="save_link"
                  style={{ height: '40px' }}
                  onClick={() => history.push('/admin-add-company-conf')}>
                  Add Company
                </Button>
              </Col>
              <Col span={serchToggle ? 18 : 8} offset={serchToggle ? 2 : 12}>
                <Form.Item name="search" className="input_link">
                  <Input
                    placeholder="Search"
                    suffix={suffixSearch}
                    onBlur={() => setSearchToggle(() => false)}
                    onClick={(e) => console.log('e from click', e)}
                    onFocus={(e) => {
                      console.log('e from blur', e.currentTarget);
                      setSearchToggle((prev) => !prev);
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
        <div>
          <TableOfCompanies setShowDeleteCompany={setShowDeleteCompany} />
        </div>
      </div>
    </LayoutConfiguration>
  );
};
export default AdminCompaniesConfigurations;

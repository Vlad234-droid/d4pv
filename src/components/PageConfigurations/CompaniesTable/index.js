import React, { useState } from 'react';
import { Form, Button, Input, Row, Col } from 'antd';
import './style.scss';
import { SearchSVG } from '../../icons';
import ModalAddCompany from './ModalAddCompany';
import ModalDeleteCompany from './ModalDeleteCompany';
import TableOfCompanies from './TableOfCompanies';

const CompaniesTable = () => {
  const [form] = Form.useForm();
  const [showAddCompany, setShowAddCompany] = useState(false);
  const [showDeleteCompany, setShowDeleteCompany] = useState(false);
  const [serchToggle, setSearchToggle] = useState(false);

  const onFinish = (values) => {
    console.log('values', values);
  };

  const suffixSearch = (
    <div style={{ cursor: 'pointer' }}>
      <SearchSVG />
    </div>
  );

  return (
    <div className="block_users" id="block_companies">
      <ModalAddCompany showAddCompany={showAddCompany} setShowAddCompany={setShowAddCompany} />
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
                htmlType="submit"
                className="save_link"
                style={{ height: '40px' }}
                onClick={() => setShowAddCompany(() => true)}>
                Add Company
              </Button>
            </Col>
            <Col span={serchToggle ? 18 : 8} offset={serchToggle ? 2 : 12}>
              <Form.Item name="search" className="input_link" onClick={() => setSearchToggle((prev) => !prev)}>
                <Input placeholder="Search" suffix={suffixSearch} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <div>
        <TableOfCompanies setShowDeleteCompany={setShowDeleteCompany} />
      </div>
    </div>
  );
};
export default CompaniesTable;

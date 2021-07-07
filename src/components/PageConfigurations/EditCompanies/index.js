import React, { useState } from 'react';
import { ArrowLeftBigSVG } from '../../icons';
import { Form, Input, Button, Row, Col } from 'antd';
import './style.scss';
import UploadCompanyLogo from './UploadCompanyLogo';

const EditCompanies = ({ setEditCompanyState }) => {
  const [form] = Form.useForm();
  const [logoUrl, setLogoUrl] = useState(null);
  const [edit, setEdit] = useState(false);

  const [extraAddress, setExtraAddress] = useState(false);

  const onFinishHandler = (values) => {
    console.log('values', values);
    form.resetFields();
  };

  return (
    <div className="container_add__company">
      <div className="head_block">
        <div className="arrow_left" onClick={() => setEditCompanyState((prev) => !prev)}>
          <ArrowLeftBigSVG />
        </div>
        <div>
          <h2>Add Contractor Company</h2>
        </div>
      </div>
      <Form className="form_add_company" form={form} layout="vertical" onFinish={onFinishHandler}>
        <Form.Item label="Logo" name="logo">
          <UploadCompanyLogo form={form} logoUrl={logoUrl} setLogoUrl={setLogoUrl} edit={edit} setEdit={setEdit} />
        </Form.Item>

        {/* //????//// */}
        <Row gutter={33}>
          <Col span={8}>
            <Form.Item label="Company Name" name="compName">
              <Input placeholder="" type="text" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Company Phone" name="compPhone">
              <Input placeholder="" type="text" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="License Number" name="licNumber">
              <Input placeholder="name" type="text" />
            </Form.Item>
          </Col>
        </Row>
        {/* //????//// */}
        <Row gutter={33}>
          <Col span={8}>
            <Form.Item label="Project Manager Full Name" name="p_m__name">
              <Input placeholder="" type="text" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Project Manager Phone Number" name="p_m_phone">
              <Input placeholder="" type="text" />
            </Form.Item>
          </Col>
        </Row>
        <div className="line">
          <hr />
        </div>
        <div className="after_line_block">
          <h2>Contractor Company Address</h2>
        </div>
        {/* //????//// */}

        <Row gutter={33} style={{ marginTop: '11px' }} className="row_address">
          <Col span={16}>
            <div className="extra" onClick={() => setExtraAddress((prev) => !prev)}>
              <span></span>
              <span>{`${!extraAddress ? 'Enter Manually' : 'Search Loaction'}`}</span>
            </div>
            <Form.Item label={`${!extraAddress ? 'Search Address' : 'Address Line #1'}`} name="searchAddress">
              <Input placeholder="" type="text" />
            </Form.Item>
          </Col>
          {extraAddress && (
            <Col span={8}>
              <Form.Item label="Address Line #2" name="address_l_2">
                <Input placeholder="" type="text" />
              </Form.Item>
            </Col>
          )}
        </Row>
        {extraAddress && (
          <Row gutter={33}>
            <Col span={8}>
              <Form.Item label="City" name="city">
                <Input placeholder="" type="text" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="State" name="state">
                <Input placeholder="" type="text" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="ZIP" name="zip">
                <Input placeholder="" type="text" />
              </Form.Item>
            </Col>
          </Row>
        )}

        {/* //????//// */}
        <Form.Item className="btns">
          <Row gutter={16}>
            <Col span={4}>
              <Button
                type="button"
                onClick={() => {
                  setExtraAddress(() => false);
                }}>
                Cancel
              </Button>
            </Col>
            <Col span={6}>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditCompanies;

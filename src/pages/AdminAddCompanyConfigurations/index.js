import React, { useState } from 'react';
import { ArrowLeftBigSVG, ArrowDownSelectSVG } from '../../components/icons';
import { Form, Input, Button, Row, Col, Select } from 'antd';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import './style.scss';
import UploadCompanyLogo from './UploadCompanyLogo';
import LayoutConfiguration from '../../components/LayoutConfiguration/Layout';
import { Link, useHistory } from 'react-router-dom';

const AdminCompanyInfoConf = () => {
  const [form] = Form.useForm();
  const [logoUrl, setLogoUrl] = useState(null);
  const [editCompanyLogo, setEditCompanyLogo] = useState(false);
  const history = useHistory();
  const [extraAddress, setExtraAddress] = useState(false);

  const onFinishHandler = (values) => {
    form.resetFields();
    setEditCompanyLogo(() => false);
    history.push('/admin-companies-conf');
  };

  const onGenderChange = (value) => {
    console.log('value', value);
  };

  const suffixIcon = (
    <div style={{ zIndex: '-2' }}>
      <ArrowDownSelectSVG />
    </div>
  );

  return (
    <LayoutConfiguration>
      <div className="container_add__company add">
        <div className="head_block">
          <Link to="/admin-companies-conf">
            <div className="arrow_left">
              <ArrowLeftBigSVG />
            </div>
          </Link>

          <div>
            <h2>Add Contractor Company</h2>
          </div>
        </div>
        <Form className="form_add_company add_comp" form={form} layout="vertical" onFinish={onFinishHandler}>
          <Form.Item label="Logo" name="logo">
            <UploadCompanyLogo
              form={form}
              logoUrl={logoUrl}
              setLogoUrl={setLogoUrl}
              editCompanyLogo={editCompanyLogo}
              setEditCompanyLogo={setEditCompanyLogo}
            />
          </Form.Item>

          {/* //????//// */}
          <Row gutter={33}>
            <Col span={8}>
              <Form.Item label="Company Name" name="compname">
                <Input placeholder="" type="text" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Company Phone" name="compphone">
                <Input placeholder="" type="number" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="License Number" name="licnumber">
                <Input placeholder="" type="text" />
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
                <Input placeholder="" type="number" />
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
                <span>{`${!extraAddress ? 'Enter Manually' : 'Search Loaction'}`}</span>
              </div>
              <Form.Item label={`${!extraAddress ? 'Search Address' : 'Address Line #1'}`} name="searchaddress">
                <Input placeholder="" type="text" />
                {/* <GooglePlacesAutocomplete /> */}
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
                  <Select placeholder="Select State" onChange={onGenderChange} suffixIcon={suffixIcon}>
                    <Select.Option value="male">male</Select.Option>
                    <Select.Option value="female">female</Select.Option>
                    <Select.Option value="other">other</Select.Option>
                  </Select>
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
                    setEditCompanyLogo(() => false);
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
    </LayoutConfiguration>
  );
};

export default AdminCompanyInfoConf;

import React, { useState, useEffect } from 'react';
import { ArrowDownSelectSVG } from '../../../components/icons';
import { Form, Input, Button, Row, Col, Select } from 'antd';
import './style.scss';
import UploadCompanyLogo from '../UploadCompanyLogo';

const GeneralInformationTab = ({ editMode, dataSource, setDataSource, setEditMode }) => {
  const [form] = Form.useForm();
  const [logoUrl, setLogoUrl] = useState(null);
  const [editCompanyLogo, setEditCompanyLogo] = useState(false);

  const [extraAddress, setExtraAddress] = useState(false);

  const onFinishHandler = (values) => {
    console.log('values', values);
    setDataSource(() => ({
      ...values,
    }));
    form.resetFields();
    setEditMode(() => false);
    setEditCompanyLogo(() => false);
  };

  const onGenderChange = (value) => {
    console.log('value', value);
  };

  const suffixIcon = (
    <div style={{ zIndex: '-2' }}>
      <ArrowDownSelectSVG />
    </div>
  );
  const attr = (value) => {
    if (editMode)
      return {
        name: value,
      };
  };

  const dashCheck = (value) => {
    if (value === undefined) return '-';
    return value;
  };

  return (
    <Form
      className={`form_info_company info ${editMode && 'editMode'}`}
      form={form}
      layout="vertical"
      onFinish={onFinishHandler}>
      <Form.Item label="Logo" name="logo">
        <UploadCompanyLogo
          dataSource={dataSource}
          form={form}
          logoUrl={logoUrl}
          setLogoUrl={setLogoUrl}
          editCompanyLogo={editCompanyLogo}
          setEditCompanyLogo={setEditCompanyLogo}
          editMode={editMode}
        />
      </Form.Item>

      {/* //????//// */}
      <Row gutter={33}>
        <Col span={8}>
          <Form.Item label="Company Name" {...attr('name')}>
            {editMode ? <Input placeholder="" type="text" /> : <h3>{dashCheck(dataSource.name)}</h3>}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Company Phone" {...attr('phone')}>
            {editMode ? <Input placeholder="" type="number" /> : <h3>{dashCheck(dataSource.phone)}</h3>}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="License Number" {...attr('license')}>
            {editMode ? <Input placeholder="" type="text" /> : <h3>{dashCheck(dataSource.license)}</h3>}
          </Form.Item>
        </Col>
      </Row>

      {/* //????//// */}
      <Row gutter={33}>
        <Col span={8}>
          <Form.Item label="Project Manager Full Name" {...attr('pm_name')}>
            {editMode ? <Input placeholder="" type="text" /> : <h3>{dashCheck(dataSource.pm_name)}</h3>}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Project Manager Phone Number" {...attr('pm_phone')}>
            {editMode ? <Input placeholder="" type="number" /> : <h3>{dashCheck(dataSource.pm_phone)}</h3>}
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
            <span>{`${!editMode ? '' : !extraAddress ? 'Enter Manually' : 'Search Loaction'}`}</span>
          </div>
          <Form.Item
            label={`${!editMode ? 'Address' : !extraAddress ? 'Search Address' : 'Address Line #1'}`}
            {...attr('address')}>
            {editMode ? (
              <Input placeholder="" type="text" />
            ) : extraAddress ? (
              <div className="address_column">
                <h3>
                  Address: {dataSource.address.state} {dataSource.address.city}
                </h3>
                <h3>
                  {dataSource.address.address_line1} {dataSource.address.zip}
                </h3>
              </div>
            ) : (
              <h3>{dataSource.address}</h3>
            )}
          </Form.Item>
        </Col>
        {editMode
          ? extraAddress && (
              <Col span={8}>
                <Form.Item label="Address Line #2" {...attr('address_l_2')}>
                  <Input placeholder="" type="text" />
                </Form.Item>
              </Col>
            )
          : ''}
      </Row>
      {editMode
        ? extraAddress && (
            <Row gutter={33}>
              <Col span={8}>
                <Form.Item label="City" {...attr('city')}>
                  <Input placeholder="" type="text" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="State" {...attr('state')}>
                  <Select placeholder="Select State" onChange={onGenderChange} suffixIcon={suffixIcon}>
                    <Select.Option value="male">male</Select.Option>
                    <Select.Option value="female">female</Select.Option>
                    <Select.Option value="other">other</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="ZIP" {...attr('zip')}>
                  <Input placeholder="" type="text" />
                </Form.Item>
              </Col>
            </Row>
          )
        : ''}

      {/* //????//// */}
      {editMode && (
        <Form.Item className="btns">
          <Row gutter={16}>
            <Col span={4}>
              <Button
                type="button"
                onClick={() => {
                  setExtraAddress(() => false);
                  setEditMode(() => false);
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
      )}
    </Form>
  );
};

export default GeneralInformationTab;

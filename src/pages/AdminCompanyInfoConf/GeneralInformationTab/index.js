import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { ArrowDownSelectSVG } from '../../../components/icons';
import { Form, Input, Button, Row, Col, Select, notification } from 'antd';
import InputMask from 'react-input-mask';
import UploadCompanyLogo from '../UploadCompanyLogo';
import GooglePlaces from '../../../components/GooglePlaces';
import { actions } from '../../../core/companies/companiesSlice';

import './style.scss';

const GeneralInformationTab = ({ editMode, dataSource, setEditMode }) => {
  const [form] = Form.useForm();
  const [logoUrl, setLogoUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editCompanyLogo, setEditCompanyLogo] = useState(false);
  const [extraAddress, setExtraAddress] = useState(true);
  const dispatch = useDispatch();
  const { updateCompanieData, getCompanieData } = bindActionCreators(actions, dispatch);

  const onFinishHandler = (values) => {
    const result = {
      name: values.name,
      phone: values.phone,
      license: values.license,
      pm_name: values.pm_name,
      pm_phone: values.pm_phone,
      address: {
        city: values.city,
        state: values.state,
        zip_code: values.zip_code,
        address_line1: values.address_line1,
        address_line2: values.address_line2,
      },
    };
    setLoading(true);
    updateCompanieData({ company_id: dataSource.id, body: result }).then((data) => {
      setLoading(false);
      if (!data.error) {
        getCompanieData(dataSource.id).then((data) => {
          notification.success({
            //message: 'Notification Title',
            description: 'The company was updated successfully',
            duration: 3.5,
          });
          setEditMode(false);
        });
      }
    });
    // setEditMode(() => false);
    // setEditCompanyLogo(() => false);
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
      initialValues={{
        name: dataSource.name,
        phone: dataSource.phone,
        license: dataSource.license,
        pm_name: dataSource.pm_name,
        pm_phone: dataSource.pm_phone,
        city: dataSource.address.city,
        state: dataSource.address.state,
        zip: dataSource.address.zip,
        address_line1: dataSource.address.address_line1,
        address_line2: dataSource.address.address_line2,
      }}
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
          <Form.Item
            label="Company Name"
            {...attr('name')}
            rules={[
              {
                required: true,
                message: 'Please input Company Name',
              },
            ]}>
            {editMode ? <Input placeholder="" type="text" /> : <h3>{dashCheck(dataSource.name)}</h3>}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Company Phone"
            {...attr('phone')}
            rules={[
              {
                required: true,
                message: 'Please input Company Phone',
              },
              () => ({
                validator(_, value) {
                  if (value.replace(/\s/g, '').length > 12) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Please input current Company Phone'));
                },
              }),
            ]}>
            {editMode ? (
              <InputMask
                className="ant-input"
                mask="+999999999999"
                maskChar=" "
                onChange={(e) => console.log(e.target.value)}>
                {(inputProps) => <Input {...inputProps} type="tel" />}
              </InputMask>
            ) : (
              <h3>{dashCheck(dataSource.phone)}</h3>
            )}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="License Number"
            {...attr('license')}
            rules={[
              {
                required: true,
                message: 'Please input License Number',
              },
            ]}>
            {editMode ? <Input placeholder="" type="text" /> : <h3>{dashCheck(dataSource.license)}</h3>}
          </Form.Item>
        </Col>
      </Row>

      {/* //????//// */}
      <Row gutter={33}>
        <Col span={8}>
          <Form.Item
            label="Project Manager Full Name"
            {...attr('pm_name')}
            rules={[
              {
                required: true,
                message: 'Please input Project Manager Full Name',
              },
            ]}>
            {editMode ? <Input placeholder="" type="text" /> : <h3>{dashCheck(dataSource.pm_name)}</h3>}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Project Manager Phone Number"
            {...attr('pm_phone')}
            rules={[
              {
                required: true,
                message: 'Please input Project Manager Phone Number',
              },
              () => ({
                validator(_, value) {
                  if (value.replace(/\s/g, '').length > 12) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Please input current Project Manager Phone Number'));
                },
              }),
            ]}>
            {editMode ? (
              <InputMask className="ant-input" mask="+999999999999" maskChar=" ">
                {(inputProps) => <Input {...inputProps} type="tel" />}
              </InputMask>
            ) : (
              <h3>{dashCheck(dataSource.pm_phone)}</h3>
            )}
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

      {/* <Row gutter={33} style={{ marginTop: '11px' }} className="row_address">
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
              <h3>
                {dataSource.address.state} {dataSource.address.city} {dataSource.address.address_line1}
                {dataSource.address.zip}
              </h3>
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
        : ''} */}

      {!editMode ? (
        <div className="companie__details_adress">
          {dataSource.address.state} {dataSource.address.city} {dataSource.address.address_line1}
          {dataSource.address.zip}
        </div>
      ) : (
        <GooglePlaces
          extraAddress={extraAddress}
          setExtraAddress={setExtraAddress}
          onGenderChange={onGenderChange}
          form={form}
        />
      )}

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
              <Button type="primary" htmlType="submit" loading={loading}>
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

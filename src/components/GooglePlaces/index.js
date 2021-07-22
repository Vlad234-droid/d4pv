import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Select } from 'antd';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

import { ArrowDownSelectSVG } from '../../components/icons';

const GooglePlaces = ({ extraAddress, setExtraAddress, onGenderChange }) => {
  const suffixIcon = (
    <div style={{ zIndex: '-2' }}>
      <ArrowDownSelectSVG />
    </div>
  );

  return (
    <>
      <Row gutter={33} style={{ marginTop: '11px' }} className="row_address">
        <Col span={16}>
          <div className="extra" onClick={() => setExtraAddress((prev) => !prev)}>
            <span>{`${!extraAddress ? 'Enter Manually' : 'Search Loaction'}`}</span>
          </div>
          <Form.Item label={`${!extraAddress ? 'Search Address' : 'Address Line #1'}`} name="searchaddress">
            {extraAddress ? (
              <Input placeholder="" type="text" />
            ) : (
              <div className="places-autocomplete">
                <GooglePlacesAutocomplete
                  apiKey="AIzaSyC64Luyo5HsYvMO9uC4urUIydVbugILszw"
                  // autocompletionRequest={{
                  //   types: ['address'],
                  // }}
                  selectProps={{
                    onChange: (e) => {
                      console.log(e);
                    },
                  }}
                />
              </div>
            )}
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
    </>
  );
};

export default GooglePlaces;

import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Row, Col, Select } from 'antd';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

import { ArrowDownSelectSVG } from '../../components/icons';

import { statesList } from './config';

const GooglePlaces = ({ extraAddress, setExtraAddress, onGenderChange, form }) => {
  const [service, setService] = useState(null);

  const suffixIcon = (
    <div style={{ zIndex: '-2' }}>
      <ArrowDownSelectSVG />
    </div>
  );

  // let map;
  // let service;
  // let infowindow;

  useEffect(() => {
    const places = new window.google.maps.places.PlacesService(document.getElementById('map'));
    setService(places);
  }, []);

  const onSelect = (e) => {
    var request = {
      placeId: e.value.place_id,
    };
    service.getDetails(request, callback);
  };

  function callback(results, status) {
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      const result = results.address_components;
      const street = result.filter((item) => item.types[0] === 'street_number');
      const route = result.filter((item) => item.types[0] === 'route');
      const administrative_area_level_2 = result.filter((item) => item.types[0] === 'administrative_area_level_2');
      const locality = result.filter((item) => item.types[0] === 'locality');
      const administrative_area_level_1 = result.filter((item) => item.types[0] === 'administrative_area_level_1');
      const postalCode = result.filter((item) => item.types[0] === 'postal_code');

      const address_line1 = `${street.length ? street[0].long_name : ''} ${route.length ? route[0].long_name : ''}`;
      const address_line2 = `${administrative_area_level_2.length ? administrative_area_level_2[0].long_name : ''}`;
      const city = `${locality.length ? locality[0].long_name : ''}`;
      const state = `${administrative_area_level_1.length ? administrative_area_level_1[0].short_name : ''}`;
      const zip_code = `${postalCode.length ? postalCode[0].long_name : ''}`;
      const zipTrim = zip_code;
      // .replace(/\s+/g, '')
      form.setFieldsValue({
        address_line1: address_line1,
        address_line2: address_line2,
        city: city,
        state: state,
        zip_code: zip_code,
      });
      setExtraAddress(true);
    }
  }

  return (
    <>
      <div id="map" style={{ display: 'none' }}></div>
      <Row gutter={33} style={{ marginTop: '11px' }} className="row_address">
        <Col span={16}>
          <div className="extra" onClick={() => setExtraAddress((prev) => !prev)}>
            <span>{`${!extraAddress ? 'Enter Manually' : 'Search Loaction'}`}</span>
          </div>
          <Form.Item
            label={`${!extraAddress ? 'Search Address' : 'Address Line #1'}`}
            name="address_line1"
            rules={[
              {
                required: true,
                message: 'Please input Address',
              },
            ]}>
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
                    onChange: onSelect,
                    menuPlacement: 'top',
                  }}
                />
              </div>
            )}
          </Form.Item>
        </Col>
        {extraAddress && (
          <Col span={8}>
            <Form.Item label="Address Line #2" name="address_line2">
              <Input placeholder="" type="text" />
            </Form.Item>
          </Col>
        )}
      </Row>
      {extraAddress && (
        <Row gutter={33}>
          <Col span={8}>
            <Form.Item
              label="City"
              name="city"
              rules={[
                {
                  required: true,
                  message: 'Please input City',
                },
              ]}>
              <Input placeholder="" type="text" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="State"
              name="state"
              rules={[
                {
                  required: true,
                  message: 'Please select State',
                },
              ]}>
              <Select placeholder="Select State" onChange={onGenderChange} suffixIcon={suffixIcon}>
                {statesList.map((item) => (
                  <Select.Option key={item['alpha-2']} value={item['alpha-2']}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="ZIP"
              name="zip_code"
              rules={[
                {
                  required: true,
                  message: 'Please input ZIP Code',
                },
              ]}>
              <Input placeholder="" type="text" />
            </Form.Item>
          </Col>
        </Row>
      )}
    </>
  );
};

export default GooglePlaces;

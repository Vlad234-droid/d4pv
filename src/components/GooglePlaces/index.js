import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Row, Col, Select } from 'antd';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

import { ArrowDownSelectSVG } from '../../components/icons';

import { statesList } from './config';

const GooglePlaces = ({ extraAddress, setExtraAddress, onGenderChange }) => {
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
    console.log('statesList', statesList);
  }, []);

  const onSelect = (e) => {
    var request = {
      placeId: e.value.place_id,
    };
    console.log('service', service);
    service.getDetails(request, callback);
  };

  function callback(results, status) {
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      console.log(results);
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
                    onChange: onSelect,
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
                {statesList.map((item) => (
                  <Select.Option key={item['alpha-2']} value={item['alpha-2']}>
                    {item.name}
                  </Select.Option>
                ))}
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

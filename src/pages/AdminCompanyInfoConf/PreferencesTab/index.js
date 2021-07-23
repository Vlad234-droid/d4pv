import React, { useState } from 'react';
import './style.scss';
import { Form, Select, Button, Row, Col, Input } from 'antd';
import { EditCompanySVG, ArrowDownSelectSVG } from '../../../components/icons';

import { useEffect } from 'react';

import { preferences } from './config';

const PreferencesTab = () => {
  const [formProperty] = Form.useForm();
  const [formPVSystem] = Form.useForm();
  const [modeProperty, setModePropert] = useState(false);
  const [modePVSystem, setModePVSystem] = useState(false);
  const [testArray, setTestArray] = useState({});
  const [time, setTime] = useState('');

  const suffixIcon = (
    <div style={{ zIndex: '-2' }}>
      <ArrowDownSelectSVG />
    </div>
  );

  useEffect(() => {
    const now = Date.now();
    const data = new Date(now);
    let year = data.getFullYear();
    let day = data.getDate();
    let month = data.getMonth();
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;
    let fullTime = `${day}.${month}.${year}`;

    setTime(() => fullTime);
  }, []);

  const onFinishProperty = ({ ahj, parcel_number, utility }) => {
    setTestArray((prev) => ({
      ...prev,
      ahj,
      parcel_number,
      utility,
    }));
    formProperty.resetFields();
    setModePropert(() => false);
  };

  const onFinishPVSystem = ({ grid_type, service_voltage, conductor }) => {
    setTestArray((prev) => ({
      ...prev,
      grid_type,
      service_voltage,
      conductor,
    }));
    formPVSystem.resetFields();
    setModePVSystem(() => false);
  };
  const attr = (value, form) => {
    if (form !== undefined && form.__INTERNAL__.name === 'form_property_information' && modeProperty)
      return {
        name: value,
      };
    if (form !== undefined && form.__INTERNAL__.name === 'form_system_information' && modePVSystem)
      return {
        name: value,
      };
  };

  const dashCheck = (value) => {
    if (value === undefined) return '-';
    return value;
  };

  return (
    <div className="preferences_tab">
      <Form
        className={`form_property_information`}
        name="form_property_information"
        form={formProperty}
        layout="vertical"
        onFinish={onFinishProperty}>
        {preferences.map((item, index) => (
          <div className="information" key={`information-${item.id}`}>
            {index === 0 && !modeProperty && (
              <div className="switch_mode" onClick={() => setModePropert(() => true)}>
                <div>
                  <EditCompanySVG />
                </div>
              </div>
            )}
            <h3>{item.title}</h3>
            <p className="updated">????{time} by James Smith????</p>

            <Row gutter={33}>
              {item.params.map((param) => (
                <Col span={12} key={param.name}>
                  <Form.Item label={param.title} name={param.name}>
                    {modeProperty ? (
                      param.options ? (
                        <Select placeholder={param.placeholder} suffixIcon={suffixIcon}>
                          {param.options?.map((option) => (
                            <Select.Option value={option.value}>{option.label}</Select.Option>
                          ))}
                        </Select>
                      ) : (
                        <Input placeholder={param.placeholder} type="number" />
                      )
                    ) : (
                      <h3>{dashCheck(testArray.ahj)}</h3>
                    )}
                  </Form.Item>
                </Col>
              ))}
            </Row>
          </div>
        ))}

        {modeProperty && (
          <Form.Item className="btns">
            <Row gutter={16}>
              <Col span={4}>
                <Button type="button" onClick={() => setModePropert(() => false)}>
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
    </div>
  );
};

export default PreferencesTab;

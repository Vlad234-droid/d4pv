import React, { useState } from 'react';
import './style.scss';
import { Form, Input, Button, Row, Col } from 'antd';
import { EditCompanySVG } from '../../../components/icons';
import { useEffect } from 'react';

const PreferencesTab = () => {
  const [formProperty] = Form.useForm();
  const [formPVSystem] = Form.useForm();
  const [modeProperty, setModePropert] = useState(false);
  const [modePVSystem, setModePVSystem] = useState(false);
  const [testArray, setTestArray] = useState({});
  const [time, setTime] = useState('');

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
      <div className="information">
        {!modeProperty && (
          <div className="switch_mode" onClick={() => setModePropert(() => true)}>
            <div>
              <EditCompanySVG />
            </div>
          </div>
        )}
        <h3>Property Information</h3>
        <p className="updated">{time} by James Smith</p>
        <Form
          className={`form_property_information`}
          name="form_property_information"
          form={formProperty}
          layout="vertical"
          onFinish={onFinishProperty}>
          <Row gutter={33}>
            <Col>
              <Form.Item label="AHJ" {...attr('ahj', formProperty)}>
                {modeProperty ? <Input placeholder="" type="text" /> : <h3>{dashCheck(testArray.ahj)}</h3>}
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="Project’s Assesssor’s Parcel Number" {...attr('parcel_number', formProperty)}>
                {modeProperty ? <Input placeholder="" type="text" /> : <h3>{dashCheck(testArray.parcel_number)}</h3>}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Item label="Utility" {...attr('utility', formProperty)}>
                {modeProperty ? <Input placeholder="" type="text" /> : <h3>{dashCheck(testArray.utility)}</h3>}
              </Form.Item>
            </Col>
          </Row>
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
      <div className="line" style={{ marginTop: `${modeProperty ? '25.5px' : '0px'}` }}>
        <hr />
      </div>

      <div className="information">
        {!modePVSystem && (
          <div className="switch_mode" onClick={() => setModePVSystem(() => true)}>
            <div>
              <EditCompanySVG />
            </div>
          </div>
        )}
        <h3>PV System Parameters</h3>
        <p className="updated">{time} by James Smith</p>
        <Form
          className={`form_system_information`}
          form={formPVSystem}
          layout="vertical"
          onFinish={onFinishPVSystem}
          name="form_system_information">
          <Row gutter={33}>
            <Col>
              <Form.Item label="Grid Type" {...attr('grid_type', formPVSystem)}>
                {modePVSystem ? <Input placeholder="" type="text" /> : <h3>{dashCheck(testArray.grid_type)}</h3>}
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="Project’s Assesssor’s Parcel Number" {...attr('service_voltage', formPVSystem)}>
                {modePVSystem ? <Input placeholder="" type="text" /> : <h3>{dashCheck(testArray.service_voltage)}</h3>}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Item label="Grounding Electrode Conductor" {...attr('conductor', formPVSystem)}>
                {modePVSystem ? <Input placeholder="" type="text" /> : <h3>{dashCheck(testArray.conductor)}</h3>}
              </Form.Item>
            </Col>
          </Row>
          {modePVSystem && (
            <Form.Item className="btns">
              <Row gutter={16}>
                <Col span={4}>
                  <Button type="button" onClick={() => setModePVSystem(() => false)}>
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
      <div className="line" style={{ marginTop: `${modePVSystem ? '25.5px' : '0px'}` }}>
        <hr />
      </div>
    </div>
  );
};

export default PreferencesTab;

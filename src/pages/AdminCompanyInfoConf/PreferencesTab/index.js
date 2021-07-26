import React, { useState } from 'react';
import './style.scss';
import { Form, Select, Button, Row, Col, Input, Skeleton, notification } from 'antd';
import { EditCompanySVG, ArrowDownSelectSVG } from '../../../components/icons';

import { actions } from '../../../core/companies/companiesSlice';

import { useEffect } from 'react';

import { preferences } from './config';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

const PreferencesTab = ({ companyId }) => {
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState(null);
  const [mode, setModePropert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState('');
  const dispatch = useDispatch();
  const { getCompanyPreferences, updateCompanyPreferences } = bindActionCreators(actions, dispatch);

  const suffixIcon = (
    <div style={{ zIndex: '-2' }}>
      <ArrowDownSelectSVG />
    </div>
  );

  useEffect(() => {
    getCompanyPreferences(companyId).then((data) => {
      const result = {};
      if (!data.error) {
        data.payload.forEach((item) => {
          result[item.key] = item.value;
        });
      }
      setInitialValues(result);
    });
  }, []);

  const onFinish = (values) => {
    const results = [];
    for (let i in values) {
      if (values[i]) {
        results.push({
          key: i,
          value: values[i],
        });
      }
    }
    setLoading(true);
    updateCompanyPreferences({
      company_id: companyId,
      body: results,
    }).then((data) => {
      if (!data.error) {
        notification.success({
          description: 'Information has been updated',
          duration: 3.5,
        });
        setModePropert(false);
      }
      setLoading(false);
    });
  };

  const dashCheck = (value) => {
    if (value === undefined) return '-';
    return value;
  };

  return (
    <div className="preferences_tab">
      {!initialValues ? (
        <>
          <Skeleton active />
          <Skeleton active />
        </>
      ) : (
        <Form
          className={`form_property_information`}
          name="form_property_information"
          form={form}
          initialValues={initialValues}
          layout="vertical"
          onFinish={onFinish}>
          {preferences.map((item, index) => (
            <div className="information" key={`information-${item.id}`}>
              {index === 0 && !mode && (
                <div className="switch_mode" onClick={() => setModePropert(() => true)}>
                  <div>
                    <EditCompanySVG />
                  </div>
                </div>
              )}
              <h3>{item.title}</h3>
              {/* <p className="updated">????{time} by James Smith????</p> */}

              <Row gutter={33}>
                {item.params.map((param) => (
                  <Col span={12} key={param.name}>
                    <Form.Item label={param.title} name={param.name}>
                      {mode ? (
                        param.options ? (
                          <Select placeholder={param.placeholder} suffixIcon={suffixIcon}>
                            {param.options?.map((option) => (
                              <Select.Option key={option.value} value={option.value}>
                                {option.label}
                              </Select.Option>
                            ))}
                          </Select>
                        ) : (
                          <Input placeholder={param.placeholder} type="number" />
                        )
                      ) : (
                        <h3>{initialValues[param.name] ? initialValues[param.name] : '--'}</h3>
                      )}
                    </Form.Item>
                  </Col>
                ))}
              </Row>
            </div>
          ))}

          {mode && (
            <Form.Item className="btns">
              <Row gutter={16}>
                <Col span={4}>
                  <Button type="button" onClick={() => setModePropert(() => false)}>
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
      )}
    </div>
  );
};

export default PreferencesTab;

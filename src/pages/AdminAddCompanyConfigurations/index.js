import React, { useState, useEffect } from 'react';
import { ArrowLeftBigSVG } from '../../components/icons';
import { Form, Input, Button, Row, Col, Select, notification } from 'antd';
import InputMask from 'react-input-mask';
import './style.scss';
import UploadCompanyLogo from './UploadCompanyLogo';
import LayoutConfiguration from '../../components/LayoutConfiguration/Layout';
import { Link, useHistory } from 'react-router-dom';
import GooglePlaces from '../../components/GooglePlaces';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { actions } from '../../core/configurations/configurationsSlice';

const AdminCompanyInfoConf = () => {
  const dispatch = useDispatch();
  const { createCompany } = bindActionCreators(actions, dispatch);
  const [form] = Form.useForm();
  const [logoUrl, setLogoUrl] = useState(null);
  const [phone, setPhone] = useState();
  const [loading, setLoading] = useState(false);
  const [editCompanyLogo, setEditCompanyLogo] = useState(false);
  const history = useHistory();
  const [extraAddress, setExtraAddress] = useState(false);

  const onFinishHandler = (values) => {
    console.log('values,', values);
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
      image: values.image,
    };

    setLoading(true);
    createCompany(result).then((data) => {
      setLoading(false);
      if (!data.error) {
        notification.success({
          //message: 'Notification Title',
          description: 'The company was added successfully',
          duration: 3.5,
        });
        history.push('/admin-companies-conf/');
      }
    });
  };

  const onGenderChange = (value) => {
    console.log('value', value);
  };

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
          {/* //////// */}

          {/* //////// */}
        </div>
        <Form className="form_add_company add_comp" form={form} layout="vertical" onFinish={onFinishHandler}>
          <Form.Item
            name="image"
            rules={[
              {
                required: true,
                message: 'Please upload your image',
              },
            ]}>
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
              <Form.Item
                label="Company Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Please input Company Name',
                  },
                ]}>
                <Input placeholder="" type="text" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Company Phone"
                name="phone"
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
                <InputMask
                  className="ant-input"
                  mask="+999999999999"
                  maskChar=" "
                  onChange={(e) => console.log(e.target.value)}>
                  {(inputProps) => <Input {...inputProps} type="tel" />}
                </InputMask>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="License Number"
                name="license"
                rules={[
                  {
                    required: true,
                    message: 'Please input License Number',
                  },
                ]}>
                <Input placeholder="" type="text" />
              </Form.Item>
            </Col>
          </Row>

          {/* //????//// */}
          <Row gutter={33}>
            <Col span={8}>
              <Form.Item
                label="Project Manager Full Name"
                name="pm_name"
                rules={[
                  {
                    required: true,
                    message: 'Please input Project Manager Full Name',
                  },
                ]}>
                <Input placeholder="" type="text" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Project Manager Phone Number"
                name="pm_phone"
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
                <InputMask className="ant-input" mask="+999999999999" maskChar=" ">
                  {(inputProps) => <Input {...inputProps} type="tel" />}
                </InputMask>
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
          <GooglePlaces
            extraAddress={extraAddress}
            setExtraAddress={setExtraAddress}
            onGenderChange={onGenderChange}
            form={form}
          />
          {/* //????//// */}
          <Form.Item className="btns">
            <Row gutter={16}>
              <Col span={4}>
                <Button
                  type="button"
                  onClick={() => {
                    history.push('/admin-companies-conf/');
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
        </Form>
      </div>
    </LayoutConfiguration>
  );
};

export default AdminCompanyInfoConf;

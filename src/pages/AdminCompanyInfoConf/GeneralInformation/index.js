import React, { useState, useEffect } from 'react';
import { ArrowDownSelectSVG } from '../../../components/icons';
import { Form, Input, Button, Row, Col, Select } from 'antd';
import './style.scss';
import UploadCompanyLogo from '../UploadCompanyLogo';
import { useParams } from 'react-router-dom';

const GeneralInformation = ({ setTestArray, editMode, testArray, setEditMode }) => {
  const [form] = Form.useForm();
  const [logoUrl, setLogoUrl] = useState(null);
  const [editCompanyLogo, setEditCompanyLogo] = useState(false);
  const { id } = useParams();
  const [dataSource, setDataSource] = useState([
    {
      key: 1,
      logo: (
        <div className="logo">
          <img
            src="https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            alt="logo"
          />
        </div>
      ),
      company_name: 'SunPower by Test',
      company_phone: '+46328746',
      address: 'Lviv Leniana 49 SunPower by Test SunPower by Test',
    },
    {
      key: 2,
      logo: (
        <div className="logo">
          <img
            src="https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            alt="logo"
          />
        </div>
      ),
      company_name: 'SunPower by Kamtech Solar',
      company_phone: '+243123412',
      address: 'Kyiv lomonosova 678',
    },
    {
      key: 3,
      logo: (
        <div className="logo">
          <img
            src="https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            alt="logo"
          />
        </div>
      ),
      company_name: 'Sun Royale shine ',
      company_phone: '+467839',
      address: 'The center of City',
    },
  ]);

  const [extraAddress, setExtraAddress] = useState(false);

  useEffect(() => {
    const data = dataSource
      .filter((item) => item.key === Number(id))
      .map((item) => ({
        compname: item.company_name,
        compphone: item.company_phone,
        searchaddress: item.address,
      }));
    setTestArray(() => ({
      ...data[0],
    }));
  }, []);

  const onFinishHandler = (values) => {
    setTestArray(() => ({
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
      className={`form_add_company ${editMode && 'editMode'}`}
      form={form}
      layout="vertical"
      onFinish={onFinishHandler}>
      <Form.Item label="Logo" name="logo">
        <UploadCompanyLogo
          testArray={testArray}
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
          <Form.Item label="Company Name" {...attr('compname')}>
            {editMode ? <Input placeholder="" type="text" /> : <h3>{dashCheck(testArray.compname)}</h3>}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Company Phone" {...attr('compphone')}>
            {editMode ? <Input placeholder="" type="number" /> : <h3>{dashCheck(testArray.compphone)}</h3>}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="License Number" {...attr('licnumber')}>
            {editMode ? <Input placeholder="" type="text" /> : <h3>{dashCheck(testArray.licnumber)}</h3>}
          </Form.Item>
        </Col>
      </Row>

      {/* //????//// */}
      <Row gutter={33}>
        <Col span={8}>
          <Form.Item label="Project Manager Full Name" {...attr('p_m__name')}>
            {editMode ? <Input placeholder="" type="text" /> : <h3>{dashCheck(testArray.p_m__name)}</h3>}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Project Manager Phone Number" {...attr('p_m_phone')}>
            {editMode ? <Input placeholder="" type="number" /> : <h3>{dashCheck(testArray.p_m_phone)}</h3>}
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
            <span></span>
            <span>{`${!editMode ? '' : !extraAddress ? 'Enter Manually' : 'Search Loaction'}`}</span>
          </div>
          <Form.Item
            label={`${!editMode ? 'Address' : !extraAddress ? 'Search Address' : 'Address Line #1'}`}
            {...attr('searchaddress')}>
            {editMode ? (
              <Input placeholder="" type="text" />
            ) : extraAddress ? (
              <div className="address_column">
                <h3>
                  Address: {testArray.searchaddress} {testArray.address_l_2}
                </h3>
                <h3>
                  {testArray.state} {testArray.zip} {testArray.city}
                </h3>
              </div>
            ) : (
              <h3>{testArray.searchaddress}</h3>
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

export default GeneralInformation;

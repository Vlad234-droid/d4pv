import React, { useState } from 'react';
import { Button, Input, Row, Col } from 'antd';
import { SearchSVG, CloseSVG } from '../../components/icons';
import ModalDeleteCompany from './ModalDeleteCompany';
import TableOfCompanies from './TableOfCompanies';
import LayoutConfiguration from '../../components/LayoutConfiguration/Layout';
import { useHistory } from 'react-router-dom';
import './style.scss';

const AdminCompaniesConfigurations = () => {
  const [searchValue, setSearchValue] = useState('');
  const [showDeleteCompany, setShowDeleteCompany] = useState(false);
  const [serchToggle, setSearchToggle] = useState(null);
  const [deleteCompanyId, setDeleteCompanyId] = useState(null);

  const history = useHistory();

  const SuffixSearch = <div className="suffix-search">{!serchToggle ? <SearchSVG /> : <CloseSVG />}</div>;

  return (
    <LayoutConfiguration>
      <div className="block_companies" id="block_companies">
        <ModalDeleteCompany
          showDeleteCompany={showDeleteCompany}
          setShowDeleteCompany={setShowDeleteCompany}
          deleteCompanyId={deleteCompanyId}
          setDeleteCompanyId={setDeleteCompanyId}
        />

        <div className="title_users">
          <h2>Saved Companies</h2>
        </div>
        <div className="form_to_add">
          <Row>
            <Col span={4}>
              <Button
                type="primary"
                className="save_link"
                style={{ height: '40px' }}
                onClick={() => history.push('/admin-add-company-conf')}>
                Add Company
              </Button>
            </Col>
            <Col span={serchToggle ? 18 : 8} offset={serchToggle ? 2 : 12}>
              <div className="input_link">
                {SuffixSearch}
                <Input
                  placeholder="Search"
                  value={searchValue}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\s/g, '');

                    setSearchValue(value);
                  }}
                  onBlur={() => {
                    setSearchToggle(() => false);
                  }}
                  onFocus={(e) => {
                    setSearchToggle(true);
                  }}
                />
              </div>
            </Col>
          </Row>
        </div>
        <div>
          <TableOfCompanies
            setShowDeleteCompany={setShowDeleteCompany}
            searchValue={searchValue}
            setDeleteCompanyId={setDeleteCompanyId}
            deleteCompanyId={deleteCompanyId}
          />
        </div>
      </div>
    </LayoutConfiguration>
  );
};
export default AdminCompaniesConfigurations;

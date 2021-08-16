import React, { useEffect } from 'react';
import './style.scss';
import { Button, Col } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { EditCompanySVG, IconToShow, DeleteSVG, HideNotesSVG } from '../../../../components/icons';
import { actions } from '../../../../core/companies/companiesSlice';
import { actions as visActions } from '../../../../core/visualization/visualizationSlice';

import { bindActionCreators } from 'redux';
import EditRequirements from './EditRequirements';
import { useState } from 'react';
import AddRequirementsModal from '../AddRequirementsModal';
import Parser from 'html-react-parser';
import { useParams } from 'react-router-dom';

const SitePlanTab = ({ keyTab, text }) => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const [toEdit, setToEdit] = useState({});
  const [editModal, setEditModal] = useState(false);
  const [addRequirements, setAddRequirements] = useState(false);
  const { visibilityCompanyRequirements, deleteCompanyRequirements, getCompanieData } = bindActionCreators(
    actions,
    dispatch,
  );
  const { blurModal } = bindActionCreators(visActions, dispatch);

  //const [fileUrl, setFileUrl] = useState('');

  const requirements = useSelector((state) => state.companies.companieData.requirements);
  const [requirementsList, setRequirementsList] = useState(null);

  const chooseEditHandler = (id) => {
    const filtered = requirements.filter((item) => item.id === id);
    const [first] = filtered;
    setToEdit(() => ({
      ...first,
    }));
    setEditModal(() => true);
  };

  useEffect(() => {
    const newData = requirements.filter((item) => item.group === keyTab);

    setRequirementsList(() => newData);
  }, [requirements, keyTab]);

  const capitalizeLetter = (string) => {
    if (string.split(' ').length === 1) return string.charAt(0).toUpperCase() + string.slice(1);
    if (string.split(' ').length > 1) {
      const words = string.split(' ');
      for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
      }
      return words.join(' ');
    }
  };

  const getProperDate = (date_updated) => {
    function checkForZeroDate(date) {
      return date < 10 ? `0${date}` : date;
    }
    function checkForZeroMonth(month) {
      let pl1 = month + 1;
      return pl1 < 10 ? `0${pl1}` : pl1;
    }
    const date = new Date(date_updated);
    const day = checkForZeroDate(date.getDate());
    const month = checkForZeroMonth(date.getMonth());
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  };

  return (
    <div className="site_plan_block tab_block">
      <EditRequirements
        blurModal={blurModal}
        keyTab={keyTab}
        toEdit={toEdit}
        editModal={editModal}
        setEditModal={setEditModal}
      />
      {/* /////////////////////////////////////////////////////////////////////////// */}
      <AddRequirementsModal
        blurModal={blurModal}
        keyTab={keyTab}
        addRequirements={addRequirements}
        setAddRequirements={setAddRequirements}
        //fileUrl={fileUrl}
        //setFileUrl={setFileUrl}
      />

      <div className="add_block">
        <h2>{`Site ${text}`}</h2>
        <Col span={7}>
          <Button
            type="primary"
            style={{ maxHeight: '40px' }}
            id="add_requirement"
            onClick={() => {
              blurModal(true);
              setAddRequirements(() => true);
            }}>
            Add Requirments
          </Button>
        </Col>
      </div>
      <div className="line">
        <hr />
      </div>
      {requirementsList &&
        requirementsList.map((item) => (
          <div className="info_container" key={item.id}>
            <div className="actions_do">
              <p className={`updated ${!item.visibility && 'modeOpacity'}`}>
                Updated {getProperDate(item.date_updated)} by {capitalizeLetter(item.updated_by)}
              </p>
              <div className="svgBtn">
                <div
                  className="btnSVG"
                  id="edit_requirements"
                  onClick={() => {
                    blurModal(true);
                    chooseEditHandler(item.id);
                  }}>
                  <EditCompanySVG />
                </div>
                <div
                  className="btnSVG"
                  onClick={() => visibilityCompanyRequirements(item.id).then(() => getCompanieData(id))}>
                  {item.visibility !== undefined && item.visibility ? <IconToShow /> : <HideNotesSVG />}
                </div>
                <div
                  className="btnSVG"
                  onClick={() => deleteCompanyRequirements(item.id).then(() => getCompanieData(id))}>
                  <DeleteSVG />
                </div>
              </div>
            </div>
            <div className="text_box">
              <div className={`${!item.visibility && 'modeOpacity'}`}>{Parser(item.text)}</div>
            </div>
            <div className="addit_info">
              <p className={`${!item.visibility && 'modeOpacity'}`}>
                Reference: <span>{item.reference}</span>
              </p>
              <p className={`${!item.visibility && 'modeOpacity'}`}>
                Requested by: <span>{item.requested_by}</span>
              </p>
            </div>
            <div className="line">
              <hr />
            </div>
          </div>
        ))}
    </div>
  );
};

export default SitePlanTab;

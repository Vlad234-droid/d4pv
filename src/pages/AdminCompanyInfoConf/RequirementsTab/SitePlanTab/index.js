import React from 'react';
import './style.scss';
import { Button, Col } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { EditCompanySVG, IconToShow, DeleteSVG, HideNotesSVG } from '../../../../components/icons';
import { actions } from '../../../../core/requirements/requirementsSlice';
import { bindActionCreators } from 'redux';
import EditRequirements from './EditRequirements';
import { useState } from 'react';
import DOMPurify from 'dompurify';
import AddRequirementsModal from '../AddRequirementsModal';
import Parser from 'html-react-parser';

const SitePlanTab = ({ keyTab }) => {
  const { sitePlan } = useSelector((state) => state.requirements);
  const dispatch = useDispatch();
  const [toEdit, setToEdit] = useState({});
  const [editModal, setEditModal] = useState(false);
  const [addRequirements, setAddRequirements] = useState(false);
  const { deleteRequirement, changeRequirementVisibility } = bindActionCreators(actions, dispatch);
  const [fileUrl, setFileUrl] = useState('');

  const chooseEditHandler = (key) => {
    const filtered = sitePlan.filter((item) => item.key === key);
    const [first] = filtered;
    setToEdit(() => ({
      ...first,
      note: 'sitePlan',
    }));
    setEditModal(() => true);
  };

  return (
    <div className="site_plan_block tab_block">
      <EditRequirements toEdit={toEdit} editModal={editModal} setEditModal={setEditModal} />
      {/* /////////////////////////////////////////////////////////////////////////// */}
      <AddRequirementsModal
        keyTab={keyTab}
        addRequirements={addRequirements}
        setAddRequirements={setAddRequirements}
        fileUrl={fileUrl}
        setFileUrl={setFileUrl}
      />

      <div className="add_block">
        <h2>Site Plan Requirments</h2>
        <Col span={7}>
          <Button
            type="primary"
            style={{ maxHeight: '40px' }}
            id="add_requirement"
            onClick={() => setAddRequirements(() => true)}>
            Add Requirments
          </Button>
        </Col>
      </div>
      <div className="line">
        <hr />
      </div>
      {sitePlan.map((item) => (
        <div className="info_container" key={item.key}>
          <div className="actions_do">
            <p className={`updated ${item.visibleNote && 'modeOpacity'}`}>Updated 10.10.2021 by {item.requested}</p>
            <div className="svgBtn">
              <div className="btnSVG" id="edit_requirements" onClick={() => chooseEditHandler(item.key)}>
                <EditCompanySVG />
              </div>
              <div className="btnSVG" onClick={() => changeRequirementVisibility({ key: item.key, note: 'sitePlan' })}>
                {item.visibleNote !== undefined && !item.visibleNote ? <IconToShow /> : <HideNotesSVG />}
              </div>
              <div className="btnSVG" onClick={() => deleteRequirement({ key: item.key, note: 'sitePlan' })}>
                <DeleteSVG />
              </div>
            </div>
          </div>
          <div className="text_box">
            <div className={`${item.visibleNote && 'modeOpacity'}`}>{Parser(item.text)}</div>
          </div>
          <div className="addit_info">
            <p className={`${item.visibleNote && 'modeOpacity'}`}>
              Reference: <span>{item.reference}</span>
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

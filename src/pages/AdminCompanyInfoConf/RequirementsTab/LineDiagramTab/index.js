import React from 'react';
import { Button, Col } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { EditCompanySVG, IconToShow, DeleteSVG, HideNotesSVG } from '../../../../components/icons';
import { actions } from '../../../../core/requirements/requirementsSlice';
import { bindActionCreators } from 'redux';
import EditRequirements from './EditRequirements';
import { useState } from 'react';
import DOMPurify from 'dompurify';

const SitePlanTab = () => {
  const { diagram } = useSelector((state) => state.requirements);
  const dispatch = useDispatch();
  const [toEdit, setToEdit] = useState({});
  const [editModal, setEditModal] = useState(false);

  const { deleteRequirement, changeRequirementVisibility } = bindActionCreators(actions, dispatch);

  const chooseEditHandler = (key) => {
    const filtered = diagram.filter((item) => item.key === key);
    const [first] = filtered;
    setToEdit(() => ({
      ...first,
      note: 'diagram',
    }));
    setEditModal(() => true);
  };

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  return (
    <div className="site_plan_block">
      <EditRequirements toEdit={toEdit} editModal={editModal} setEditModal={setEditModal} />
      <div className="add_block">
        <h2>Line Diagram Requirments</h2>
        <Col span={7}>
          <Button type="primary" style={{ maxHeight: '40px' }}>
            Add Requirments
          </Button>
        </Col>
      </div>
      <div className="line">
        <hr />
      </div>
      {diagram.map((item) => (
        <div className="info_container" key={item.key}>
          <div className="actions_do">
            <p className={`updated ${item.visibleNote && 'modeOpacity'}`}>Updated 10.10.2021 by {item.requested}</p>
            <div className="svgBtn">
              <div className="btnSVG" id="edit_requirements" onClick={() => chooseEditHandler(item.key)}>
                <EditCompanySVG />
              </div>
              <div className="btnSVG" onClick={() => changeRequirementVisibility({ key: item.key, note: 'diagram' })}>
                {item.visibleNote !== undefined && !item.visibleNote ? <IconToShow /> : <HideNotesSVG />}
              </div>
              <div className="btnSVG" onClick={() => deleteRequirement({ key: item.key, note: 'diagram' })}>
                <DeleteSVG />
              </div>
            </div>
          </div>
          <div className="text_box">
            <h3
              className={`${item.visibleNote && 'modeOpacity'}`}
              dangerouslySetInnerHTML={createMarkup(item.text)}></h3>
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

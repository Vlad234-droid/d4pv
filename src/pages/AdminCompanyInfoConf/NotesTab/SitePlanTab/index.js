import React from 'react';
import './style.scss';
import { Button, Col } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { EditCompanySVG, IconToShow, DeleteSVG, HideNotesSVG } from '../../../../components/icons';
import { actions } from '../../../../core/notes/notesSlice';
import { bindActionCreators } from 'redux';
import EditNote from './EditNote';
import { useState } from 'react';
import DOMPurify from 'dompurify';

const SitePlanTab = () => {
  const { sitePlan } = useSelector((state) => state.notes);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [toEdit, setToEdit] = useState({});
  const [editModal, setEditModal] = useState(false);

  const { deleteNote, changeNoteVisibility } = bindActionCreators(actions, dispatch);

  const chooseEditHandler = (key) => {
    const filtered = sitePlan.filter((item) => item.key === key);
    const [first] = filtered;
    setToEdit(() => ({
      ...first,
      note: 'sitePlan',
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
      <EditNote toEdit={toEdit} editModal={editModal} setEditModal={setEditModal} />
      <div className="add_block">
        <h2>Site Plan Notes</h2>
        <Col span={7}>
          <Button type="primary" style={{ maxHeight: '40px' }}>
            Add Note
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
              <div className="btnSVG" id="edit_note" onClick={() => chooseEditHandler(item.key)}>
                <EditCompanySVG />
              </div>
              <div className="btnSVG" onClick={() => changeNoteVisibility({ key: item.key, note: 'sitePlan' })}>
                {item.visibleNote !== undefined && !item.visibleNote ? <IconToShow /> : <HideNotesSVG />}
              </div>
              <div className="btnSVG" onClick={() => deleteNote({ key: item.key, note: 'sitePlan' })}>
                <DeleteSVG />
              </div>
            </div>
          </div>
          <div className="text_box">
            <h3
              className={`${item.visibleNote && 'modeOpacity'}`}
              dangerouslySetInnerHTML={createMarkup(item.text)}></h3>
            {/* <div dangerouslySetInnerHTML={createMarkup(convertedContent)}></div> */}
          </div>
          <div className="addit_info">
            <p className={`${item.visibleNote && 'modeOpacity'}`}>
              Reference: <span>{item.reference}</span>
            </p>
            {!item.visibleNote && (
              <p>
                Requested by: <span>{item.requested}</span>
              </p>
            )}
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

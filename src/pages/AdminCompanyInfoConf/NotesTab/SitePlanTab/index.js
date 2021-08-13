import React, { useEffect } from 'react';
import './style.scss';
import { Button, Col } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { EditCompanySVG, IconToShow, DeleteSVG, HideNotesSVG } from '../../../../components/icons';
import { actions } from '../../../../core/companies/companiesSlice';
import { bindActionCreators } from 'redux';
import EditNote from './EditNote';
import { useState } from 'react';
import DOMPurify from 'dompurify';
import AddNoteModal from '../AddNoteModal';
import { useParams } from 'react-router-dom';
import { actions as visActions } from '../../../../core/visualization/visualizationSlice';

const SitePlanTab = ({ keyTab }) => {
  const notes = useSelector((state) => state.companies.companieData.notes);
  const [noteList, setNotelist] = useState(null);
  const { id } = useParams();

  const dispatch = useDispatch();
  const [toEdit, setToEdit] = useState({});
  const [editModal, setEditModal] = useState(false);
  const [addNoteModal, setAddNoteModal] = useState(false);

  const { visibilityCompanyNote, deleteCompanyNote, getCompanieData } = bindActionCreators(actions, dispatch);
  const { blurModal } = bindActionCreators(visActions, dispatch);

  const chooseEditHandler = (id) => {
    const filtered = notes.filter((item) => item.id === id);
    const [first] = filtered;
    setToEdit(() => ({
      ...first,
    }));
    setEditModal(() => true);
  };

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  useEffect(() => {
    const newData = notes.filter((item) => item.group === 'SitePlan');
    setNotelist(() => newData);
  }, [notes]);

  console.log('notes', notes);

  return (
    <div className="site_plan_block tab_block">
      <EditNote blurModal={blurModal} toEdit={toEdit} setEditModal={setEditModal} editModal={editModal} />
      {/* /////////////////////////////////////////////////////////////////////// */}
      <AddNoteModal
        keyTab={keyTab}
        addNoteModal={addNoteModal}
        setAddNoteModal={setAddNoteModal}
        blurModal={blurModal}
      />
      <div className="add_block">
        <h2>Site Plan Notes</h2>
        <Col span={7}>
          <Button
            type="primary"
            style={{ maxHeight: '40px' }}
            id="add_note"
            onClick={() => {
              blurModal(true);
              setAddNoteModal(() => true);
            }}>
            Add Note
          </Button>
        </Col>
      </div>
      <div className="line">
        <hr />
      </div>
      {noteList &&
        noteList.map((item) => (
          <div className="info_container" key={item.id}>
            <div className="actions_do">
              <p className={`updated ${!item.visibility && 'modeOpacity'}`}>Updated 10.10.2021 by {item.updated_by}</p>
              <div className="svgBtn">
                <div
                  className="btnSVG"
                  id="edit_note"
                  onClick={() => {
                    blurModal(true);
                    chooseEditHandler(item.id);
                  }}>
                  <EditCompanySVG />
                </div>
                <div className="btnSVG" onClick={() => visibilityCompanyNote(item.id).then(() => getCompanieData(id))}>
                  {item.visibility !== undefined && item.visibility ? <IconToShow /> : <HideNotesSVG />}
                </div>
                <div className="btnSVG" onClick={() => deleteCompanyNote(item.id).then(() => getCompanieData(id))}>
                  <DeleteSVG />
                </div>
              </div>
            </div>
            <div className="text_box">
              <h3
                className={`${!item.visibility && 'modeOpacity'}`}
                dangerouslySetInnerHTML={createMarkup(item.text)}></h3>
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

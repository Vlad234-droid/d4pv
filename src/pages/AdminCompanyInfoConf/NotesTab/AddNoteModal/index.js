import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Col, Row, Input } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import { CloseIconSVG } from '../../../../components/icons';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import bold from '../../../../components/icons/icons-type-bold@3x.png';
import underline from '../../../../components/icons/icons-type-underline@3x.png';
import { convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import './style.scss';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { actions } from '../../../../core/companies/companiesSlice';
import { useParams } from 'react-router-dom';

const AddNoteModal = ({ blurModal, keyTab, addNoteModal, setAddNoteModal }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { addCompanyNote, getCompanieData } = bindActionCreators(actions, dispatch);
  const [editorState, setEditorState] = useState();
  const { id } = useParams();

  const onFinish = ({ reference, requested_by }) => {
    let currentContentAsHTML = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    const body = {
      text: currentContentAsHTML,
      reference,
      requested_by,
      group: keyTab,
    };
    addCompanyNote({ company_id: id, body }).then(() => getCompanieData(id));
    form.resetFields();
    setAddNoteModal(() => false);
    blurModal(false);
  };

  const handleEditorChange = (state) => {
    setEditorState(() => state);
  };

  useEffect(() => {
    if (addNoteModal) document.body.style.overflow = 'hidden';
    if (!addNoteModal) document.body.style.overflow = 'unset';

    const contentBlock = htmlToDraft('<p></p>');
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    const editorState = EditorState.createWithContent(contentState);
    setEditorState(() => editorState);
  }, [addNoteModal]);

  return (
    <Modal
      visible={addNoteModal}
      closeIcon={<CloseIconSVG />}
      onCancel={() => {
        blurModal(false);
        setAddNoteModal(() => false);
      }}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}
      width={664}
      className="modal_add_note">
      <h3 className="add_note_title">Add Note</h3>

      {/* // ????//////?????* */}

      <Form name="form_add_note" layout="vertical" form={form} requiredMark={true} onFinish={onFinish}>
        <Col span={24}>
          <Form.Item
            name="wysiwyg"
            rules={[
              {
                required: true,
                message: 'Text is required',
              },
            ]}>
            <Editor
              editorState={editorState}
              // defaultContentState={contentState}
              onEditorStateChange={handleEditorChange}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              toolbarClassName="toolbar-class"
              toolbar={{
                options: ['inline'],
                inline: {
                  options: ['bold', 'underline'],
                  bold: { icon: bold, className: 'custom_bold' },
                  underline: { icon: underline, className: 'custom_underline' },
                },
              }}
            />
          </Form.Item>
        </Col>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Requested By"
              name="requested_by"
              rules={[
                {
                  required: true,
                  message: 'Requested By is required',
                },
              ]}>
              <Input placeholder="" type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Reference"
              name="reference"
              rules={[
                {
                  required: true,
                  message: 'Reference is required',
                },
              ]}>
              <Input placeholder="" type="text" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item className="submit__cancel_note__add">
          <Row gutter={16}>
            <Col span={9}>
              <Button
                type="button"
                onClick={() => {
                  blurModal(false);
                  setAddNoteModal(() => false);
                }}>
                Cancel
              </Button>
            </Col>
            <Col span={14}>
              <Button type="primary" htmlType="submit">
                Confirm
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddNoteModal;

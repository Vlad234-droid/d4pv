import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Col, Row, Input } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import { CloseIconSVG } from '../../../../components/icons';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { actions } from '../../../../core/notes/notesSlice';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import bold from '../../../../components/icons/icons-type-bold@3x.png';
import underline from '../../../../components/icons/icons-type-underline@3x.png';
import { convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import './style.scss';

const AddNoteModal = ({ keyTab, addNoteModal, setAddNoteModal }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { addNote } = bindActionCreators(actions, dispatch);
  const [editorState, setEditorState] = useState();

  const onFinish = ({ reference, requested }) => {
    let currentContentAsHTML = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    console.log('currentContentAsHTML', currentContentAsHTML);
    addNote({ keyTab, text: currentContentAsHTML, reference, requested });
    form.resetFields();
    setAddNoteModal(() => false);
  };

  const handleEditorChange = (state) => {
    setEditorState(() => state);
  };

  useEffect(() => {
    const contentBlock = htmlToDraft('<h6></h6>');
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    const editorState = EditorState.createWithContent(contentState);
    setEditorState(() => editorState);
  }, [addNoteModal]);

  return (
    <Modal
      visible={addNoteModal}
      closeIcon={<CloseIconSVG />}
      onCancel={() => {
        setAddNoteModal(() => false);
      }}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}
      getContainer={() => document.getElementById('add_note')}
      width={664}
      className="modal_add_note">
      <h3 className="add_note_title">Add Note</h3>

      {/* // ????//////?????* */}

      <Form name="form_add_note" layout="vertical" form={form} requiredMark={true} onFinish={onFinish}>
        <Col span={24}>
          <Form.Item name="wysiwyg">
            <Editor
              editorState={editorState}
              // defaultContentState={contentState}
              onEditorStateChange={handleEditorChange}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              toolbarClassName="toolbar-class"
              toolbar={{
                options: ['inline'],
                inline: { options: ['bold', 'underline'] },
                inline: {
                  bold: { icon: bold, className: 'custom_bold' },
                  underline: { icon: underline, className: 'custom_underline' },
                },
              }}
            />
          </Form.Item>
        </Col>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="Requested By" name="requested">
              <Input placeholder="" type="text" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Reference" name="reference">
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

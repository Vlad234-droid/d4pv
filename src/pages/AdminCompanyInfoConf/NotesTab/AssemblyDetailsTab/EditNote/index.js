import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Col, Row, Input } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import { CloseIconSVG } from '../../../../../components/icons';
import { convertFromRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToHTML } from 'draft-convert';
import { actions } from '../../../../../core/notes/notesSlice';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import bold from '../../../../../components/icons/icons-type-bold@3x.png';
import underline from '../../../../../components/icons/icons-type-underline@3x.png';

const EditNote = ({ setEditModal, editModal, toEdit }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { changeTextNote, changeReferenceNote, changeRequestedNote } = bindActionCreators(actions, dispatch);
  const onFinish = ({ reference, requested, wysiwyg }) => {
    console.log('requested', requested);
    console.log('reference', reference);
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    changeTextNote({ key: toEdit.key, note: toEdit.note, text: currentContentAsHTML });
    if (reference !== undefined) {
      console.log('Here');
      changeReferenceNote({ key: toEdit.key, note: toEdit.note, text: reference });
    }

    if (requested !== undefined) {
      console.log('Here');

      changeRequestedNote({ key: toEdit.key, note: toEdit.note, text: requested });
    }
    form.resetFields();
    setEditModal(() => false);
  };

  useEffect(() => {
    const contentState = {
      entityMap: {},
      blocks: [
        {
          key: '18ql9',
          text: `${toEdit.text !== undefined && toEdit.text.replace(/<[^>]+>/g, '')}`,
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
        },
      ],
    };
    setEditorState(() => EditorState.createWithContent(convertFromRaw(contentState)));
  }, [toEdit]);

  const contentState = {
    entityMap: {},
    blocks: [
      {
        key: '18ql9',
        text: `${toEdit.text !== undefined && toEdit.text.replace(/<[^>]+>/g, '')}`,
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
      },
    ],
  };

  const [editorState, setEditorState] = useState(() => EditorState.createWithContent(convertFromRaw(contentState)));
  const handleEditorChange = (state) => {
    setEditorState(() => state);
    //
  };

  return (
    <Modal
      visible={editModal}
      closeIcon={<CloseIconSVG />}
      onCancel={() => {
        setEditModal(() => false);
      }}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}
      getContainer={() => document.getElementById('edit_note')}
      width={664}
      className="modal_edit_note">
      <h3 className="edit_note_title">Edit Note</h3>

      {/* // ????//////?????* */}

      <Form name="form_edit_note" layout="vertical" form={form} requiredMark={true} onFinish={onFinish}>
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
        <Form.Item className="submit__cancel_note">
          <Row gutter={16}>
            <Col span={9}>
              <Button
                type="button"
                onClick={() => {
                  setEditModal(() => false);
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

export default EditNote;

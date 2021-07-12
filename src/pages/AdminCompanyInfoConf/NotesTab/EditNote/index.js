import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Col, Row, Input } from 'antd';
import './style.scss';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import { CloseIconSVG } from '../../../../components/icons';
import { ContentState, convertToRaw, convertFromRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';

const EditNote = ({ setEditModal, editModal, toEdit }) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('values', values);
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(() => currentContentAsHTML);
  };

  useEffect(() => {
    const contentState = {
      entityMap: {},
      blocks: [
        {
          key: '18ql9',
          text: `${toEdit.text}`,
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
        text: `${toEdit.text}`,
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
      },
    ],
  };

  const [editorState, setEditorState] = useState(() => EditorState.createWithContent(convertFromRaw(contentState)));
  const [convertedContent, setConvertedContent] = useState(null);
  const handleEditorChange = (state) => {
    setEditorState(() => state);
    //
  };

  console.log('convertedContent', convertedContent);

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
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
      <h3>Edit Note</h3>
      {/* // ????//////?????* */}

      <Editor
        editorState={editorState}
        // defaultContentState={contentState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        toolbar={{ options: ['inline'], inline: { options: ['bold', 'underline'] } }}
      />
      <div dangerouslySetInnerHTML={createMarkup(convertedContent)}></div>
      {/* <Editor
        defaultContentState={contentState}
        onContentStateChange={setContentState}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        toolbar={{ options: ['inline'], inline: { options: ['bold', 'underline'] } }}
      /> */}

      {/* // ????//////?????* */}

      <Form name="form_edit_note" layout="vertical" form={form} requiredMark={true} onFinish={onFinish}>
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
        <Form.Item className="submit__cancel_delete_user">
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

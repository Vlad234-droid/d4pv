import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Col, Row, Input } from 'antd';
import '../EditNote/style.scss';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import { CloseIconSVG } from '../../../../../components/icons';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { actions } from '../../../../../core/companies/companiesSlice';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import bold from '../../../../../components/icons/icons-type-bold@3x.png';
import underline from '../../../../../components/icons/icons-type-underline@3x.png';
import { convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { useParams } from 'react-router-dom';

const EditNote = ({ blurModal, setEditModal, editModal, toEdit }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { updateCompanyNote, getCompanieData } = bindActionCreators(actions, dispatch);
  const { id } = useParams();

  const onFinish = ({ reference, requested, wysiwyg }) => {
    let currentContentAsHTML = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    const body = {
      text: currentContentAsHTML,
      reference: reference,
      requested_by: requested,
    };

    updateCompanyNote({ note_id: toEdit.id, body }).then(() => getCompanieData(id));
    setEditModal(() => false);
    blurModal(false);
  };

  const [editorState, setEditorState] = useState();
  const handleEditorChange = (state) => {
    setEditorState(() => state);
  };

  useEffect(() => {
    if (editModal) document.body.style.overflow = 'hidden';
    if (!editModal) document.body.style.overflow = 'unset';

    if (toEdit.text !== undefined) {
      const contentBlock = htmlToDraft(toEdit.text);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        setEditorState(() => editorState);
      }
    }
  }, [toEdit, editModal]);

  useEffect(() => {
    if (form.__INTERNAL__.name) {
      form.setFieldsValue({
        requested: toEdit.requested_by,
        reference: toEdit.reference,
      });
    }
  }, [toEdit]);

  return (
    <Modal
      visible={editModal}
      closeIcon={<CloseIconSVG />}
      onCancel={() => {
        blurModal(false);
        setEditModal(() => false);
      }}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}
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
              name="requested"
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
        <Form.Item className="submit__cancel_note">
          <Row gutter={16}>
            <Col span={9}>
              <Button
                type="button"
                onClick={() => {
                  blurModal(false);
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
